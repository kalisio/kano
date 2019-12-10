<template>
  <div>
    <q-list>
      <q-separator />
      <!--
        About link
      -->
      <q-item id="show-about" clickable @click="onAbout">
        <q-item-section avatar>
          <q-icon name="help_outline" />
        </q-item-section>
        <q-item-section>
          <q-item-label>
            {{ $t('sideNav.ABOUT') }}
          </q-item-label>
        </q-item-section>
      </q-item>
    </q-list>
    <!--
      About window
     -->
    <k-modal :title="$t('About.TITLE')" :toolbar="getToolbar()" id="about" ref="about">
      <div slot="modal-content">
        <div class="column justify-center">
          <!-- Banner -->
          <div v-if="banner" class="row justify-center"><img class="screen-banner" :src="banner"></div>
          <!-- Version -->
          <div class="row justify-center">
            <cite v-if="clientVersionName">{{ $t('About.CLIENT_VERSION') }} {{ clientVersionName }}</cite>
            <cite v-if="apiVersionName">&nbsp;-&nbsp;{{ $t('About.API_VERSION') }} {{ apiVersionName }}</cite>
          </div><br/>
          <!-- More info -->
          <div class="row justify-center">
            <a href="https://github.com/kalisio/kano" target="_blank">
              <q-icon name="link"/>&nbsp;{{ $t('About.MORE') }}
            </a>
          </div><br/>
          <!-- Bug report -->
          <div class="row justify-center">
            <a :href="`mailto:${bugReport.address}?subject=${bugReport.subject}&body=${bugReport.body}`">
              <q-icon name="email"/>&nbsp;{{ $t('About.BUG_REPORT') }}
            </a>
          </div><br/>
          <!-- System -->
          <div class="row justify-center" @click="showSystemDetails = !showSystemDetails">
            <a>
              <q-icon name="perm_device_information"/>&nbsp;{{ $t('About.SYSTEM_DETAILS') }}
            </a>
          </div>
          <br/>
          <div v-show="showSystemDetails">
            <template v-for="(value, key) in systemDetails">
              <div class="row justify-center">
                <cite><strong>{{ key }}</strong>: {{ value }}</cite>
              </div>
            </template>
          </div>
          <br/>
          <!-- KDK -->
          <div class="row justify-center">
            <img :src="$load('kdk-icon.png', 'asset')" width="20" height="20" />
            <a href="https://kalisio.github.io/kdk" target="_blank">{{ $t('About.KDK_POWERED') }}</a>
          </div>
        </div>
      </div>
    </k-modal>
  </div>
</template>

<script>
import _ from 'lodash'
import { openURL } from 'quasar'
import { mixins } from '@kalisio/kdk-core/client'

export default {
  name: 'about',
  inject: ['klayout'],
  mixins: [mixins.version],
  data () {
    return {
      systemDetails: {},
      showSystemDetails: false,
      bugReport: {}
    }
  },
  methods: {
    getToolbar () {
      return [
        { name: 'close-action', label: this.$t('About.CLOSE_ACTION'), icon: 'close', handler: () => this.onAboutClosed() }
      ]
    },
    onAbout () {
      this.$refs.about.open()
    },
    onAboutClosed () {
      this.$refs.about.close()
      this.klayout.hideLeftDrawer()
    }
  },
  created () {
    // Load the required components
    this.$options.components['k-modal'] = this.$load('frame/KModal')
    // Configure this screen
    this.banner = this.$load(this.$config('screens.banner', 'kalisio-banner.png'), 'asset')
    Object.assign(this.systemDetails, this.$q.platform.is)
    Object.assign(this.systemDetails, { touch: this.$q.platform.has.touch })
    Object.assign(this.systemDetails, { iframe: this.$q.platform.within.iframe })
    Object.assign(this.systemDetails, { agent: this.$q.platform.userAgent })
    const context = { clientVersionName: this.clientVersionName, apiVersionName: this.apiVersionName }
    this.bugReport.address = 'support@kalisio.com'
    this.bugReport.subject = this.$t('About.BUG_REPORT_SUBJECT', context)
    this.bugReport.body = this.$t('About.BUG_REPORT_BODY')
    // Append detailed system info to email body
    _.forOwn(this.systemDetails, (value, key) => { this.bugReport.body += `${key}: ${value}%0D%0A` })
  }
}
</script>