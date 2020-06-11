import { Selector, t } from 'testcafe'
import VueSelector from 'testcafe-vue-selectors'
import BasePage from './base-page'

export default class Timeline extends BasePage {
  constructor () {
    super()

    this.opener = Selector('#opener-bottom')
    this.timeline = VueSelector('k-timeline')
  }

  async open () {
    const timeline = Selector(this.timeline, { visibilityCheck: true })
    await t
      .click(this.opener)
      .wait(100)
      .expect(timeline.exists).ok()
  }

  async close () {
    await t
      .click(this.opener)
  }

  // async isVisible () {
  //   const exists = await this.timeline.exists
  //   if (!exists) return false
  //   return this.timeline.visible
  // }

  async clickDay (day) {
    let button = null
    if (day === '+') {
      button = this.timeline.find('i.la-calendar-plus')
    } else if (day === '-') {
      button = this.timeline.find('i.la-calendar-minus')
    } else {
      button = this.timeline.find('.ellipsis').withExactText(day)
    }
    await t.click(button)
  }

  async clickHour (hour) {
    let button = null
    if (hour === '+') {
      button = this.timeline.find('i.la-angle-right')
    } else if (hour === '-') {
      button = this.timeline.find('i.la-angle-left')
    } else {
      button = this.timeline.find('.k-timeline-hour-frame').withExactText(hour)
    }
    await t.click(button)
  }

  async clickStep (step) {
    let button = null
    if (step === '+') {
      button = this.timeline.find('i.la-step-forward')
    } else if (step === '-') {
      button = this.timeline.find('i.la-step-backward')
    }
    await t.click(button)
  }
}
