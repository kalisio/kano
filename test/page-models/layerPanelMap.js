import { Selector } from 'testcafe'
import VueSelector from 'testcafe-vue-selectors'
import ApplicationLayout from './layout'


export default class Layerpanelmap extends ApplicationLayout {
    constructor () {
      super()

      //input
      this.globalpanel = VueSelector('k-layout')
      this.sideBarRight = Selector('#map-panel-toggle')
      this.zoomTo = Selector('#zoomTo')
      this.remove = Selector('#remove')
      this.removeOk = Selector('.modal-buttons button').nth(0)
      this.removeCancel = Selector('.modal-buttons button').nth(1)

      //Couche métier
      this.business = VueSelector('q-collapsible').nth(1)
        this.sites = Selector('#sites')
        this.airports = Selector('#airports')
        this.airbus = Selector('#airbus-ev-ads-b')
        
      //Mes Meteo
      this.meteo = VueSelector('q-collapsible').nth(3)
        this.wind = Selector('#wind')
        this.gust = Selector('#gust')
        this.precipitations = Selector('#precipitations')
        this.windSpeed = Selector('#wind-speed')
        this.totalPrecipitation = Selector('#total-precipitation')
        this.temperature = Selector('#temperature')
        this.radarPrecipitation = Selector('#radar-des-précipitations')

      //Couche de mesures
      this.measures = VueSelector('q-collapsible').nth(2)
        this.vigicrues = Selector('#vigicrues')
        this.vigiprobes = Selector('#vigiprobes')
        this.téléray = Selector('#téléray')

      //Mes données
      //  this.mydata = VueSelector('q-collapsible').nth(3)
      
      //Fond carto
      this.map = VueSelector('q-collapsible').nth(0)
        this.sentinel2 = Selector('#sentinel-2')
        this.OSMBright = Selector('#osm-bright')
        this.OSMDark = Selector('#osm-dark')
        this.OSMTbright = Selector('#osmt-bright')
        this.OSMTdark = Selector('#osmt-dark')
        this.mosaik = Selector('#Mosaik')

    }

    async openRightPanel (test) {        
        await test
        .click(this.sideBarRight)
        .wait(500);
      }

      async closeRightPanel(test) {
        await test
        .click(this.globalpanel)
        .click(this.globalpanel)
        .wait(250)
      }

      async changeBusiness(test) {
      await test
      .click(this.business)
      .wait(500)
      .click(this.sites)
      .wait(500)
      .click(Selector('#layer-overflow-menu-entry').nth(0))
      .wait(500)
      .click(this.zoomTo)
      .wait(500)
    }

    async deleteData(test) {
    await test
    .click(this.business)
    .wait(500)
    .click(Selector('#layer-overflow-menu-entry').nth(0))
    .wait(500)
    .click(this.remove)
    .wait(500)
    .click(this.removeCancel)
    .wait(500)
  }

}