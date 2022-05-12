import { permissions } from '@kalisio/kdk/core.common.js'

// FIXME: this file is duplicated in the api folder
// Indeed, permissions files are usually isomorphic files. However, when we tried to create a common folder
// to share it between frontend/backend but experienced problems with webpack

// Hook computing  catalog, features, etc. abilities for a given user
export function defineUserAbilities (subject, can, cannot, app) {
  if (subject && subject._id) {
    if (subject.catalog) {
      const catalog = subject.catalog
      const role = permissions.Roles[catalog.permissions]
      if (role >= permissions.Roles.manager) {
        // Can manage layers and alerts
        can(['create', 'update', 'remove'], 'catalog')
        can(['create', 'remove'], 'alerts')
        // Can manage features on user-defined layers
        can('all', 'features')
        // Can authorize users on specific layers
        can(['create', 'remove'], 'authorisations')
      }
    }
    if (subject.layers) {
      subject.layers.forEach(layer => {
        const role = permissions.Roles[layer.permissions]
        if (role >= permissions.Roles.manager) {
          can(['create', 'update', 'remove'], layer.service)
          if (layer.probeService) can(['create', 'update', 'remove'], layer.probeService)
        }
      })
    }
  }
}
