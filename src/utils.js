import _ from 'lodash'

function loadComponent (component) {
  return () => {
    return import(`kCore/lib/client/components/${component}.vue`)
      .catch(errorCore => {
        return import(`kTeam/lib/client/components/${component}.vue`)
          .catch(errorTeam => {
            return import(`kNotify/lib/client/components/${component}.vue`)
              .catch(errorNotify => {
                return import(`kMap/lib/client/components/${component}.vue`)
                  .catch(errorMap => {
                    return import(`kEvent/lib/client/components/${component}.vue`)
                      .catch(errorEvent => {
                        // Otherwise this should be app component
                        return import(`@/${component}.vue`)
                          .catch(errorApp => {
                            console.log(errorCore, errorTeam, errorNotify, errorMap, errorEvent, errorApp)
                          })
                      })
                  })
              })
          })
      })
  }
}

function loadSchema (schema) {
  return import(`kCore/lib/common/schemas/${schema}.json`)
    .catch(errorCore => {
      return import(`kTeam/lib/common/schemas/${schema}.json`)
        .catch(errorTeam => {
          return import(`kEvent/lib/common/schemas/${schema}.json`)
            .catch(errorEvent => {
              console.log(errorCore, errorTeam, errorEvent)
            })
        })
    })
}

function loadTranslation (module, locale) {
  let translation = module + '_' + locale + '.json'
  return import(`kCore/lib/client/i18n/${translation}`)
    .catch(errorCore => {
      return import(`kTeam/lib/client/i18n/${translation}`)
        .catch(errorTeam => {
          return import(`kNotify/lib/client/i18n/${translation}`)
            .catch(errorNotify => {
              return import(`kMap/lib/client/i18n/${translation}`)
                .catch(errorMap => {
                  return import(`kEvent/lib/client/i18n/${translation}`)
                    .catch(errorEvent => {
                      return import(`./i18n/${translation}`)
                        .catch(errorApp => {
                          console.log(errorCore, errorTeam, errorNotify, errorMap, errorEvent, errorApp)
                        })
                    })
                })
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
        if (value.hasOwnProperty('path')) {
          route.path = value.path
        }
        // Take care that name can be empty so we cannot just check with a if
        if (value.hasOwnProperty('name')) {
          route.name = value.name
        }
        if (value.hasOwnProperty('component')) {
          route.component = loadComponent(value.component)
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
