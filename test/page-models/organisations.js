import { Selector } from 'testcafe'
import VueSelector from 'testcafe-vue-selectors'
import ApplicationLayout from './layout'

export default class Organisations extends ApplicationLayout {
  constructor () {
    super()
    this.orgPanel = VueSelector('k-organisations-panel')
  }
}

