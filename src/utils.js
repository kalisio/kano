import _ from 'lodash'
import logger from 'loglevel'
import postRobot from 'post-robot'
import { Store } from '@kalisio/kdk/core.client'
import { Router } from './router'

function getItems(hook) {
  const items = (hook.type === 'before' ? hook.data : hook.result)
  return items && (hook.method === 'find' ? items.data || items : items)
}

function replaceItems(hook, items) {
  if (hook.type === 'before') {
    hook.data = items
  } else if (hook.method === 'find' && hook.result && hook.result.data) {
    hook.result.data = Array.isArray(items) ? items : [items]
  } else {
    hook.result = items
  }
}

function getEmbedComponent (route) {
  return _.get(route, 'instances.default')
}

function getEmbedRoute (route) {
  // The route component information is only available in the matched ones,
  // and is the last one to be matched in hierarchy
  const matched = _.get(route, 'matched', [])
  return (matched.length ? matched[matched.length - 1] : null)
}

async function callEmbedMethod (route, data) {
  // The event payload contains the name of the method to be called as well as its arguments
  const method = (data ? data.command : undefined)
  let result
  if (method) {
    const component = getEmbedComponent(route)
    if (component && (typeof _.get(component, method) === 'function')) {
      result = (Array.isArray(data.args)
        ? await _.get(component, method)(...data.args)
        : await _.get(component, method)(data.args))
    }
  }
  return result
}

function getEmbedProperty (route, data) {
  // The event payload contains the name of the property to be retrieved
  const property = (data ? data.property : undefined)
  let result
  if (property) {
    const component = getEmbedComponent(route)
    if (component && _.has(component, property)) {
      result = _.get(component, property)
    }
  }
  return result
}

// Setup post-robot event listenr to call component methods on this route from an external domain
// If an event is received but the current route is not the same as the event name the new route is pushed first
function setupEmbedApi (routeName, component) {
  const listener = async (event) => {
    const router = Router.get()
    let route = getEmbedRoute(router.currentRoute.value)
    const data = event.data
    let result, component, interval
    // If event received but the current route does not match the new route is pushed first
    if (route.name !== routeName) {
      // Take care that we might be on a sub-route so that a reset to the parent route is not relevent
      // eg feature edition on the map (see https://github.com/kalisio/kano/issues/339)
      const childRoute = _.find(_.get(router.currentRoute.value, 'matched', []), { name: routeName })
      if (!childRoute) {
        await new Promise((resolve, reject) => router.push({ name: routeName, query: Object.assign({}, route.query) }, resolve))
        // Need to wait until route has really changed, component has been initialized, etc.
        // FIXME: make this more reliable than relying on a timer
        await new Promise((resolve, reject) => {
          interval = setInterval(() => {
            route = getEmbedRoute(router.currentRoute.value)
            component = getEmbedComponent(route)
            if (component) resolve()
          }, 100)
        })
        clearInterval(interval)
      } else {
        // In this case, the component we target is actually the one of the parent route, not the child one
        route = childRoute
      }
    }
    // If no payload this was just a route change
    if (data) {
      result = (data.command ? await callEmbedMethod(route, data) : getEmbedProperty(route, data))
    }
    return result
  }
  // Listen to an event named according to current route name
  postRobot.on(routeName, listener)
  // This is for backward compatibility because at some point we have changed route naming
  // in order to make activities configurable (see https://github.com/kalisio/kano/issues/154)
  // eg 'map' => 'map-activity'
  if (routeName.endsWith('-activity')) postRobot.on(routeName.replace('-activity', ''), listener)
}

async function sendEmbedEvent (...args) {
  // Will fail if not integrated as iframe so check
  if (window.parent !== window) {
    // If no listener post-robot raises an error
    try {
      const response = await postRobot.send(window.parent, ...args)
      return response
    } catch (error) {
      logger.debug(error.message)
    }
  }
}

// Build vue router config from our config file
function buildRoutes (config) {
  function buildRoutesRecursively (config, routes, parentRoute) {
    _.forOwn(config, (value, key) => {
      // The key is always the path for the route
      const route = {
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
        route.component = () => import(`@components/${value}.vue`)
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
          route.component = () => import(`@components/${value.component}.vue`)
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

  const routes = []
  buildRoutesRecursively(config, routes)
  return routes
}

function buildTours (config) {
  function buildToursRecursively (config, tours) {
    _.forOwn(config, (value, key) => {
      const name = _.get(value, 'name', _.get(value, 'path', key))
      const tour = _.get(value, 'tour')
      if (tour) {
        // If we directly have a tour as an array of steps
        if (Array.isArray(tour)) tours[name] = tour
        // Or a set of tours as key/value object when eg the route has a parameter and each value has its own tour
        // or when the tour is split over multiple linked smaller tours because it is too much complex for a single one
        else if (typeof tour === 'object') {
          _.forOwn(tour, (paramTour, paramValue) => {
            // We identify the main route tour if the key is the same
            if (paramValue === name) tours[`${name}`] = paramTour
            else tours[`${name}/${paramValue}`] = paramTour
          })
        }
      }
      // Check for any children to recurse
      if (value.children) {
        buildToursRecursively(value.children, tours)
      }
    })
  }

  const tours = {}
  buildToursRecursively(config, tours)
  return tours
}

const utils = {
  getItems,
  replaceItems,
  sendEmbedEvent,
  buildRoutes,
  buildTours
}

export default utils
