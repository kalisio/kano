import VueSelector from 'testcafe-vue-selectors'
import BasePage from './base-page'

export default class Timeline  extends BasePage {
  constructor () {
    super()
    this.timeline = VueSelector('k-timeline')
  }

  async isVisible () {
    return await this.timeline.exists && await this.timeline.visible
  }
}