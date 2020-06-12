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

  async isVisible () {
    const exists = await this.timeline.exists
    if (!exists) return false
    return this.timeline.visible
  }

  getDay (day) {
    if (day === '+') return this.timeline.find('i.la-calendar-plus')
    if (day === '-') return this.timeline.find('i.la-calendar-minus')
    return this.timeline.find('.ellipsis').withExactText(day)
  }

  getHour (hour) {
    if (hour === '+') return this.timeline.find('i.la-angle-right')
    if (hour === '-') return this.timeline.find('i.la-angle-left')
    return this.timeline.find('.k-timeline-hour-frame').withExactText(hour)
  }

  getStep (step) {
    if (step === '+') return this.timeline.find('i.la-step-forward')
    if (step === '-') return this.timeline.find('i.la-step-backward')
    return null
  }

  async clickDay (day) {
    const button = this.getDay(day)
    await t
      .click(button)
  }

  async clickHour (hour) {
    const button = this.getHour(hour)
    await t
      .click(button)
  }

  async clickStep (step) {
    const button = this.getStep(step)
    await t
      .click(button)
  }
}
