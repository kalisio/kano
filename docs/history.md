---
sidebarDepth: 3
---

# Changelog

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
👉 ICOS atmosphjeric data layer linked to [new krawler job](https://github.com/kalisio/k-icos).

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
