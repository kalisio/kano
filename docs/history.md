---
sidebarDepth: 3
---

# Changelog

## v2.7.0 - Not yet released

More details on GitHub for [Kano](https://github.com/kalisio/kano/milestone/16) and [KDK](https://github.com/kalisio/kdk/milestone/16).

## v2.6.0 - March 10th, 2026

**Major enhancements:**\
👉 Enhanced zoom control,\
👉 More options now available for geodesic objects,\
👉 Ability to use distributed contextual services.

**Cartographic data enhancements:**\
👉 Move to new Téléray public API linked to [upgraded krawler job](https://github.com/kalisio/k-teleray).

**Major bug fixes:**\
✅ Possible XSS when editing objects or with error messages as query parameter,\
✅ Timezone/Location map now uses global catalog when a contextual one is available,\
✅ Layers and categories display order not correctly updated when removed,\
✅ Window pin coordinates now accounts for header or footer.

**No major breaking changes reported for customized versions or iframe integration use cases.**.

More details on GitHub for [Kano](https://github.com/kalisio/kano/milestone/15) and [KDK](https://github.com/kalisio/kdk/milestone/15).

## v2.5.0 - October 10th, 2025

**Major enhancements:**\
👉 Improved layer styling management,\
👉 Added a tag manager to classify styles,\
👉 Enhance coordinates parsing to support more formats in search tool,\
👉 Allow to manage layers and categories display order by drag'n'drop,\
👉 Ability to animate moving/rotating objects in globe from iframe API.

**Cartographic data enhancements:**\
👉 French weather stations data layer linked to [new krawler job](https://github.com/kalisio/k-meteofrance),\
👉 Move to OpenAQ v3 API linked to [upgraded krawler job](https://github.com/kalisio/k-openaq).

**Major bug fixes:**\
✅ Filtering/Sorting in style manager affects filtering/sorting in the projects/views panels,\
✅ Improved animation performances,\
✅ Bearing not correctly taken into account in template context when using touch rotate,\
✅ Generated gateway token now takes appId into account.

**Major breaking changes for customized versions or iframe integration use cases:**\
💥 some events are [not emitted anymore](https://kalisio.github.io/kano/guides/advanced-usage.html#frontend-events) by default in iframe,\
💥 some events are now emitted with a [limited frequency](https://kalisio.github.io/kano/guides/advanced-usage.html#frontend-events).

More details on GitHub for [Kano](https://github.com/kalisio/kano/milestone/14) and [KDK](https://github.com/kalisio/kdk/milestone/14).

## v2.4.0 - May 21th, 2025

**Major enhancements:**\
👉 New style manager for layer styling,\
👉 New selection manager to launch actions on selected features,\
👉 Application can now run offline with project data available in a zone,\
👉 Keycloak provider can be easily added for OAuth,\
👉 Import layer capabilities now available in globe,\
👉 Enhanced style support when importing KML or GeoJson,\
👉 Template context now available from iframe API,\
👉 Ability to animate moving/rotating objects in map from iframe API,\
👉 Ability to animate map move/rotation from iframe API,\
👉 Allow to stop map event propagation from iframe API,\
👉 More events emitted from iframe (touch events for map, move events for globe),\
👉 Realtime layers targeting any service can now be created/removed dynamically,\
👉 Automated focus on input controller when opening search tool,\
👉 Layers targetting OGC Web Services can send an additional header for authentication,\
👉 New position indicator,\
👉 Specific actions available to edit features of a layer.

**Major bug fixes:**\
✅ Map rotation using touch gesture can be costly,\
✅ Per-project permissions were not working correctly,\
✅ Globe activity cannot be initialized without a Cesium ion token.

More details on GitHub for [Kano](https://github.com/kalisio/kano/milestone/13) and [KDK](https://github.com/kalisio/kdk/milestone/13).

## v2.3.0 - December 3rd, 2024

**Major enhancements:**\
👉 Bumped NodeJS to v20,\
👉 Bumped CI to GitHub Actions,\
👉 Bumped CesiumJS to v1.117 (3D rendering engine),\
👉 Added `visibility` [style property](https://kalisio.github.io/kdk/api/map/map-mixins.html#map-style) that can be templated,\
👉 Added [leaflet-arrowheads](https://github.com/slutske22/leaflet-arrowheads) plugin to be able to create layers with related options,\
👉 Added ability to rotate the map with still some restrictions (weather, canvas and gradient path layers),\
👉 Added support for layers targetting PMTiles,\
👉 Added `highlightable` flag on layers,\
👉 iframe integration can now register client-side hooks on services,\
👉 iframe integration can now register a handler to manage real-time feature updates,\
👉 iframe integration can now track an entity in globe,\
👉 New map attribution component,\
👉 Ability to stack multiple timeseries with multi-selection,\
👉 Selecting features does not clean current probe anymore,\
👉 Now possible to avoid opening a widget on feature selection,\
👉 Now possible to configure pane z-index directly in layer definition,\
👉 Now possible to configure custom content in about box,\
👉 Imported GeoJson files can now include panes information,\
👉 (Dis)Connection popup can be deactivated by configuration,\
👉 Simplified domain management in client configuration.

**Cartographic data enhancements:**\
👉 Enhanced rendering and legend of various data layer.

**Major bug fixes:**\
✅ Right opener not accessible when opening the right pane on mobile device,\
✅ PWA installation prompt visible in Firefox even if not built as a PWA,\
✅ `layer-updated` event was missing in globe activities.

More details on GitHub for [Kano](https://github.com/kalisio/kano/milestone/12) and [KDK](https://github.com/kalisio/kdk/milestone/12).

## v2.2.0 - March 1st, 2024

**Major enhancements:**\
👉 Enhanced layer styling capabilities,\
👉 More ergonomic timeline component,\
👉 Enhanced location components,\
👉 Enhanced image capture component,\
👉 Allow to assign multiple legends to a layer,\
👉 Legend can now display information related to layer variables,\
👉 Legend can now display external OWS legends,\
👉 Emit catalog/feature service events for iframe integration,\
👉 Emit disconnect/reconnect events for iframe integration,\
👉 Allow to show/hide window controls,\
👉 Add a better map scale,\
👉 New events service that can be used to dispatch messages to all connected clients,\
👉 Added mapping projects management.

**Cartographic data enhancements:**\
👉 Enhanced rendering and legend of various data layer.

**Major bug fixes:**\
✅ Search tool does not zoom when the result is not a point feature,\
✅ Mapillary marker is not moving when navigating with the viewer,\
✅ GSMap cloud cover layer not working anymore.

**Major breaking changes for customized versions or iframe integration use cases:**\
💥 changed layer variable unit from `units` to `unit`,\
💥 local storage keys now automatically prefixed by configured application name in kebab case (e.g. `my-app-jwt` for `MyApp` name),\
💥 layout elements in client config are now prefixed by `layout` (e.g. `layout.windows` or `layout.panes`),
💥 simple style cannot be defined anymore in feature `style` property,\
💥 engine/layer style definition ([details](https://github.com/kalisio/kdk/issues/816)).

More details on GitHub for [Kano](https://github.com/kalisio/kano/milestone/11) and [KDK](https://github.com/kalisio/kdk/milestone/10).

## v2.1.0 - Septembre 25th, 2023

**Major enhancements:**\
👉 Migrated documentation to VitePress,\
👉 Progressive Web App,\
👉 Enhanced time input components,\
👉 Enhanced window behavior with size policy and responsive controls,\
👉 Real-time user data layer update for collaborative editing.

**Major bug fixes:**\
✅ Sending `updateLayer` command in iframe API closes feature edition,\
✅ Layer filters not correctly updated on tiled layers,\
✅ Favorite view items do not expand in catalog,\
✅ Bug report button not available in about dialog.

More details on GitHub for [Kano](https://github.com/kalisio/kano/milestone/10) and [KDK](https://github.com/kalisio/kdk/milestone/9).

## v2.0.0 - June 29th, 2023

**Major enhancements:**\
👉 Bumped NodeJS to v16 and Feathers to v5,\
👉 Bumped Quasar to v2 and VueJS to v3,\
👉 Allow to create specific views from a layer,\
👉 Redirect to target URL once connected,\
👉 Provided a legend component.

**Cartographic data enhancements:**\
👉 RTE generation data layer linked to [new krawler job](https://github.com/kalisio/k-rte),\
👉 ICOS atmospheric data layer linked to [new krawler job](https://github.com/kalisio/k-icos).

**Major bug fixes:**\
✅ Token without user ID not valid anymore to be used by iframe.

**Major breaking changes for customized versions or iframe integration use cases:**\
💥 renamed configuration/layers/categories files to `.cjs`,\
💥 backend configuration should comply with Feathers v5, e.g. authentication,\
💥 need to prefix layout path by `layout.` in frontend configuration,\
💥 default `mode` required for each layout element with content having multiple keys,\
💥 `window.widgets` frontend configuration path changed to `windows.top.widgets`,\
💥 static files moved from `src/statics` to `public`,\
💥 internal event bus refactoring (`on/off()` replaced `$on/off()`, added `$engineEvents` for map engine events).

Check [NodeJS documentation](https://nodejs.org/api/esm.html) for problems related to ECMAScript modules.
Check [Quasar upgrade guide](https://quasar.dev/start/upgrade-guide) for problems related to Quasar v2/Vue v3.

More details on GitHub for [Kano](https://github.com/kalisio/kano/milestone/9) and [KDK](https://github.com/kalisio/kdk/milestone/8).

## v1.6.0 - August 30th, 2022

**Major enhancements:**\
👉 Catalog layout now includes favorite views,\
👉 Shapefile import is now supported,\
👉 Catalog with more default categories.

**Cartographic data enhancements:**\
👉 METAR data layer linked to [new krawler job](https://github.com/kalisio/k-awc),\
👉 [Little Alert Box](https://www.globalsmartrescue.com/little-alert-box/) data layer.

**Major bug fixes:**\
✅ Geodesic circles cut when exceeding the viewport,\
✅ Some measure layers do not work anymore in 3D mode,\
✅ Forbid the window to pop out of the screen when moving or scaling it,\
✅ Memory leak in gradient path,\
✅ Real-time layers not correctly updated when time changes,\
✅ Impossible to remove min/max zoom levels once edited in the style,\
✅ Hiding/Showing a layer does not take into account configuration changes,\
✅ Popup active by default in layer style editor,\
✅ Editing the style of a web service layer (eg WMTS) makes it disappear.

**Major breaking changes for customized versions or iframe integration use cases:**\
💥 Default catalog categories moved from frontend to backend configuration.

More details on GitHub for [Kano](https://github.com/kalisio/kano/milestone/7) and [KDK](https://github.com/kalisio/kdk/milestone/6).
