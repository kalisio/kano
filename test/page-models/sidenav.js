import { Selector } from 'testcafe'
import VueSelector from 'testcafe-vue-selectors'
import ApplicationLayout from './layout'
//import Subtitle from '../subtitle'


export default class sidenav extends ApplicationLayout {
    constructor () {
      super()
      this.sideBarLeft = Selector('#side-nav-toggle')
      this.twoDimension = VueSelector('k-links-panel').find('.q-item-label').withText('Vue 2D')
      this.threeDimension = VueSelector('k-links-panel').find('.q-item-label').withText('3D')

    }

    async select2D(test, subtitle){
        if (subtitle!=null) {
          subtitle.startRecord("Vue 2D");
        }
      await test
      .click(this.sideBarLeft)
      .wait(500)
      .click(this.twoDimension)
      .wait(500)
        if (subtitle!=null) {
          subtitle.stopRecord()
        }
    }
    
    async select3D(test, subtitle){
        if (subtitle!=null) {
          subtitle.startRecord("Vue 3D");
        }
      await test
      .click(this.sideBarLeft)
      .wait(500)
      .click(this.threeDimension)
      .wait(500)
        if (subtitle!=null) {
          subtitle.stopRecord();
        }
    }

}