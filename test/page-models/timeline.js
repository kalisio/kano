import VueSelector from 'testcafe-vue-selectors'
import BasePage from './base-page'

export default class Timeline extends BasePage {
  constructor () {
    super()
    this.timeline = VueSelector('k-timeline')
  }

  async isVisible () {
    const exists = await this.timeline.exists
    if (!exists) return false
    return this.timeline.visible
  }
}
