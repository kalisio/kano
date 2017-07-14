function loadComponent (component) {
  return () => System.import(`src/components/${component}.vue`)
}

function loadClientComponent (component) {
  return () => System.import(`kComponents/src/components/${component}.vue`)
}

let utils = {
  loadComponent,
  loadClientComponent
}

export default utils
