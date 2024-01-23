import DefaultTheme from 'vitepress/theme'
import { Maps, HomeFooter } from './vitepress/components'
import './style.css'

export default {
  extends: DefaultTheme,
  enhanceApp({ app }) {
    app.component('home-footer', HomeFooter)
    app.component('maps', Maps)
  }
}