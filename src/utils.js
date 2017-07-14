function loadComponent (component) {
  return () => System.import(`src/components/${component}.vue`)
}

function loadClientComponent (component) {
  return () => System.import(`kComponents/src/components/${component}.vue`)
}

function resolveAsset (asset) {
  return require('./assets/' + asset)
}

let utils = {
  loadComponent,
  loadClientComponent,
  resolveAsset
}

export default utils
