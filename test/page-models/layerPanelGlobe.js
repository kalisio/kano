import { Selector } from 'testcafe'
import VueSelector from 'testcafe-vue-selectors'
import ApplicationLayout from './layout'
//import Subtitle from '../subtitle'


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

      async openRightPanel(test, subtitle){
        if (subtitle!=null) {
          subtitle.startRecord("Open option panel");
        }
        await test
        .click(this.sideBarRight3D)
        .wait(500)
        if (subtitle!=null) {
          subtitle.stopRecord();
        }
      }

      async closeRightPanel(test, subtitle){
        if (subtitle!=null) {
          subtitle.startRecord("Close option panel");
        }
        await test
        .click(this.globalpanel)
        .click(this.globalpanel)
        .wait(250)
        if (subtitle!=null) {
          subtitle.stopRecord();
        }
      }


}