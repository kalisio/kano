// Page models
import * as pages from '../test/page-models'
import Subtitle from '../tutorials/subtitle'



fixture`2Dfixture`// declare the fixture
  .page`${pages.getUrl()}`  // specify the start page
  // test.before/test.after overrides fixture.beforeEach/fixture.afterEach hook,
  // so implement one in your test if you'd like another behaviour
  .beforeEach(async test => {
    // mock geolocation
    await pages.mockLocationAPI()
  })
  .afterEach(async test => {
    // check for console error messages
    await pages.checkNoClientError(test)
  })

const app = new pages.ApplicationLayout()
const auth = new pages.Authentication()
const select = new pages.Selectdata()
const panelMap = new pages.LayerPanelMap()
const sidenav = new pages.Sidenav()
const mapView = new pages.MapView()
const subtitle =  new Subtitle()
  

test('Login, and features', async test => {
  subtitle.initStart();
  subtitle.startRecord("Log in");
  await auth.logIn(test, { email:  'kalisio@kalisio.xyz', password: 'Pass;word1' })
  subtitle.stopRecord();
  subtitle.buildLogs();

 // await test.navigateTo("http://localhost:8080/#/home/map?south=39.07890809706475&west=-17.490234375000004&north=53.64463782485651&east=24.697265625000004")

  await test.setTestSpeed(0.1)

  //await select.select3D(test)
  
  subtitle.startRecord("Select 2D view");
  await sidenav.select2D(test)
  subtitle.stopRecord();  
  
  await panelMap.openRightPanel(test)
  
  subtitle.startRecord("Select a business layer");
  await panelMap.changeBusiness(test)
  subtitle.stopRecord();
  

  //await select.filldata(test)
  //await select.deleteData(test)
  
  await panelMap.closeRightPanel(test)  
  subtitle.startRecord("Move the map");
  await mapView.movemap(test, 800, 0)
  subtitle.stopRecord();
  
  subtitle.startRecord("Log out");
  await auth.logOut(test)
  subtitle.stopRecord();

  subtitle.exportLogs('2Dfixture');

})


