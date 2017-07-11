function loadComponent (component) {
  return () => System.import(`src/components/${component}.vue`)
}

function loadClientComponent (component) {
  return () => System.import(`kClient/src/components/${component}.vue`)
}

let utils = {
  loadComponent,
  loadClientComponent
}

export default utils
