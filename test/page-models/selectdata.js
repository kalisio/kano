import { Selector } from 'testcafe'
import VueSelector from 'testcafe-vue-selectors'
import ApplicationLayout from './layout'
//import Subtitle from '../subtitle'


export default class Selectdata extends ApplicationLayout {
    constructor () {
      super()
      //input
      this.globalpanel = VueSelector('k-layout')
      
      this.sideBarRight2D = Selector('#map-panel-toggle')
      this.sideBarRight3D = Selector('#globe-panel-toggle')
      this.zoomTo = Selector('#zoomTo')
      this.remove = Selector('#remove')
      this.removeOk = Selector('.modal-buttons button').nth(0)
      this.removeCancel = Selector('.modal-buttons button').nth(1)

      this.sideBarLeft = Selector('#side-nav-toggle')
      this.twoDimension = VueSelector('k-links-panel').find('.q-item-label').withText('Vue 2D')
      this.threeDimension = VueSelector('k-links-panel').find('.q-item-label').withText('3D')

      //2D
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
      
/*  3D
      //Couche métier
      this.business = VueSelector('q-collapsible').nth(0)
        this.sites = Selector('#sites')
        this.airports = Selector('#airports')
        this.airbus = Selector('#a')
        
      //Couche de mesures
      this.measures = VueSelector('q-collapsible').nth(1)
        this.vigicrues = Selector('#vigicrues')
        this.vigiprobes = Selector('#vigiprobes')
        this.téléray = Selector('#téléray')

      //Mes donées
      this.data = VueSelector('q-collapsible').nth(2)
      
      //Fond carto
      this.map = VueSelector('q-collapsible').nth(3)
        this.sentinel2 = Selector('#sentinel-2')
        this.OSMBright = Selector('#OSM Bright')
        this.OSMDark = Selector('#OSM Dark')
        this.OSMTbright = Selector('#OSMT bright')
        this.OSMTdark = Selector('#OSMT dark')
        this.mosaik = Selector('#Mosaik')
      
      //Terrain
      this.ground = VueSelector('q-collapsible').nth(4)
*/
      //this.create = Selector('#apply-button')

      //Record
      this.startTimer = Date.now()/1000;
      this.timerOn = new Array();
      this.timerOff = new Array();
      this.userStorie = new Array();
      this.Logs = "";

    }

    async navigateToFrance(test){
      await test
      .navigateTo("http://localhost:8080/#/home/map?south=39.07890809706475&west=-17.490234375000004&north=53.64463782485651&east=24.697265625000004")
      .wait(1000)
    
    }
/*
    async openRightPane2d(test){
      await test
      .click(this.sideBarRight2D)
      .wait(500);
    }*/
    async openRightPane2d(test, subtitle){
      if (subtitle!=null) {
        subtitle.startRecord("Ouverture du panneau d'option");
      }
      
      await test
      .click(this.sideBarRight2D)
      .wait(500);
      if (subtitle!=null) {
        subtitle.stopRecord();
      }
    }


    async openRightPane3d(test){
      await test
      .click(this.sideBarRight3D)
      .wait(500)
    }
    async openRightPane3d(test, subtitle){
      if (subtitle!=null) {
        subtitle.startRecord("Ouverture du panneau d'option");
      }
      await test
      .click(this.sideBarRight3D)
      .wait(500)
      if (subtitle!=null) {
        subtitle.stopRecord();
      }
    }

    async closeRightPane(test){
      await test
      .click(VueSelector('k-layout'))
      .click(VueSelector('k-layout'))
      .wait(250)
    }
    async closeRightPane(test, subtitle){
      if (subtitle!=null) {
        subtitle.startRecord("Fermeture du panneau d'option");
      }
      await test
      .click(VueSelector('k-layout'))
      .click(VueSelector('k-layout'))
      .wait(250)
      if (subtitle!=null) {
        subtitle.stopRecord();
      }
    }

    async filldata(test) {        
        await test
        .click(this.map)
        .wait(500)
        .click(this.mosaik)
        .wait(500)
        .click(this.meteo)
        .wait(500)
        .click(this.wind)
        .click(this.measures).wait(10000)
        this.stopRecord();
      }

  async changeBusiness(test){
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
  async changeBusiness(test, subtitle){
      if (subtitle!=null) {
        subtitle.startRecord("Selection d'une couche à afficher");
      }
    await test
    .click(this.business)
    .wait(500)
    .click(this.sites)
    .wait(500)
    .click(Selector('#layer-overflow-menu-entry').nth(0))
    .wait(500)
    .click(this.zoomTo)
    .wait(500)
      if (subtitle!=null) {
        subtitle.stopRecord();
      }
  }
    
  async movemap(test, x, y){
    await test    
    .drag(this.globalpanel, x, y)
    .wait(500)
  }
  async movemap(test, x, y, subtitle){
      if (subtitle!=null) {
        subtitle.startRecord("Depalcement de la carte");
      }
    await test    
    .drag(this.globalpanel, x, y)
    .wait(500)
      if (subtitle!=null) {
        subtitle.stopRecord();
      }
  }

  async deleteData(test){
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
  async deleteData(test, subtitle){
      if (subtitle!=null) {
        subtitle.startRecord("Suppresion de donnée");
      }
    await test
    .click(this.business)
    .wait(500)
    .click(Selector('#layer-overflow-menu-entry').nth(0))
    .wait(500)
    .click(this.remove)
    .wait(500)
    .click(this.removeCancel)
    .wait(500)
      if (subtitle!=null) {
        subtitle.stopRecord();
      }
  }

  async select2D(test){
      await test
      .click(this.sideBarLeft)
      .wait(500)
      .click(this.twoDimension)
      .wait(500)
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
  async select3D(test){
      await test
      .click(this.sideBarLeft)
      .wait(500)
      .click(this.threeDimension)
      .wait(500)
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
