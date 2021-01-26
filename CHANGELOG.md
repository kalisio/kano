# Changelog

## [prod-v1.1.1](https://github.com/kalisio/kano/tree/prod-v1.1.1) (2021-01-26)

[Full Changelog](https://github.com/kalisio/kano/compare/prod-v1.1.0...prod-v1.1.1)

**Fixed bugs:**

- Click event not sent in iframe API [\#153](https://github.com/kalisio/kano/issues/153)

## [prod-v1.1.0](https://github.com/kalisio/kano/tree/prod-v1.1.0) (2020-11-10)

[Full Changelog](https://github.com/kalisio/kano/compare/prod-v1.0.0...prod-v1.1.0)

**Implemented enhancements:**

- Openseamap overlay [\#143](https://github.com/kalisio/kano/issues/143)
- Improve wind layer configuration [\#140](https://github.com/kalisio/kano/issues/140)
- Improve capabilities to include distributed services [\#139](https://github.com/kalisio/kano/issues/139)
- Enhance OpenAQ configuration to handle future 1.0.0 version [\#134](https://github.com/kalisio/kano/issues/134)
- Improve documentation [\#133](https://github.com/kalisio/kano/issues/133)
- Enhance vigicrues configuration to handle the new version of the dataset [\#129](https://github.com/kalisio/kano/issues/129)
- Add a client function to fetch layer config for tests [\#122](https://github.com/kalisio/kano/issues/122)
- Add steps to build script to push testcafe test artefacts to s3 [\#121](https://github.com/kalisio/kano/issues/121)
- Add 'import layer' action to fab [\#120](https://github.com/kalisio/kano/issues/120)
- Display a tour to provide  a brief help [\#39](https://github.com/kalisio/kano/issues/39)

**Fixed bugs:**

-  Getting a timeout when trying to view new Vigicrues dataset [\#131](https://github.com/kalisio/kano/issues/131)
- Quasar language packs installation is missing [\#125](https://github.com/kalisio/kano/issues/125)

**Merged pull requests:**

- Adding nautical informations layer \(OpenSeaMap\).  [\#144](https://github.com/kalisio/kano/pull/144) ([benoit-jpi](https://github.com/benoit-jpi))
- build\(deps\): bump showdown from 1.9.0 to 1.9.1 [\#137](https://github.com/kalisio/kano/pull/137) ([dependabot[bot]](https://github.com/apps/dependabot))
- build\(deps\): bump prismjs from 1.20.0 to 1.21.0 in /docs [\#136](https://github.com/kalisio/kano/pull/136) ([dependabot[bot]](https://github.com/apps/dependabot))
- build\(deps\): bump elliptic from 6.5.2 to 6.5.3 in /docs [\#135](https://github.com/kalisio/kano/pull/135) ([dependabot[bot]](https://github.com/apps/dependabot))
- build\(deps\): bump lodash from 4.17.15 to 4.17.19 in /docs [\#132](https://github.com/kalisio/kano/pull/132) ([dependabot[bot]](https://github.com/apps/dependabot))
- build\(deps\): bump lodash from 4.17.15 to 4.17.19 [\#127](https://github.com/kalisio/kano/pull/127) ([dependabot[bot]](https://github.com/apps/dependabot))

## [prod-v1.0.0](https://github.com/kalisio/kano/tree/prod-v1.0.0) (2020-06-01)

[Full Changelog](https://github.com/kalisio/kano/compare/2a2837264443192596b034d3b7740f7159f4c504...prod-v1.0.0)

**Implemented enhancements:**

- Enhance default layers management [\#111](https://github.com/kalisio/kano/issues/111)
- Enhance Timline design [\#107](https://github.com/kalisio/kano/issues/107)
- Allow to select the current forecast model within the weather panel [\#106](https://github.com/kalisio/kano/issues/106)
- Enhance layout [\#105](https://github.com/kalisio/kano/issues/105)
- Migrate to the new kdk module [\#103](https://github.com/kalisio/kano/issues/103)
- Support Mapillary  [\#102](https://github.com/kalisio/kano/issues/102)
- Deployment should rely on an existing MongoDB instance [\#100](https://github.com/kalisio/kano/issues/100)
- Add an about section [\#99](https://github.com/kalisio/kano/issues/99)
- Create a service to access AWS S3 Kargo storage [\#98](https://github.com/kalisio/kano/issues/98)
- Add Hubeau hydrometry layer [\#94](https://github.com/kalisio/kano/issues/94)
- Enhance docker build to decrease image size [\#93](https://github.com/kalisio/kano/issues/93)
- Access map data layers through an API gateway [\#92](https://github.com/kalisio/kano/issues/92)
- Plugin system to enhance customization [\#89](https://github.com/kalisio/kano/issues/89)
- Make style colors configurable [\#90](https://github.com/kalisio/kano/issues/90)
- Integrate KNavigationBar [\#87](https://github.com/kalisio/kano/issues/87)
- Update drawers management [\#86](https://github.com/kalisio/kano/issues/86)
- Migrate to Quasar 1.0.x [\#85](https://github.com/kalisio/kano/issues/85)
- Improve end-to-end tests [\#84](https://github.com/kalisio/kano/issues/84)
- Add temperature layer in forecast data [\#83](https://github.com/kalisio/kano/issues/83)
- Update Teleray configuration [\#82](https://github.com/kalisio/kano/issues/82)
- probedLocationName in mixin.timeseries.js should rely on the property name only [\#81](https://github.com/kalisio/kano/issues/81)
- Enhance zIndex for forecast layers [\#80](https://github.com/kalisio/kano/issues/80)
- Migrate to PIXI.js 5 [\#79](https://github.com/kalisio/kano/issues/79)
- Improve scalability and separation of concerns [\#74](https://github.com/kalisio/kano/issues/74)
- Make geolocation optional [\#73](https://github.com/kalisio/kano/issues/73)
- Add support for rendering a gradient path [\#72](https://github.com/kalisio/kano/issues/72)
- 2D/3D view should be saved then restored on returning session [\#70](https://github.com/kalisio/kano/issues/70)
- Restore websocket transport mode by default [\#68](https://github.com/kalisio/kano/issues/68)
- Make client transport dynamically configurable [\#65](https://github.com/kalisio/kano/issues/65)
- Allow to create a new layer [\#64](https://github.com/kalisio/kano/issues/64)
- Allow to force the locale to be used [\#60](https://github.com/kalisio/kano/issues/60)
- Update CI/CD pipeline [\#57](https://github.com/kalisio/kano/issues/57)
- Manage persistent user data [\#54](https://github.com/kalisio/kano/issues/54)
- Feature layer edition capabilities [\#53](https://github.com/kalisio/kano/issues/53)
- Move the most possible parts of code to kMap module [\#52](https://github.com/kalisio/kano/issues/52)
- Make authentication optional [\#51](https://github.com/kalisio/kano/issues/51)
- Add openaq layer [\#50](https://github.com/kalisio/kano/issues/50)
- Show coordinates under current mouse position [\#49](https://github.com/kalisio/kano/issues/49)
- Unify time display across components [\#48](https://github.com/kalisio/kano/issues/48)
- Timeseries tooltip should include all variables [\#47](https://github.com/kalisio/kano/issues/47)
- Make timeseries available in Globe [\#46](https://github.com/kalisio/kano/issues/46)
- Create an iframe integration API [\#45](https://github.com/kalisio/kano/issues/45)
- Allow to define the style of imported GeoJson layers [\#42](https://github.com/kalisio/kano/issues/42)
- Add a vertical time line in timeseries [\#41](https://github.com/kalisio/kano/issues/41)
- Timeseries should be maximized on mobile [\#35](https://github.com/kalisio/kano/issues/35)
- Add an action on a layer to zoom to [\#31](https://github.com/kalisio/kano/issues/31)
- Manage UTC/Locale time mode [\#29](https://github.com/kalisio/kano/issues/29)
- Allow to configure the leaflet view using options [\#26](https://github.com/kalisio/kano/issues/26)
- Update the logo [\#25](https://github.com/kalisio/kano/issues/25)
- Improve timeseries display [\#23](https://github.com/kalisio/kano/issues/23)
- Allow to configure registration availability [\#22](https://github.com/kalisio/kano/issues/22)
- Allow to display meteorological radar data [\#21](https://github.com/kalisio/kano/issues/21)
- Customisable domain [\#17](https://github.com/kalisio/kano/issues/17)
- Update current time regularly [\#16](https://github.com/kalisio/kano/issues/16)
- Enhance the deployment method  [\#14](https://github.com/kalisio/kano/issues/14)
- Create a probe layer [\#13](https://github.com/kalisio/kano/issues/13)
- Integrate a level controller [\#12](https://github.com/kalisio/kano/issues/12)
- Make the AppBar invisible [\#10](https://github.com/kalisio/kano/issues/10)
- Integrate a MapPanel and a GlobePanel on the right of the layout [\#9](https://github.com/kalisio/kano/issues/9)
- Provide the capability to go fullscreen [\#8](https://github.com/kalisio/kano/issues/8)
- Proxy requests to the Weacast API [\#7](https://github.com/kalisio/kano/issues/7)
- Include time series visualization of forecast data [\#6](https://github.com/kalisio/kano/issues/6)
- Provide the capability to geocode an address [\#4](https://github.com/kalisio/kano/issues/4)
- Provide the capability to geolocate the user [\#3](https://github.com/kalisio/kano/issues/3)
- Include a forecast model selector [\#2](https://github.com/kalisio/kano/issues/2)
- Map and Globe components must be activities [\#1](https://github.com/kalisio/kano/issues/1)
- Improve time controller [\#11](https://github.com/kalisio/kano/issues/11)

**Fixed bugs:**

- When restarting Kano an error occured while updating the catalog [\#112](https://github.com/kalisio/kano/issues/112)
- Conflicting tooltip/marker with meteorological features [\#109](https://github.com/kalisio/kano/issues/109)
- When navigating the activities are automatically refreshed [\#108](https://github.com/kalisio/kano/issues/108)
- Clicking a feature with no valid measure makes the timeseries widget buggy [\#95](https://github.com/kalisio/kano/issues/95)
- Cannot deploy as root [\#78](https://github.com/kalisio/kano/issues/78)
- Style properties stored in features are overridden by layer options [\#77](https://github.com/kalisio/kano/issues/77)
- Adding another layer in globe hides previous ones [\#76](https://github.com/kalisio/kano/issues/76)
- Once the timeseries has been closed on vigiprobes it cannot be open anymore [\#71](https://github.com/kalisio/kano/issues/71)
- When switching between 2D/3D mode the view is not correctly restored [\#69](https://github.com/kalisio/kano/issues/69)
- Translations are not working when forcing the locale to `en` [\#67](https://github.com/kalisio/kano/issues/67)
- After editing a feature styling is not correctly updated [\#63](https://github.com/kalisio/kano/issues/63)
- Editing a layer just after saving fails [\#62](https://github.com/kalisio/kano/issues/62)
- Zooming to Weacast layers does not work [\#61](https://github.com/kalisio/kano/issues/61)
- Some dialogs cannot be closed [\#59](https://github.com/kalisio/kano/issues/59)
- Timeline should support i18n [\#44](https://github.com/kalisio/kano/issues/44)
- The legend has an orientation depending on the displayed layer [\#40](https://github.com/kalisio/kano/issues/40)
- Displaying a non-meteo layer makes the legend disappear on the meteo layer [\#38](https://github.com/kalisio/kano/issues/38)
- Marker style not applied when selecting a vigicrues probe [\#37](https://github.com/kalisio/kano/issues/37)
- Timeseries title do not support name with accents [\#36](https://github.com/kalisio/kano/issues/36)
- The map is not rendered if the geolocation is not active [\#34](https://github.com/kalisio/kano/issues/34)
- The target probe does not match the current forecast model when probing a feature [\#33](https://github.com/kalisio/kano/issues/33)
- Time step is not correctly computed for vigicrues timeseries  [\#32](https://github.com/kalisio/kano/issues/32)
- Timeseries not in sync with probed location layer [\#30](https://github.com/kalisio/kano/issues/30)
- Switching between forecast models can break the timeline [\#24](https://github.com/kalisio/kano/issues/24)
- Timeseries display is not right [\#18](https://github.com/kalisio/kano/issues/18)

**Merged pull requests:**

- Add license scan report and status [\#96](https://github.com/kalisio/kano/pull/96) ([fossabot](https://github.com/fossabot))



\* *This Changelog was automatically generated by [github_changelog_generator](https://github.com/skywinder/Github-Changelog-Generator)*