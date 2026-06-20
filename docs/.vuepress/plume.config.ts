import { defineThemeConfig } from 'vuepress-theme-plume'
import { genThemeLocales } from './navigation/genLocales.ts'

export default defineThemeConfig({
  home: '/zh_cn/',
  logo: 'images/logo_32x32.png',

  appearance: true,

  social: [
    { icon: 'bilibili', link: 'https://space.bilibili.com/3546893080594665' },
    { icon: 'discord', link: 'https://discord.com/invite/e6mPMRYQpR' },
    { icon: 'github', link: 'https://github.com/1bananachicken/MaaNTE' },
  ],
  navbarSocialInclude: ['bilibili', 'discord', 'github'],

  footer: {
    message: '本软件与《异环》开发商及发行商无关。',
    copyright: 'MaaNTE 为开源项目，以 <a href="https://www.gnu.org/licenses/agpl-3.0.html" target="_blank">AGPL-3.0</a> 协议发布。',
  },

  locales: genThemeLocales(),
})
