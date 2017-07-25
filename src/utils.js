import _ from 'lodash'

function loadComponent (component) {
  return () => {
    // try first in component library
    return System.import(`kComponents/src/components/${component}.vue`)
    .catch(_ => {
      // Otherwise this should be app component
      return System.import(`src/components/${component}.vue`)
    })
  }
}

function resolveAsset (asset) {
  return require('./assets/' + asset)
}

function buildRoutes (config) {
  function buildRoutesRecursively (config, routes) {
    _.forOwn(config, (value, key) => {
      // The key is always the path for the route
      let route = { path: key }
      // If value is a simple string this is a shortcut:
      // - name = path
      // - component = value
      // Otherwise we have an object similar to what expect vue-router,
      // we simply return the async component loading function with the given component value
      if (typeof value === 'string') {
        route.name = key
        route.component = loadComponent(value)
      }
      else {
        route.path = key || value.path
        route.name = value.name || route.path
        route.component = loadComponent(value.component)
      }
      // Check for any children to recurse
      if (value.children) {
        route.children = []
        buildRoutesRecursively(value.children, route.children)
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
  resolveAsset,
  buildRoutes
}

export default utils
