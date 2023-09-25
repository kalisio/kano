import DefaultTheme from 'vitepress/theme'
import Maps from './components/Maps.vue'
import HomeFooter from './components/HomeFooter.vue'
import './style.css'

export default {
  extends: DefaultTheme,
  enhanceApp({ app }) {
    app.component('home-footer', HomeFooter)
    app.component('maps', Maps)
  }
}