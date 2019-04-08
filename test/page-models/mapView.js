import { Selector } from 'testcafe'
import VueSelector from 'testcafe-vue-selectors'
import ApplicationLayout from './layout'
//import Subtitle from '../subtitle'


export default class MapView extends ApplicationLayout {
    constructor () {
      super()
      
      //input
      this.globalpanel = VueSelector('k-layout')

    }

    async movemap(test, x, y){
      await test    
      .drag(this.globalpanel, x, y)
      .wait(500)
    }
}