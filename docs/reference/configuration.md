---
sidebarDepth: 3
---

# Configuration

The default backend configuration file can be found [here](https://github.com/kalisio/kano/blob/master/api/config/default.cjs).

Most options come from the "standard" backend [configuration](https://kalisio.github.io/kApp/reference/configuration.html#backend-side) of **KDK** based app.

The default frontend configuration file can be found [here](https://github.com/kalisio/kano/blob/master/config/default.js).

Most options come from the "standard" frontend [configuration](https://kalisio.github.io/kApp/reference/configuration.html#frontend-side) of **KDK** based app, here are the main ones:
* **appName**: displayed application name,
* **appLogo**: displayed application logo,
* **theme**: the theme to be used,
* **screens**: connection screens configuration
  * **banner**: displayed application banner,
  * **login**: login screen configuration
    * **providers**: array of OAuth2 providers to be used (like `['google', 'github']`),
    * **links**: links displayed at the bottom of the screen,
  * **logout**: logout screen configuration
    * **links**: links displayed at the bottom of the screen,
  * **changeEndpoint**: change endpoint screen configuration (only useful for mobile apps)
    * **links**: links displayed at the bottom of the screen,
* **layout**: layout configuration (see [Quasar docs](https://quasar.dev/layout/layout) for details)
  * **welcome**: `true` to display the welcome screen by default,
  * **topPane**: application bar setup,
    * **opener**: `true` to add a handler to open/close the pane,
    * **visible**: `true` to show this pane,
  * **leftPane**: left pane (i.e. main menu) setup (as above),
  * **bottomPane**: bottom pane setup (as above),
  * **rightPane**: right pane setup (as above),
* **weacast**: [Weacast](https://weacast.github.io/weacast/) service 
  * **enabled**: `true` to enable **Weacast** service. By default the service is enabled.
* **mapActivity**: 2D map activity configuration
  * **topPane**: application bar components configuration
    * **content**: list of components to be displayed according to current mode,
    * **filter**: component filter using any expression supported by [sift](https://github.com/crcn/sift.js),
  * **leftPane**: left pane (i.e. main menu) components configuration
    * **content**: list of components to be displayed,
    * **filter**: component filter using any expression supported by [sift](https://github.com/crcn/sift.js),
  * **bottomPane**: bottom pane components configuration
    * **content**: list of components to be displayed,
    * **filter**: component filter using any expression supported by [sift](https://github.com/crcn/sift.js),
  * **rightPane**: right pane components configuration
    * **content**: list of components to be displayed,
    * **filter**: component filter using any expression supported by [sift](https://github.com/crcn/sift.js),
  * **page**: page components configuration (can be used to add your [own components](../guides/advanced-usage.md#developing-in-kano))
    * **content**: list of components to be displayed,
    * **filter**: component filter using any expression supported by [sift](https://github.com/crcn/sift.js),
  * **window**: window (i.e. widgets) configuration
    * **widgets**: list of widgets to be displayed,
    * **filter**: component filter using any expression supported by [sift](https://github.com/crcn/sift.js),
  * **fab**: floating action button (FAB) configuration
    * **actions**: list of actions to be displayed,
    * **filter**: action filter using any expression supported by [sift](https://github.com/crcn/sift.js),
  * **catalog**: 2D map layers panel configuration
    * **filter**: layer filter using any expression supported by [sift](https://github.com/crcn/sift.js),
    * **categories**: list of categories to be displayed in 2D map layers panel,
  * **layers**: 2D map layers configuration
    * **actions**: list of actions to be displayed,
    * **filter**: action filter using any expression supported by [sift](https://github.com/crcn/sift.js),
  * **restore**: user context restoration configuration
    * **view**: set it to `true` (default) in order to restore the current extent on page refresh
    * **layers**: set it to `true` (`false` by default) in order to restore the current visible layers on page refresh
  * **engine**: 2D map view configuration
    * **viewer**: 2D map initialization [options](https://leafletjs.com/reference.html#map-option),
    * **featureStyle**: default GeoJSON [layer style](https://kalisio.github.io/kdk/api/map/map-mixins.html#map-style) for polygons/lines,
    * **pointStyle**: default GeoJSON [layer style](https://kalisio.github.io/kdk/api/map/map-mixins.html#map-style) for points,
    * **popup**: default GeoJSON [popup style](https://kalisio.github.io/kdk/api/map/map-mixins.html#map-popup),
    * **tooltip**: default GeoJSON [tooltip style](https://kalisio.github.io/kdk/api/map/map-mixins.html#map-tooltip),
    * **cluster**: default GeoJSON [clustering style](https://kalisio.github.io/kdk/api/map/map-mixins.html#map-style),
    * **fileLayers**: default file layer [options](https://kalisio.github.io/kdk/api/map/map-mixins.html#file-layer),
* **globeActivity**: 3D globe activity configuration
  * **topPane**: application bar components configuration
    * **content**: list of components to be displayed according to current mode,
    * **filter**: component filter using any expression supported by [sift](https://github.com/crcn/sift.js),
  * **leftPane**: left pane (i.e. main menu) components configuration
    * **content**: list of components to be displayed,
    * **filter**: component filter using any expression supported by [sift](https://github.com/crcn/sift.js),
  * **bottomPane**: bottom pane components configuration
    * **content**: list of components to be displayed,
    * **filter**: component filter using any expression supported by [sift](https://github.com/crcn/sift.js),
  * **rightPane**: right pane components configuration
    * **content**: list of components to be displayed,
    * **filter**: component filter using any expression supported by [sift](https://github.com/crcn/sift.js),
  * **page**: page components configuration (can be used to add your [own components](../guides/advanced-usage.md#developing-in-kano))
    * **content**: list of components to be displayed,
    * **filter**: component filter using any expression supported by [sift](https://github.com/crcn/sift.js),
  * **window**: window (i.e. widgets) configuration
    * **widgets**: list of widgets to be displayed,
    * **filter**: component filter using any expression supported by [sift](https://github.com/crcn/sift.js),
  * **fab**: floating action button (FAB) configuration
    * **actions**: list of actions to be displayed,
    * **filter**: action filter using any expression supported by [sift](https://github.com/crcn/sift.js),
  * **catalog**: 3D map layers panel configuration
    * **filter**: layer filter using any expression supported by [sift](https://github.com/crcn/sift.js),
    * **categories**: list of categories to be displayed in 3D map layers panel,
  * **layers**: 3D map layers configuration
    * **actions**: list of actions to be displayed,
    * **filter**: action filter using any expression supported by [sift](https://github.com/crcn/sift.js),
  * **catalog**: 3D globe layers panel configuration
    * **filter**: layer filter using any expression supported by [sift](https://github.com/crcn/sift.js),
    * **categories**: list of categories to be displayed in 3D globe layers panel,
  * **restore**: user context restoration configuration
    * **view**: set it to `true` (default) in order to restore the current extent on page refresh
    * **layers**: set it to `true` (`false` by default) in order to restore the current visible layers on page refresh
  * **engine**: 3D globe view configuration
  	* **viewer**: 3D globe initialization [options](https://cesiumjs.org/Cesium/Build/Documentation/Viewer.html#Viewer)
  	* **fileLayers**: default file layer [options](https://kalisio.github.io/kdk/api/map/globe-mixins.html#file-layer),
  	* **featureStyle**: default GeoJSON [layer style](https://kalisio.github.io/kdk/api/map/globe-mixins.html#globe-style) for polygons/lines/points,
  	* **entityStyle**: default [entity style](https://kalisio.github.io/kdk/api/map/globe-mixins.html#globe-style),
  	* **tooltip**: default GeoJSON [tooltip style](https://kalisio.github.io/kdk/api/map/globe-mixins.html#globe-tooltip),
  	* **popup**: default GeoJSON [popup style](https://kalisio.github.io/kdk/api/map/globe-mixins.html#globe-popup),
  	* **clusterStyle**: default GeoJSON [clustering style](https://kalisio.github.io/kdk/api/map/globe-mixins.html#globe-style),
  	* **cluster**: default GeoJSON [cluster options](https://kalisio.github.io/kdk/api/map/globe-mixins.html#globe-style)