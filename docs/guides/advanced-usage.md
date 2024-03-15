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

There are also some dedicated events to be listened by integrating application:
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
* `layer-added` whenever a new layer has been added to the 2D/3D map (from the internal catalog or externally)
* `layer-removed` whenever a layer has been removed from the 2D/3D map
* `layer-shown` whenever a layer has been shown in the 2D/3D map
* `layer-hidden` whenever a new layer has been hidden in the 2D/3D map
* `click` whenever a feature has been clicked on a layer in the 2D/3D map, will provide the `feature` and `layer` (descriptor) as data payload properties

::: warning
You should add a listener for each of the above events in your application, even if you don't need to do any processing, otherwise the **post-robot** library will raise a warning.
:::

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

### Managing events

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

## Developing in Kano

**Kano** is powered by the [KDK](https://kalisio.github.io/kdk) and rely on its main abstractions. If you'd like to develop an application based on Kano or extend Kano we assume you are familiar with this technology. Indeed, **Kano** is based on the **KDK** and makes the best use of all the features offered by the provided [cartographic components and services](../reference/api.md).

### Add components

The most simple way to develop in Kano is to design and integrate your own components in the 2D or 3D activity. For this you simply have to
1. Put you single-file component(s) in the `src/components` folder (e.g. `MyComponent.vue`)
2. Update the [configuration](../reference/configuration.md) to declare your component(s) in the 2D/3D activity by adding a `local.js` in the `config` folder like this:
```js
module.exports = {
  mapActivity: { // Can also be globeActivity
    page: {
      content: [{
        id: 'my-component',
        component: 'layout/KPageSticky', position: 'left', offset: [18, 0], content: [{ component: 'MyComponent' }]
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
