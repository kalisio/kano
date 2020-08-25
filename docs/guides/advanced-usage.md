---
sidebarDepth: 3
---

# Advanced usage

## Integrating Kano

To avoid the burden of developing a completely new application for every mapping needs you might have, **Kano** provides you with the capabilities to be integrated in your web application as an [`<iframe/>`](https://en.wikipedia.org/wiki/HTML_element#Frames) like this:

<kano
  token="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJhdWQiOiJkZXYua2FsaXNpby54eXoiLCJpc3MiOiJrYWxpc2lvIiwiZXhwIjoxNTg0MDE1Mjg0fQ.paxyC2weSLACd5k5IvuKnryFemP8UCS9cKUJDoma-xs">
</kano>

The **iframe** API is a subset of the internal Kano components API exposing:
* [2D map mixins](../kmap/mixins.md#map)
* [3D globe mixins](../kmap/mixins.md#globe)

It uses [post-robot](https://github.com/krakenjs/post-robot) to
1. select which is the target component
    * event name = `map` for 2D map and `globe` for 3D globe 
2. transform external method calls to internal calls using the following event payload
    * the `command` property is the mixin method name
    * the `args` property is the expected method arguments
3. retrieve internal method call result externally
    * event response data is the method result object
4. retrieve internal property externally
    * event response data is the property value

::: tip
Event messaging using **post-robot** is always async because it relies on the [postMessage API](https://developer.mozilla.org/en-US/docs/Web/API/Window/postMessage) under-the-hood.
:::

::: warning
In-memory data exchange is Json and more specifically GeoJson for map features. Do not try to inject functions or "complex" objects (e.g. class instances) in event payloads.
:::

::: warning
You must use the same version of the **post-robot** library as the one used by **Kano**. For now, **Kano** relies on the `10.0.10` version of **post-robot**.
:::

In addition to the events used to access mixin methods there are a couple of dedicated events:
* `kano-ready`: to be listened by integrating application to know when the Kano application has been initialized in the iframe so that you can safely use the API
* `setLocalStorage`: listened by Kano to set key/value pairs (provided as event data payload) in its local storage, typically useful to inject access tokens
* `kano-login`: to be listened by integrating application to know when the user has been authenticated in the Kano application
* `kano-logout`: to be listened by integrating application to know when the user has been unauthenticated in the Kano application
* `map-ready`: to be listened by integrating application to know when the 2D map component has been initialized in the Kano application so that you can safely use the underlying API
* `map-destroyed`: to be listened by integrating application to know when the 2D map component has been destroyed in the Kano application before switching to another route
* `globe-ready`: to be listened by integrating application to know when the 3D globe component has been initialized in the Kano application so that you can safely use the underlying API
* `globe-destroyed`: to be listened by integrating application to know when the 3D globe component has been destroyed in the Kano application before switching to another route
* `layer-added`: to be listened by integrating application to know whenever a new layer has been added to the 2D/3D map (from the internal catalog or externally)
* `layer-removed`: to be listened by integrating application to know whenever a layer has been removed from the 2D/3D map
* `layer-shown`: to be listened by integrating application to know whenever a layer has been shown in the 2D/3D map
* `layer-hidden`: to be listened by integrating application to know whenever a new layer has been hidden in the 2D/3D map
* `click`: to be listened by integrating application to know whenever a feature has been clicked on a layer in the 2D/3D map, will provide the `feature` and `layer` (descriptor) as data payload properties

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
		  return postRobot.send(kano, 'setLocalStorage', { 'kano-jwt': 'xxx' })
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

## Developing in Kano

**Kano** is powered by the [KDK](https://kalisio.github.io/kdk) and rely on its main abstractions. If you'd like to develop an application based on Kano or extend Kano we assume you are familiar with this technology. Indeed, **Kano** is based on the **KDK** and makes the best use of all the features offered by the provided [cartographic components and services](../reference).

The most simple way to develop in Kano is to design and integrate your own components in the 2D or 3D activity. For this you simply have to
1. Put you single-file component(s) in the `src/components` folder (e.g. `MyComponent.vue`)
2. Update the [configuration](../reference/configuration.md) to declare your component(s) in the 2D/3D activity by adding a `local.js` in the `config` folder like this:
```js
module.exports = {
  mapActivity: { // Can also be globeActivity
    components: [{
      name: 'my-component', // Component tag
      component: 'MyComponent' // Component file name
    }]
  }
}
```

Then build/run the application as usual.
