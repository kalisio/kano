<template>
  <div class="nlchat">
    <!-- LLM provider selector -->
    <div class="nlchat-toolbar">
      <q-btn-toggle
        v-model="selectedProvider"
        dense
        no-caps
        rounded
        unelevated
        toggle-color="primary"
        size="sm"
        :options="[
          { label: 'Ollama', value: 'ollama' },
          { label: 'Claude', value: 'claude' }
        ]"
        style="font-size: 11px;"
      />
    </div>
    <!-- Chat messages -->
    <div ref="chatContainer" class="nlchat-messages">
      <div v-for="msg in messages" :key="msg.id" class="nlchat-msg" :data-role="msg.role">
        <!-- User and system messages: plain text -->
        <div v-if="msg.role !== 'assistant'" :class="['nlchat-bubble', msg.role]">{{ msg.text }}</div>
        <!-- Assistant messages: rendered markdown, then the tables and charts built from the rankings -->
        <div v-else class="nlchat-bubble assistant">
          <div class="nlchat-md" v-html="renderMarkdown(msg.text)"></div>
          <div v-for="(ranking, ri) in msg.rankings" :key="'r' + ri" class="nlchat-md">
            <table>
              <thead>
                <tr><th>{{ $t('KNLChat.STATION') }}</th><th class="num">{{ ranking.metric }} ({{ ranking.unit }})</th><th class="num">km</th></tr>
              </thead>
              <tbody>
                <tr v-for="(row, i) in ranking.rows.slice(0, MAX_TABLE_ROWS)" :key="i">
                  <td :title="row.river">{{ row.name }}</td>
                  <td class="num">{{ row.value === null ? '—' : row.value }}</td>
                  <td class="num">{{ row.distance_km }}</td>
                </tr>
              </tbody>
            </table>
            <div v-if="ranking.rows.length > MAX_TABLE_ROWS" class="nlchat-more">
              {{ $t('KNLChat.MORE_STATIONS', { count: ranking.rows.length - MAX_TABLE_ROWS }) }}
            </div>
          </div>
          <div v-for="(chart, ci) in msg.charts" :key="'c' + ci" class="nlchat-chart" :style="{ height: chartHeight(chart) + 'px' }">
            <canvas :ref="el => mountChart(el, chart)"></canvas>
          </div>
        </div>
      </div>
      <div v-if="loading" style="padding: 8px; text-align: center;">
        <q-spinner-dots size="2em" color="primary" />
      </div>
    </div>
    <!-- Input -->
    <div class="nlchat-input">
      <q-input
        v-model="inputText"
        dense
        outlined
        style="flex: 1;"
        :placeholder="$t('KNLChat.PLACEHOLDER')"
        @keyup.enter="send"
        :disable="loading"
      />
      <q-btn
        flat
        round
        icon="las la-paper-plane"
        color="primary"
        @click="send"
        :disable="!inputText || loading"
      />
    </div>
  </div>
</template>

<script>
import { ref } from 'vue'

// The widget is destroyed each time it is closed: the conversation lives at module level to survive it
const messages = ref([])
const selectedProvider = ref('ollama')
let msgId = 0
</script>

<script setup>
import logger from 'loglevel'
import { nextTick, onMounted } from 'vue'
import { i18n, api } from '@kalisio/kdk/core.client'
import { composables as kMapComposables } from '@kalisio/kdk/map.client'
import Showdown from 'showdown'
import sanitizeHtml from 'sanitize-html'
import { Chart, registerables } from 'chart.js'

Chart.register(...registerables)

const { kActivity } = kMapComposables.useCurrentActivity()

// Markdown converter with table support
const mdConverter = new Showdown.Converter({
  tables: true,
  strikethrough: true,
  simpleLineBreaks: true,
  openLinksInNewWindow: true
})

// Sanitize HTML from markdown, allowing tables and basic formatting
const SANITIZE_OPTS = {
  allowedTags: sanitizeHtml.defaults.allowedTags.concat([
    'table', 'thead', 'tbody', 'tr', 'th', 'td', 'del', 'img'
  ]),
  allowedAttributes: {
    ...sanitizeHtml.defaults.allowedAttributes,
    img: ['src', 'alt', 'width', 'height'],
    td: ['style'],
    th: ['style']
  }
}

function renderMarkdown (text) {
  if (!text) return ''
  return sanitizeHtml(mdConverter.makeHtml(text), SANITIZE_OPTS)
}

// Tables and charts are built here from the ranking returned by the service, the LLM does not write them.
// The widget is narrow (about 400 px): few columns, few bars, and a height that follows the number of bars
const MAX_TABLE_ROWS = 15
const MAX_CHART_ROWS = 10
const BAR_HEIGHT = 22
const CHART_AXES_HEIGHT = 50
const MAX_LABEL_LENGTH = 24

function chartHeight (chart) {
  return chart.data.labels.length * BAR_HEIGHT + CHART_AXES_HEIGHT
}

function shortLabel (label) {
  return label.length > MAX_LABEL_LENGTH ? label.slice(0, MAX_LABEL_LENGTH - 1) + '…' : label
}

function rankingToChart (ranking) {
  const rows = ranking.rows.filter(row => row.value !== null).slice(0, MAX_CHART_ROWS)
  return {
    type: 'bar',
    data: {
      labels: rows.map(row => row.name),
      datasets: [{ data: rows.map(row => row.value), backgroundColor: '#1976d2' }]
    },
    options: {
      indexAxis: 'y',
      responsive: true,
      maintainAspectRatio: false,
      animation: false,
      // Room for the value written at the end of the longest bar
      layout: { padding: { right: 40 } },
      scales: {
        // The full name stays in the tooltip
        y: { ticks: { autoSkip: false, font: { size: 11 }, callback (value) { return shortLabel(this.getLabelForValue(value)) } } },
        x: { beginAtZero: true, title: { display: true, text: `${ranking.metric} (${ranking.unit})` }, ticks: { font: { size: 10 } } }
      },
      plugins: {
        legend: { display: false },
        // Registered globally by the KDK charts
        datalabels: { anchor: 'end', align: 'end', font: { size: 10 }, clamp: true }
      }
    }
  }
}

// Mount a Chart.js chart onto a canvas element
const chartInstances = new Map()
function mountChart (el, chartConfig) {
  if (!el || chartInstances.has(el)) return
  nextTick(() => {
    try {
      chartInstances.set(el, new Chart(el, chartConfig))
    } catch (error) {
      logger.error('[KNLChat] ' + error.message)
    }
  })
}

const inputText = ref('')
const loading = ref(false)
const chatContainer = ref(null)

let nlService = null

function addMsg (role, text, rankings = []) {
  const msg = { id: ++msgId, role, text }
  if (rankings.length > 0) {
    msg.rankings = rankings
    // A chart is only worth it when there is something to compare
    msg.charts = rankings.filter(ranking => ranking.rows.filter(row => row.value !== null).length > 1).map(rankingToChart)
  }
  messages.value.push(msg)
}

async function scrollToBottom () {
  await nextTick()
  if (chatContainer.value) {
    chatContainer.value.scrollTop = chatContainer.value.scrollHeight
  }
}

async function executeActions (actions) {
  const activity = kActivity.value
  if (!activity) {
    addMsg('system', 'No map activity available')
    return
  }

  // Reorder: showLayer first, navigate last (so navigation isn't overridden by layer load)
  const layerActions = actions.filter(a => a.type === 'showLayer')
  const navActions = actions.filter(a => a.type === 'navigate')
  const reordered = [...layerActions, ...navActions]

  for (const action of reordered) {
    try {
      if (action.type === 'showLayer') {
        const name = action.name || action.layer
        if (action.visible !== false) {
          await activity.showLayer(name)
          addMsg('system', `Layer ON: ${action.layer}`)
        } else {
          await activity.hideLayer(name)
          addMsg('system', `Layer OFF: ${action.layer}`)
        }
        await scrollToBottom()
      } else if (action.type === 'navigate' && action.longitude && action.latitude) {
        const zoom = action.zoom || 8
        // Convert zoom level to altitude for 3D/Cesium mode
        // zoom 5 = country (~5000km), 7 = region (~500km), 8 = city (~200km), 10 = town (~50km)
        const ZOOM_TO_ALTITUDE = { 3: 10000000, 4: 8000000, 5: 5000000, 6: 2000000, 7: 500000, 8: 200000, 9: 100000, 10: 50000, 11: 25000, 12: 10000 }
        const is3D = typeof activity.is2D === 'function' && !activity.is2D()
        const altitude = ZOOM_TO_ALTITUDE[zoom] || 200000
        const zoomOrAlt = is3D ? altitude : zoom
        addMsg('system', `Navigate: ${action.name || 'location'} (${is3D ? '3D alt=' + altitude + 'm' : 'zoom=' + zoom})`)
        await scrollToBottom()
        activity.center(action.longitude, action.latitude, zoomOrAlt)
      }
    } catch (error) {
      logger.error('[KNLChat] ' + error.message)
      addMsg('system', `Error: ${error.message}`)
    }
  }
}

async function send () {
  const text = inputText.value.trim()
  if (!text) return

  addMsg('user', text)
  inputText.value = ''
  loading.value = true
  await scrollToBottom()

  try {
    const result = await nlService.create({
      text,
      provider: selectedProvider.value,
      // Only the text goes back to the LLM, not the tables/charts
      conversationHistory: messages.value
        .filter(m => m.role === 'user' || m.role === 'assistant')
        .slice(-6)
        .map(m => ({ role: m.role, text: m.text }))
    })
    loading.value = false

    if (result.message) {
      addMsg('assistant', result.message, result.data)
      await scrollToBottom()
    }

    // Token usage as returned by the provider, with the model that was actually called
    if (result.usage && (result.usage.input_tokens || result.usage.output_tokens)) {
      const input = result.usage.input_tokens || 0
      const output = result.usage.output_tokens || 0
      addMsg('system', `Tokens: ${input} in + ${output} out = ${input + output} total` + (result.model ? ` (${result.model})` : ''))
      await scrollToBottom()
    }

    if (result.actions && result.actions.length > 0) {
      await executeActions(result.actions)
      addMsg('system', 'Done')
    } else if (!result.message) {
      addMsg('system', 'No response from AI')
    }

    await scrollToBottom()
  } catch (error) {
    loading.value = false
    logger.error('[KNLChat] ' + error.message)
    addMsg('system', `Error: ${error.message || 'Unknown error'}`)
    await scrollToBottom()
  }
}

onMounted(() => {
  nlService = api.getService('nl-command')
  if (messages.value.length === 0) {
    addMsg('system', i18n.t('KNLChat.READY'))
  }
  scrollToBottom()
})
</script>

<style>
.nlchat { display: flex; flex-direction: column; height: 100%; width: 100%; }
.nlchat-toolbar {
  display: flex; align-items: center; padding: 2px 8px; gap: 6px;
  background: #f5f5f5; border-bottom: 1px solid #e0e0e0; flex-shrink: 0;
}
.nlchat-messages { flex: 1; overflow-y: auto; padding: 8px; min-height: 0; }
.nlchat-msg { margin-bottom: 8px; }
.nlchat-input {
  display: flex; align-items: center; padding: 4px; gap: 4px;
  border-top: 1px solid #e0e0e0; flex-shrink: 0;
}

/* Bubbles: user and system ones are short, the assistant one may hold a table and takes the whole width */
.nlchat-bubble { padding: 8px 12px; border-radius: 8px; font-size: 13px; word-break: break-word; }
.nlchat-bubble.user { background: #1976d2; color: white; max-width: 85%; margin-left: auto; white-space: pre-wrap; }
.nlchat-bubble.system { background: #eceff1; color: #333; max-width: 85%; font-size: 11px; white-space: pre-wrap; }
.nlchat-bubble.assistant { background: #f5f5f5; color: #333; }
.nlchat-more { font-size: 11px; color: #888; }
.nlchat-chart { position: relative; width: 100%; margin-top: 8px; }

/* Markdown content styles for assistant messages */
.nlchat-md p { margin: 0 0 6px 0; line-height: 1.45; }
.nlchat-md p:last-child { margin-bottom: 0; }
.nlchat-md strong { font-weight: 600; }
.nlchat-md ul, .nlchat-md ol { margin: 4px 0; padding-left: 20px; }
.nlchat-md li { margin-bottom: 2px; }
.nlchat-md code {
  background: #e0e0e0; padding: 1px 4px; border-radius: 3px;
  font-size: 12px; font-family: monospace;
}
.nlchat-md pre {
  background: #263238; color: #eeffff; padding: 8px;
  border-radius: 4px; overflow-x: auto; font-size: 12px;
  margin: 6px 0;
}
.nlchat-md pre code { background: none; padding: 0; color: inherit; }

/* Table styles: names may wrap, numbers never do */
.nlchat-md table {
  border-collapse: collapse; width: 100%; margin: 6px 0;
  font-size: 12px;
}
.nlchat-md th {
  background: #1976d2; color: white;
  padding: 6px 8px; text-align: left; font-weight: 600;
  border: 1px solid #1565c0;
}
.nlchat-md td {
  padding: 5px 8px; border: 1px solid #e0e0e0;
}
.nlchat-md th.num, .nlchat-md td.num { text-align: right; white-space: nowrap; }
.nlchat-md tr:nth-child(even) { background: #fafafa; }
.nlchat-md tr:hover { background: #e3f2fd; }

/* Headings */
.nlchat-md h1, .nlchat-md h2, .nlchat-md h3 {
  margin: 8px 0 4px; font-weight: 600;
}
.nlchat-md h1 { font-size: 16px; }
.nlchat-md h2 { font-size: 14px; }
.nlchat-md h3 { font-size: 13px; }

/* Blockquote */
.nlchat-md blockquote {
  border-left: 3px solid #1976d2; margin: 6px 0;
  padding: 4px 10px; background: #e3f2fd;
}
</style>
