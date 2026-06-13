import { SiteLocaleConfig, LocaleConfig } from 'vuepress'
import { ThemeLocaleData } from 'vuepress-theme-plume'

import { locales } from './i18n.ts'
import { genNavigationComponents } from './genNavigationComponents.ts'

export function genSiteLocales(): SiteLocaleConfig {
  const siteLocales: SiteLocaleConfig = {}

  for (const locale of locales) {
    // 💡 方案 B 關鍵修改點 1：
    // 如果是 zh_cn，將它的站點路由掛載到根路徑 '/'
    const localePath = locale.name === 'zh_cn' ? '/' : `/${locale.name}/`
    
    siteLocales[localePath] = {
      lang: locale.htmlLang,
      title: locale.siteTitle,
      description: locale.siteDescription,
    }
  }
  return siteLocales
}

export function genThemeLocales(): LocaleConfig<ThemeLocaleData> {
  const themeLocales: LocaleConfig<ThemeLocaleData> = {}
  
  for (const locale of locales) {
    const navigationComponents = genNavigationComponents(locale)
    const footer: Record<string, { message: string; copyright: string }> = {
      zh_cn: {
        copyright: 'MaaNTE 为开源项目，以 <a href="https://www.gnu.org/licenses/agpl-3.0.html" target="_blank">AGPL-3.0</a> 协议发布。',
        message: '本软件与《异环》开发商及发行商无关。',
      },
      zh_tw: {
        copyright: 'MaaNTE 為專案開源，以 <a href="https://www.gnu.org/licenses/agpl-3.0.html" target="_blank">AGPL-3.0</a> 協議發布。 ',
        message: '本軟體與《異環》的開發商及發行商無任何關聯。 ',
      },
      en_us: {
        copyright: 'MaaNTE is an open source project, released under the <a href="https://www.gnu.org/licenses/agpl-3.0.html" target="_blank">AGPL-3.0</a> license.',
        message: 'This software is not affiliated with the developers or publishers of Neverness to Everness.',
      },
      ja_jp: {
        copyright: 'MaaNTE は <a href="https://www.gnu.org/licenses/agpl-3.0.html" target="_blank">AGPL-3.0</a> ライセンスの下で公開されているオープンソースプロジェクトです。',
        message: '本ソフトウェアは「異環」の開発元および販売元とは一切関係ありません。',
      },
    }

    // 💡 方案 B 關鍵修改點 2：
    // 站點路由路徑：zh_cn 對應 '/'，其他對應 '/語系/'
    const localePath = locale.name === 'zh_cn' ? '/' : `/${locale.name}/`

    themeLocales[localePath] = {
      // 💡 方案 B 核心：雖然路由在根目錄 '/'，但主頁（home）與文件導航依然指向 '/zh_cn/'
      // 這樣 VuePress 就會去讀取 docs/zh_cn/README.md 作為首頁，而不需要搬移任何文件
      home: locale.name === 'zh_cn' ? '/zh_cn/' : `/${locale.name}/`,
      navbar: navigationComponents.navbar,
      collections: navigationComponents.collections,
      footer: footer[locale.name],
    }
  }

  // 💡 關鍵修改點 3：
  // 徹底刪除原本在末尾單獨定義 themeLocales['/'] 的重複賦值邏輯

  return themeLocales
}