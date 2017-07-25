/*
function loadComponent (component) {
  const component = require(`kComponents/src/components/${component}.vue`)
  if (component) {
    return () => System.import(`kComponents/src/components/${component}.vue`)
  } else {
    return () => System.import(`src/components/${component}.vue`)
  }
}
*/
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
