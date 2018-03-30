import { Selector } from 'testcafe'
import VueSelector from 'testcafe-vue-selectors'
import ApplicationLayout from './layout'
import _ from 'lodash'

export default class Groups extends ApplicationLayout {
  constructor () {
    super()
    this.groupsGrid = VueSelector('k-groups-activity k-grid')
  }
  getToolbarEntry () {
    return '#members'  
  }
  async checkCount (test, count) {
    const collection = await this.groupsGrid.getVue()
    await test.expect(groupsGrid.state.items.length).eql(count, 'Invalid number of groups')
  }
}

