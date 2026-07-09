import { SiteLocaleConfig, LocaleConfig } from 'vuepress'
import { ThemeLocaleData } from 'vuepress-theme-plume'

import { locales } from './i18n.ts'
import { genNavigationComponents } from './genNavigationComponents.ts'

export function genSiteLocales(): SiteLocaleConfig {
  const siteLocales: SiteLocaleConfig = {}

  // 根路径作为回退 locale（404、非语言页面等场景），最长前缀匹配
  // 保证 /zh_cn/xxx 优先匹配 /zh_cn/ 而非 /
  siteLocales['/'] = {
    lang: 'zh-CN',
    title: 'MaaNTE 文档站',
    description: 'MaaNTE | MAA 异环小助手 — 由 MaaFramework 强力驱动的《异环》自动化辅助工具',
  }

  for (const locale of locales) {
    siteLocales[`/${locale.name}/`] = {
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

    const localePath = `/${locale.name}/`

    themeLocales[localePath] = {
      home: `/${locale.name}/`,
      navbar: navigationComponents.navbar,
      collections: navigationComponents.collections,
      footer: footer[locale.name],
    }

    // Do not register "/" as a theme locale. Plume enumerates theme locales in
    // the language switcher, so adding "/" here duplicates the zh_cn option.
  }

  return themeLocales
}
