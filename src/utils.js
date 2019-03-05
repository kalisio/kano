import _ from 'lodash'
import Vue from 'vue'
import postRobot from 'post-robot'
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
      // Otherwise this should be app component
      return import(`./schemas/${schema}.json`)
      .catch(errorApp => {
        console.log(errorCore, errorApp)
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

function getEmbedComponent(route) {
  // The target component is the last one to be matched in hierarchy
  let component = _.get(route, `matched[${route.matched.length - 1}]`)
  return _.get(component, 'instances.default')
}

async function callEmbedMethod(route, data) {
  // The event payload contains the name of the method to be called as well as its arguments
  const method = (data ? data.command : undefined)
  let result
  if (method) {
    let component = getEmbedComponent(route)
    if (component && (typeof component[method] === 'function')) {
      result = (Array.isArray(data.args) ? await component[method](...data.args) : await component[method](data.args))
    }
  }
  return result
}

// Setup post-robot event listenr to call component methods on this route from an external domain
// If an event is received but the current route is not the same as the event name the new route is pushed first
function setupEmbedApi(routeName, component) {
  // Listen to an event named according to current route name
  postRobot.on(routeName, async (event) => {
    const router = Store.get('router')
    let route = router.currentRoute
    const data = event.data
    let result
    // If event received but the current route does not match the new route is pushed first
    if (route.name !== routeName) {
      let component = getEmbedComponent(route)
      // Need to wait until route has really changed, component has been initialized, etc.
      router.push({ name: routeName, query: Object.assign({}, route.query) }, () => {
        //Vue.nextTick(() => callEmbedMethod(router.currentRoute, data))
      })
      if (component) {
        result = await new Promise((resolve, reject) => {
          const unwatch = component.$parent.$watch('$route', () => {
            // Unwatch immediately
            unwatch()
            resolve(callEmbedMethod(router.currentRoute, data))
          })
        })
      } else {
        throw new Error('Embedded Kano application received a command while not yet ready')
      }
    } else {
      result = await callEmbedMethod(route, data)
    }
    return result
  })
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
  buildRoutes
}

export default utils
