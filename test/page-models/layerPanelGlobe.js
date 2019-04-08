import { Selector } from 'testcafe'
import VueSelector from 'testcafe-vue-selectors'
import ApplicationLayout from './layout'


export default class Layerpanelglobal extends ApplicationLayout {
    constructor () {
      super()

      //input
      this.globalpanel = VueSelector('k-layout')
      this.sideBarRight3D = Selector('#globe-panel-toggle')
      this.zoomTo = Selector('#zoomTo')
      this.remove = Selector('#remove')
      this.removeOk = Selector('.modal-buttons button').nth(0)
      this.removeCancel = Selector('.modal-buttons button').nth(1)

    }

      async openRightPanel(test){
        await test
        .click(this.sideBarRight3D)
        .wait(500)
      }

      async closeRightPanel(test, subtitle){
        await test
        .click(this.globalpanel)
        .click(this.globalpanel)
        .wait(250)
      }


}