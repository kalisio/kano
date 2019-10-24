import _ from 'lodash'
import logger from 'loglevel'
import Vue from 'vue'
import i18next from 'i18next'
import VueI18next from '@panter/vue-i18next'
import postRobot from 'post-robot'
import config from 'config'
import { Store } from '@kalisio/kdk-core/client'

function loadComponent (component) {
  return () => {
    return import(`@kalisio/kdk-core/lib/client/components/${component}.vue`)
      .catch(errorCore => {
        return import(`@kalisio/kdk-map/lib/client/components/${component}.vue`)
          .catch(errorMap => {
            // Otherwise this should be app component
            return import(`@/${component}.vue`)
              .catch(errorApp => {
                console.log(errorCore, errorMap, errorApp)
              })
          })
      })
  }
}

function loadSchema (schema) {
  return import(`@kalisio/kdk-core/lib/common/schemas/${schema}.json`)
    .catch(errorCore => {
      return import(`@kalisio/kdk-map/lib/common/schemas/${schema}.json`)
        .catch(errorMap => {
          // Otherwise this should be app component
          return import(`./schemas/${schema}.json`)
            .catch(errorApp => {
              console.log(errorCore, errorMap, errorApp)
            })
        })
    })
}

function loadTranslation (module, locale) {
  let translation = module + '_' + locale + '.json'
  return import(`@kalisio/kdk-core/lib/client/i18n/${translation}`)
    .catch(errorCore => {
      return import(`@kalisio/kdk-map/lib/client/i18n/${translation}`)
        .catch(errorMap => {
          return import(`./i18n/${translation}`)
            .catch(errorApp => {
              console.log(errorCore, errorMap, errorApp)
            })
        })
    })
}

function resolveAsset (asset) {
  return require('./assets/' + asset)
}

// We need this so that we can dynamically load the components
// with a function that has previously been statically analyzed by the bundler (eg webpack)
function load (name, type = 'component') {
  switch (type) {
    case 'asset':
      return resolveAsset(name)
    case 'schema':
      return loadSchema(name)
    case 'component':
    default:
      return loadComponent(name)
  }
}

async function createComponent (component, options) {
  const ComponentClass = await loadComponent(component)()
  const Component = Vue.extend(ComponentClass.default)
  return new Component(Object.assign({ i18n: new VueI18next(i18next) }, options))
}

async function createComponentVNode (component, options) {
  const ComponentClass = await loadComponent(component)()
  const Component = Vue.extend(ComponentClass.default)
  return this.$createElement(Component, Object.assign({ i18n: new VueI18next(i18next) }, options))
}

function getEmbedComponent (route) {
  // The target component is the last one to be matched in hierarchy
  let component = _.get(route, `matched[${route.matched.length - 1}]`)
  return _.get(component, 'instances.default')
}

async function callEmbedMethod (route, data) {
  // The event payload contains the name of the method to be called as well as its arguments
  const method = (data ? data.command : undefined)
  let result
  if (method) {
    let component = getEmbedComponent(route)
    if (component && (typeof _.get(component, method) === 'function')) {
      result = (Array.isArray(data.args) ?
        await _.get(component, method)(...data.args) :
        await _.get(component, method)(data.args))
    }
  }
  return result
}

function getEmbedProperty (route, data) {
  // The event payload contains the name of the property to be retrieved
  const property = (data ? data.property : undefined)
  let result
  if (property) {
    let component = getEmbedComponent(route)
    if (component && _.has(component, property)) {
      result = _.get(component, property)
    }
  }
  return result
}

// Setup post-robot event listenr to call component methods on this route from an external domain
// If an event is received but the current route is not the same as the event name the new route is pushed first
function setupEmbedApi (routeName, component) {
  // Listen to an event named according to current route name
  postRobot.on(routeName, async (event) => {
    const router = Store.get('router')
    let route = router.currentRoute
    const data = event.data
    let result, component, interval
    // If event received but the current route does not match the new route is pushed first
    if (route.name !== routeName) {
      // Need to wait until route has really changed, component has been initialized, etc.
      await new Promise((resolve, reject) => router.push({ name: routeName, query: Object.assign({}, route.query) }, resolve))
      await new Promise((resolve, reject) => {
        interval = setInterval(() => {
          route = router.currentRoute
          component = getEmbedComponent(route)
          if (component) resolve()
        }, 100)
      })
      clearInterval(interval)
    }
    result = (data.command ? await callEmbedMethod(route, data) : getEmbedProperty(route, data))
    return result
  })
}

function sendEmbedEvent (...args) {
  // Will fail if not integrated as iframe so check
  if (window.parent !== window) {
    // If no listener post-robot raises an error
    try { postRobot.send(window.parent, ...args) }
    catch (error) { logger.debug(error.message) }
  }
}

function setGatewayUrlJwt (item, path, jwt) {
  let url = _.get(item, path)
  if (!url) return
  if (!url.startsWith(config.gateway)) return
  // FIXME: specific case of Cesium OpenStreetMap provider
  // Because Cesium generates the final url as base url + tile scheme + extension
  // updating the base url property breaks it, for now we modify the extension 
  if ((path === 'cesium.url') && _.get(item, 'cesium.type') === 'OpenStreetMap') {
    const ext = _.get(item, 'cesium.fileExtension', 'png')
    _.set(item, 'cesium.fileExtension', ext + `?${config.gatewayJwtField}=${jwt}`)
  } else {
    _.set(item, path, url + (url.includes('?') ? '&' : '?') + `${config.gatewayJwtField}=${jwt}`)
  }
}

function setGatewayJwt (layers, jwt) {
  // If we need to use API gateway forward token as query parameter
  // (Leaflet does not support anything else by default as it mainly uses raw <img> tags)
  layers.forEach(layer => {
    setGatewayUrlJwt(layer, 'iconUrl', jwt)
    setGatewayUrlJwt(layer, 'leaflet.source', jwt)
    setGatewayUrlJwt(layer, 'cesium.url', jwt)
  })
  return layers
}

// Build vue router config from our config file
function buildRoutes (config) {
  function buildRoutesRecursively (config, routes, parentRoute) {
    _.forOwn(config, (value, key) => {
      // The key is always the path for the route
      let route = {
        path: key,
        name: key,
        // "Inherit" meta data on nested routes
        meta: (parentRoute ? Object.assign({}, parentRoute.meta) : {})
      }
      // If value is a simple string this is a shortcut:
      // - name = path
      // - component = value
      // Otherwise we have an object similar to what expect vue-router,
      // we simply return the async component loading function with the given component value
      if (typeof value === 'string') {
        route.component = loadComponent(value)
      } else {
        // Take care that path can be empty so we cannot just check with a if
        if (_.has(value, 'path')) {
          route.path = value.path
        }
        // Take care that name can be empty so we cannot just check with a if
        if (_.has(value, 'name')) {
          route.name = value.name
        }
        if (_.has(value, 'component')) {
          route.component = loadComponent(value.component)
          if (_.has(value, 'embedApi')) {
            setupEmbedApi(route.name)
          }
        }
        if (_.has(value, 'props')) {
          route.props = value.props
        }
        if (_.has(value, 'meta')) {
          // Override parent meta if child meta given
          Object.assign(route.meta, value.meta)
        }
        if (_.has(value, 'redirect')) {
          _.set(route, 'redirect', value.redirect)
        }
      }

      // Check for any children to recurse
      if (value.children) {
        route.children = []
        buildRoutesRecursively(value.children, route.children, route)
      }
      routes.push(route)
    })
  }

  let routes = []
  buildRoutesRecursively(config, routes)
  return routes
}

let utils = {
  loadComponent,
  loadSchema,
  loadTranslation,
  resolveAsset,
  load,
  createComponent,
  createComponentVNode,
  sendEmbedEvent,
  setGatewayUrlJwt,
  setGatewayJwt,
  buildRoutes
}

export default utils
