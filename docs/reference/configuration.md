---
sidebarDepth: 3
---

# Configuration

The default frontend configuration file can be found [here](https://github.com/kalisio/kano/blob/master/config/default.js).

Most options come from the "standard" frontend [configuration](https://kalisio.github.io/kdk/guides/basics/step-by-step.html#configuring-a-kapp) of **KDK** based app, here are the main one:
* **appName**: displayed application name,
* **appLogo**: displayed application logo,
* **publisher**: 'Kalisio',
* **screens**: connection screens configuration
  * **banner**: displayed application banner,
  * **login**: login screen configuration
    * **providers**: array of OAuth2 providers to be used (like `['google', 'github']`),
    * **links**: links displayed at the bottom of the screen,
  * **logout**: logout screen configuration
    * **links**: links displayed at the bottom of the screen,
  * **changeEndpoint**: change endpoint screen configuration (only useful for mobile apps)
    * **links**: links displayed at the bottom of the screen,
* **layout**: layout configuration, see [Quasar docs](https://quasar.dev/layout/layout) for details,
* **sideNav**: side navigation component configuration
  * **banner**: displayed application banner,
  * **components**: key/value pairs of components displayed in side navigation (an entry looks like `user_actions: 'layout/KLinksPanel'`),
* **XXX**: configuration object for component YYY of e.g. side navigation
* **mapCatalog**: 2D map layers panel configuration
  * **filter**: global layer filter,
  * **categories**: list of categories to be displayed in 2D map layers panel,
* **globeCatalog**: 2D globe layers panel configuration
  * **filter**: global layer filter,
  * **categories**: list of categories to be displayed in 3D globe layers panel,
* **mapActivity**: 2D map activity configuration
  * **tools**: active UI tools in the navigation bar among `['side-nav', 'zoom', 'track-location', 'location-bar', 'globe', 'fullscreen', 'catalog']`,
  * **actions**: active UI action in the FAB among `['probe-location']`,
  * **layerActions**: active UI action in layer menu among `['zoom-to', 'save', 'edit', 'edit-data', 'remove']`
  * **components**: a list of additional components to display (see [advanced usage](./advanced-usage.md))
* **globeActivity**: 3D globe activity configuration
  * **tools**: active UI tools in the navigation bar among `['side-nav', 'zoom', 'track-location', 'location-bar', 'map', 'fullscreen', 'catalog', 'vr']`,
  * **actions**: active UI action in the FAB among `['probe-location', 'create-layer']`,
  * **layerActions**: active UI action in layer menu among `['zoom-to', 'save', 'edit', 'remove']`
  * **components**: a list of additional components to display (see [advanced usage](./advanced-usage.md))
* **map**: 2D map view configuration
	* **viewer**: 2D map initialization [options](https://leafletjs.com/reference.html#map-option),
	* **featureStyle**: default GeoJSON [layer style](https://kalisio.github.io/kdk/api/map/mixins.md#map-style) for polygons/lines,
	* **pointStyle**: default GeoJSON [layer style](https://kalisio.github.io/kdk/api/map/mixins.md#map-style) for points,
	* **popup**: default GeoJSON [popup style](https://kalisio.github.io/kdk/api/map/mixins.md#map-popup),
	* **tooltip**: default GeoJSON [tooltip style](https://kalisio.github.io/kdk/api/map/mixins.md#map-tooltip),
	* **cluster**: default GeoJSON [clustering style](https://kalisio.github.io/kdk/api/map/mixins.md#map-style),
	* **fileLayers**: default file layer [options](https://kalisio.github.io/kdk/api/map/mixins.md#file-layer),
* **globe**: 3D globe view configuration
	* **viewer**: 3D globe initialization [options](https://cesiumjs.org/Cesium/Build/Documentation/Viewer.html#Viewer)
	* **fileLayers**: default file layer [options](https://kalisio.github.io/kdk/api/map/mixins.md#file-layer),
	* **featureStyle**: default GeoJSON [layer style](https://kalisio.github.io/kdk/api/map/mixins.md#globe-style) for polygons/lines/points,
	* **entityStyle**: default [entity style](https://kalisio.github.io/kdk/api/map/mixins.md#globe-style),
	* **tooltip**: default GeoJSON [tooltip style](https://kalisio.github.io/kdk/api/map/mixins.md#globe-tooltip),
	* **popup**: default GeoJSON [popup style](https://kalisio.github.io/kdk/api/map/mixins.md#globe-popup),
	* **clusterStyle**: default GeoJSON [clustering style](https://kalisio.github.io/kdk/api/map/mixins.md#globe-style),
	* **cluster**: default GeoJSON [cluster options](https://kalisio.github.io/kdk/api/map/mixins.md#globe-style)