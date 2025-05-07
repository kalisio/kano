---
sidebarDepth: 3
---

# Advanced usage

## Integrating Kano

To avoid the burden of developing a completely new application for every mapping needs you might have, **Kano** provides you with the capabilities to be integrated in your web application as an [`<iframe/>`](https://en.wikipedia.org/wiki/HTML_element#Frames) like this:

<kalisio-maps />

This **iframe** offers an API so that you can dynamically control the behaviour and the content of Kano, as well as how the embedding application reacts in real-time to changes in Kano, a.k.a [micro frontend](https://medium.com/@tomsoderlund/micro-frontends-a-microservice-approach-to-front-end-web-development-f325ebdadc16). You can read more about the underlying concepts in this [article](https://blog.feathersjs.com/a-use-case-of-microservices-with-feathersjs-building-a-geospatial-platform-56373604db71). 

The [API](../reference/api.md) is a subset of the internal Kano components and uses [post-robot](https://github.com/krakenjs/post-robot) to
1. select which is the target component
    * event name = `map` for 2D map and `globe` for 3D globe 
2. transform external method calls to internal calls using the following event payload
    * the `command` property is the mixin method name (e.g. `isLayerVisible`)
    * the `args` property is the expected method arguments (e.g. a string, an object or an array when multiple arguments are required)
3. retrieve internal method call result externally
    * event response `data` is the method result object
4. retrieve internal property externally
    * the `property` property is the internal property name (e.g. `layers`)
    * event response `data` is the returned property value

::: tip
Event messaging using **post-robot** is always async because it relies on the [postMessage API](https://developer.mozilla.org/en-US/docs/Web/API/Window/postMessage) under-the-hood.
:::

::: warning
In-memory data exchange is Json and more specifically GeoJson for map features. Do not try to inject functions or "complex" objects (e.g. class instances) in event payloads.
:::

::: warning
You must use the same version of the **post-robot** library as the one used by **Kano**. For now, **Kano** relies on the `10.0.42` version of **post-robot**.
:::

In addition to the commands used to access mixin methods there are a couple of dedicated commands listened by Kano to:
* `setLocalStorage` set key/value pairs (provided as event data payload) in its local storage, typically useful to inject access tokens
* `setConfiguration` set key/value pairs to override its [default configuration](../reference/configuration.md), typically useful to configure application name, available components or actions

The following keys can be set in local storage to alter the application behaviour:
* `appName-jwt` to skip the login screen by injecting an authentication token
* `appName-welcome` as `false` to avoid displaying the welcome screen on first login
* `appName-install` as `false` to avoid displaying the PWA installation screen
* `appName-disconnect-dialog` as `false` to avoid displaying the disconnection screen when server connection is lost
* `appName-reconnect-dialog` as `false` to avoid displaying the reconnection screen when server connection is restaured

Here is a simple code sample:
```html
  <script src="https://cdn.jsdelivr.net/npm/post-robot@10.0.10/dist/post-robot.min.js"></script>
  <iframe id="kano" title="Kano" allow="geolocation *" style="width: 1024px; height: 768px;" src="kano.kalisio.com">
  <script>
    var kano = document.getElementById('kano').contentWindow
    // Wait for Kano to be initialized
    postRobot.on('kano-ready', function() {
      // Optionnaly overrides default setup of Kano
      postRobot.send(kano, 'setConfiguration', { 'appName': 'xxx' })
      .then(function() {
      // Optionnaly set a valid token to avoid authentication
      return postRobot.send(kano, 'setLocalStorage', { 'xxx-jwt': 'yyy' })
    })
      .then(function() {
      // Show and zoom to a layer
      return postRobot.send(kano, 'map', { command: 'showLayer', args: 'Layer name' })
    })
    .then(function() {
        return postRobot.send(kano, 'map', { command: 'zoomToLayer', args: 'Layer name' })
      })
    .then(function() {
        return postRobot.send(kano, 'map', { property: 'layers' })
      })
    .then(function(result) {
        console.log('Layer list', result.data)
      })
    })
  </script>
```

A full sample exploring the different ways to interact with the API is provided [here](https://github.com/kalisio/kano/blob/master/src/statics/iframe.html). When running the demo you can dynamically call API methods when toggling the different buttons on the left.

::: warning
Depending on the configuration of your Kano instance some features might not work as expected in the sample as it relies on some specific layers to exist.
:::

### Listening to events

There are a lot of events to be listened by integrating application to be aware of Kano internal states or user behaviour.

::: warning
You should add a listener for each event in your application, even if you don't need to do any processing, otherwise the **post-robot** library will raise a warning.
:::

### Frontend events

The following ones are related to Kano states:
* `kano-ready` when the Kano application has been initialized in the iframe so that you can safely use the iframe API
* `api-ready` when the Kano backend connection has been initialized in the iframe so that you can safely call the backend API
* `kano-login` when the user has been authenticated in the Kano application
* `kano-logout` when the user has been unauthenticated in the Kano application
* `kano-disconnected` when the Kano application has been disconnected from the websocket
* `kano-reconnected` when the Kano application has been reconnected to the websocket
* `map-ready` when the 2D map component has been initialized in the Kano application so that you can safely use the underlying API
* `map-destroyed` when the 2D map component has been destroyed in the Kano application before switching to another route
* `globe-ready` when the 3D globe component has been initialized in the Kano application so that you can safely use the underlying API
* `globe-destroyed` when the 3D globe component has been destroyed in the Kano application before switching to another route

The following ones are related to layers management with the layer definition as `layer` payload property:
* `layer-add` whenever a new layer will be added to the 2D/3D map
* `layer-added` whenever a new layer has been added to the 2D/3D map (from the internal catalog or externally)
* `layer-removed` whenever a layer has been removed from the 2D/3D map
* `layer-shown` whenever a layer has been shown in the 2D/3D map
* `layer-hidden` whenever a new layer has been hidden in the 2D/3D map
* `layer-update` whenever a real-time GeoJson layer will be updated in the 2D/3D map
* `layer-updated` whenever a real-time GeoJson layer has been updated in the 2D/3D map

The following ones are related to 2D panes management with the pane name as `pane` payload property:
* `pane-added` whenever a new pane has been added to the 2D map (from the internal catalog or externally)
* `pane-removed` whenever a pane has been removed from the 2D map
* `pane-shown` whenever a pane has been shown in the 2D map
* `pane-hidden` whenever a new pane has been hidden in the 2D map

The `layer-add` and `layer-update` events are particular as it might expect a response, in this case the altered data will be taken into account instead of the original data when updating the layer:
```js
postRobot.on('layer-add', (event) => {
    const layer = event.data
    if (layer.name === 'MyLayer') {
      // Update the layer, eg change the data filter
      Object.assign(layer.baseQuery, { 'properties.user': 'MyUser' })
      return layer
    }
  })
postRobot.on('layer-update', (event) => {
    const { name, geoJson } = event.data
    if (name === 'MyLayer') {
      const features = geoJson.features || [geoJson]
      return {
        type: 'FeatureCollection',
        features: features.map(feature => {
          // Update the features
          ...
        })
      }
    }
  })
```

The following ones are related to [user interaction](https://leafletjs.com/reference.html#map-event) (mouse or gesture):
* `click` whenever map or a feature from a layer has been clicked (left button or tapped) in the 2D/3D map, 
* `dbclick` whenever map or a feature from a layer has been double-clicked (left button or tapped) in the 2D/3D map,
* `contextmenu` whenever map or a feature from a layer has been right-clicked (or long tapped) in the 2D map,
* `mousedown` whenever the user pushes the mouse button on the 2D map,
* `mouseup` whenever the user releases the mouse button on the 2D map,
* `mouseover` whenever the mouse enters the map or a feature from a layer in the 2D map,
* `mouseout` whenever the mouse leaves the map or a feature from a layer in the 2D map,
* `mousemove` whenever the mouse moves on the 2D map,
* `touchstart` whenever a touch point is placed on the map or a feature from a layer in the 2D map,
* `touchend` whenever a touch point is removed from the map or a feature from a layer in the 2D map,
* `touchcancel` whenever a touch point has been disrupted in the 2D map,
* `touchmove` whenever a touch point is moved in the 2D map.

Most user interaction events will provide you with the following properties as data payload:
* `longitude` and `latitude` coordinates of the interaction,
* `feature` and `layer` (descriptor) when the target element is a feature from a layer,
* `containerPoint` with `x` and `y` coordinates of the point where the interaction occurred relative to the map сontainer,
* `layerPoint` with `x` and `y` coordinates of the point where the interaction occurred relative to the map layer.

::: tip
For [touch events](https://developer.mozilla.org/en-US/docs/Web/API/Touch_events) the former properties at root level of the data payload are related to the first touch point (ie single-touch gesture).
If you'd like to get information about all touch points for multi-touch gesture you will similarly get `longitude`, `latitude`, `containerPoint` and `layerPoint` values
for all touch points in [`touches`](https://developer.mozilla.org/en-US/docs/Web/API/TouchEvent/touches), [`changedTouches`](https://developer.mozilla.org/en-US/docs/Web/API/TouchEvent/changedTouches)
and [`targetTouches`](https://developer.mozilla.org/en-US/docs/Web/API/TouchEvent/targetTouches) arrays relating to the same original touch event properties.
:::

By default only `click`, `dbclick` and `contextmenu` events are sent and you should enable more (respectively disable), using the `allowForwardEvents` (respectively `disallowForwardEvents`) configuration option:
```js
postRobot.send(kano, 'setConfiguration', {
  // Allow more events to be emitted
  'mapActivity.allowForwardEvents': ['mouseover', 'mouseout', 'mousemove', 'contextmenu']
  // Do not receive these events
  'mapActivity.disallowForwardEvents': ['mousemove']
})
// React to right-click (similar for others events like mouseover, mouseout, mousemove)
postRobot.on('contextmenu', (event) => {
  const { latitude, longitude, feature, layer, containerPoint } = event.data
  const { x, y } = containerPoint
  if (feature) {
    // The event targets a feature from a layer
  } else {
    // Otherwise the event targets the map background
  }
})
```

::: tip
A feature can be tagged to stop events propagation, either [immediate](https://developer.mozilla.org/fr/docs/Web/API/Event/stopImmediatePropagation) or [not](https://developer.mozilla.org/fr/docs/Web/API/Event/stopPropagation), by specifying it in style:
```js
{
    type: 'Feature',
    …
    style: { stopImmediatePropagation: ['mousedown', 'touchmove'] }
}
```
This can be used to e.g. prevent the map to be dragged when touching a specific fetaure. 
:::

The following events are related to geometry editing:
* `dragstart` whenever the user starts dragging a 2D marker,
* `dragend` whenever the user stops dragging a 2D marker,
* `drag` while the user drags a 2D marker,
* `edit-start` whenever the user starts using the geometry editor,
* `edit-stop` whenever the user ends using the geometry editor,
* `edit-point-moved` whenever a point is edited using the geometry editor,

::: tip
A point feature can be tagged as `draggable` by specifying it in style:
```js
{
    type: 'Feature',
    …
    style: { draggable: true }
}
```
To drag line or polygon vertices you should use the geometry editor.
:::

The following events are related to [map state changes](https://leafletjs.com/reference.html#map-event) and do not provide additional properties like interaction events:
* `movestart` whenever the view of the 2D map starts changing (e.g. user starts dragging the map),
* `moveend` whenever the center of the 2D map stops changing (e.g. user stopped dragging the map),
* `move` during any movement of the 2D map (including pan and fly animations),
* `zoomstart` whenever the 2D map zoom is about to change (e.g. before zoom animation),
* `zoomend` whenever the 2D map zoom changed (after any animations),
* `zoom` during any change in zoom level, including zoom and fly animations,
* `rotate` whenever the map bearing is changed (will provide an additional `bearing` property as data payload).

### Backend events

Backend [service events](https://feathersjs.com/api/events.html) can be listened by integrating application, in this case the `serviceEvent` property, respectively the `data` property, contains the service event name, respectively service event data, in the post-robot event payload:
* `catalog` whenever a service event is emitted on the `catalog` service
* `features` whenever a service event is emitted on the `features` service

For instance, you can listen to changes in the catalog service like this:
```js
  postRobot.on('catalog', (event) => {
    const { serviceEvent, data } = event.data
    console.log(`Received ${serviceEvent} catalog event`)
  })
```

Kano also provides you with an internal event bus service called `events` that can be used to dispatch custom events to all connected clients. This service internally has only a `create` method to send events, you can send a custom event named `item-selected` through this service like this:
```js
  // Tell others clients selection changed
  await postRobot.send(kano, 'event', {
    name: 'item-selected', data: { id: item.id }
  })
```
Others clients can listen to this custom event like this:
```js
  // Listen to selection change
  postRobot.on('item-selected', (event) => {
    const { id } = event.data
    ...
  })
```

### Accessing the underlying API

You can access the backend API using either the [Feathers client](https://docs.feathersjs.com/api/client.html) or raw HTTP REST requests. However, in order to ease integration you can also access the backend API through the iframe API. For this simply target the `api` component using [post-robot](https://github.com/krakenjs/post-robot), which transform external method calls to internal calls using the following event payload:
* the `service` property is the target service name (e.g. `catalog`)
* the `operation` property is the target service operation name (among `get`, `find`, `update`, `patch`, `remove`)
* the `args` property is the expected [service operation arguments](https://docs.feathersjs.com/api/services.html#service-methods)

Event response `data` is the method result object. In addition to the event used to access service operations the `api-ready` event is to be listened by integrating application to know when the Kano backend API has been initialized in the iframe so that you can safely use it.

Here is a simple code sample:
```html
  <script src="https://cdn.jsdelivr.net/npm/post-robot@10.0.10/dist/post-robot.min.js"></script>
  <iframe id="kano" title="Kano" allow="geolocation *" style="width: 1024px; height: 768px;" src="kano.kalisio.com">
  <script>
    var kano = document.getElementById('kano').contentWindow
    // Wait for map to be initialized
    postRobot.on('map-ready', () => {
      // Request saved user contexts and activate the first one if any
      postRobot.send(kano, 'api', { service: 'catalog', operation: 'find', args: [{ query: { type: 'Context' } }] })
      .then((result) => {
        const response = result.data
        if (response.total > 0) postRobot.send(kano, 'map', { command: 'loadContext', args: response.data[0] })
      })
    })
  </script>
```

### Client-side hooks

As you cannot directly access the underlying Feathers services from the iframe, the API allows you to setup events to be sent whenever a hook is run. Upon event reception you will get hook **items** as input, can alter it and send it back as output. This way the original hook items will be altered as usual in Kano.

```js
await postRobot.send(kano, 'hooks', {
  service: 'catalog',
  // Emitted event names can be changed, by default it will look like eg 'catalog-after-find-hook'
  hooks: { after: { find: { name: 'catalog-loaded' } } }
})
```

```js
postRobot.on('catalog-loaded', (event) => {
  const { items } = event.data
  // Update items
  items.forEach(item => {
    ...
  })
  return items
})
```

## Developing in Kano

**Kano** is powered by the [KDK](https://kalisio.github.io/kdk) and rely on its main abstractions. If you'd like to develop an application based on Kano or extend Kano we assume you are familiar with this technology. Indeed, **Kano** is based on the **KDK** and makes the best use of all the features offered by the provided [cartographic components and services](../reference/api.md).

### Add stickies

The most simple way to develop in Kano is to design and integrate your own components in the 2D or 3D activity. For this you simply have to
1. Put you single-file component(s) in the `src/components` folder (e.g. `MyComponent.vue`)
2. Update the [configuration](../reference/configuration.md) to declare your component(s) in the 2D/3D activity by adding a `local.js` in the `config` folder like this:
```js
module.exports = {
  mapActivity: { // Can also be globeActivity
    stickies: {
      content: [{
        id: 'my-component', position: 'left', offset: [18, 0], content: [{ component: 'MyComponent' }]
      }]
    }
  }
}
```

Then build/run the application as usual.

The component file should look e.g. like this:
```html
<template>
  <div>
    <q-dialog ref="myDialog">
    </q-dialog>
    <q-btn round color="primary" icon="edit_location" @click="showDialog">
    </q-btn>
  </div>
</template>

<script>
export default {
  name: 'my-component',
  inject: ['kMap'],
  data () {
    return {
      ...
  },
  methods: {
    async showDialog () {
      this.$refs.myDialog.show()
    },
    onTimeChanged () {
      ...
    }
  },
  async mounted () {
    // To be aware of time change
    this.kMap.$on('current-time-changed', this.onTimeChanged)
    ...
  },
  beforeUnmount () {
    this.kMap.$off('current-time-changed', this.onTimeChanged)
  }
}
</script>
// Required translations in JSON format
<i18n>
{ 
  "fr": {
      ...
    }
  },
  "en": {
      ...
    }
  }
}
</i18n>

```

It's also possible to create separated i18n files if you'd like, simply put your `plugin_en.json`, `plugin_fr.json`, etc. files in the `src/i18n` folder before building the app.

### Add custom code

You can update the `plugin.js` entry point in the `boot` folder in order to insert your own features (functions, mixins, etc.). If you'd like to enhance the default activities provided by kano you can register your own mixins in this file by using the **mixin store**:
```
import { MixinStore } from '../mixin-store'
import myMixin from '../my-mixin.js'

MixinStore.set('my-mixin', myMixin)
```

Then add it to the configuration of the target activity in order to make Kano apply it automatically:
```js
module.exports = {
  mapActivity: { // Can also be globeActivity
    additionalMixins: [ 'my-mixin' ],
    ...
  }
}
```
