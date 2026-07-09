import { defineClientConfig } from 'vuepress/client'
import { themeData } from 'vuepress-theme-plume/client'
import Layout from './layouts/Layout.vue'
import QQGroupJoin from './components/QQGroupJoin.vue'
import Redirect from './components/Redirect.vue'
import './styles/custom.css'
import HomeIntro from './components/HomeIntro.vue'
import HHero from './components/HHero.vue'

function removeRootLocaleFromSwitcher() {
  const locales = themeData.value.locales
  if (locales?.['/'] && locales['/zh_cn/']) {
    delete locales['/']
  }
}

removeRootLocaleFromSwitcher()

export default defineClientConfig({
  layouts: {
    Layout,
  },

  enhance({ app }) {
    removeRootLocaleFromSwitcher()
    app.component('HomeIntro', HomeIntro)
    app.component('HHero', HHero)
    app.component('Redirect', Redirect)
    app.component('QQGroupJoin', QQGroupJoin)
  },
})
