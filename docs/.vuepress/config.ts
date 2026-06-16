import { viteBundler } from '@vuepress/bundler-vite'
import { defineUserConfig } from 'vuepress'
import { plumeTheme } from 'vuepress-theme-plume'
import { seoPlugin } from '@vuepress/plugin-seo'
import { sitemapPlugin } from '@vuepress/plugin-sitemap'
import { genSiteLocales } from './navigation/genLocales.ts'
import breadcrumbFix from './plugins/breadcrumb-fix.ts'

const upstreamDocsBranch = process.env.MAANTE_UPSTREAM_DOCS_BRANCH ?? 'dev'

export default defineUserConfig({
  plugins: [
    breadcrumbFix,
    seoPlugin({
      hostname: 'https://maante.org',
      canonical: 'https://maante.org',
      author: 'MaaNTE Team',
      twitterCard: 'summary_large_image',
      fallBackImage: 'https://maante.org/images/logo_256x256.png',
      restrictions: 'none',
      autoDescription: true,
      ogp: (ogp, page) => ({
        ...ogp,
        'og:type': 'website',
        'og:locale': page.lang || 'zh_CN',
        'og:site_name': 'MaaNTE',
      }),
    }),
    sitemapPlugin({
      hostname: 'https://maante.org',
      changefreq: 'weekly',
      excludeUrls: ['/404.html'],
    }),
  ],
  base: '/',
  lang: 'zh-CN',
  title: 'MaaNTE 文档站',
  description: 'MaaNTE | MAA 异环小助手 — 由 MaaFramework 强力驱动的《异环》自动化辅助工具',

  locales: genSiteLocales(),

  head: [
    // Favicon
    ['link', { rel: 'icon', type: 'image/png', href: '/images/logo_32x32.png' }],
    ['link', { rel: 'icon', type: 'image/png', sizes: '256x256', href: '/images/logo_256x256.png' }],

    // SEO Meta Tags
    ['meta', { name: 'keywords', content: 'MaaNTE,MAA,异环,Rust,自动化,游戏辅助,MaaFramework,Anamnesis,Hether,脚本,开源' }],
    ['meta', { name: 'author', content: 'MaaNTE Team' }],
    ['meta', { name: 'robots', content: 'index,follow' }],

    // Open Graph
    ['meta', { property: 'og:type', content: 'website' }],
    ['meta', { property: 'og:site_name', content: 'MaaNTE' }],
    ['meta', { property: 'og:image', content: 'https://maante.org/images/logo_256x256.png' }],
    ['meta', { property: 'og:image:alt', content: 'MaaNTE Logo' }],

    // Twitter Card
    ['meta', { name: 'twitter:card', content: 'summary_large_image' }],
    ['meta', { name: 'twitter:image', content: 'https://maante.org/images/logo_256x256.png' }],

    // Additional SEO
    ['meta', { name: 'theme-color', content: '#3eaf7c' }],
    ['meta', { name: 'apple-mobile-web-app-capable', content: 'yes' }],
    ['meta', { name: 'apple-mobile-web-app-status-bar-style', content: 'black' }],

    // AI Search Optimization
    ['meta', { name: 'article:publisher', content: 'MaaNTE Team' }],
    ['meta', { name: 'article:author', content: 'MaaNTE Team' }],
    ['meta', { property: 'article:published_time', content: '2024-01-01' }],
    ['meta', { property: 'article:modified_time', content: new Date().toISOString() }],
    ['meta', { property: 'article:section', content: 'Documentation' }],
    ['meta', { property: 'article:tag', content: 'MaaNTE,MAA,异环,自动化,游戏辅助' }],

    // Semantic Web / Schema.org for AI
    ['meta', { property: 'og:see_also', content: 'https://github.com/1bananachicken/MaaNTE' }],
    ['meta', { name: 'application-name', content: 'MaaNTE' }],
    ['meta', { name: 'mobile-web-app-capable', content: 'yes' }],

    // Citation & Reference (for AI to cite)
    ['meta', { name: 'citation_title', content: 'MaaNTE Documentation' }],
    ['meta', { name: 'citation_author', content: 'MaaNTE Team' }],
    ['meta', { name: 'citation_publication_date', content: '2024/01/01' }],
    ['meta', { name: 'citation_online_date', content: new Date().toISOString().split('T')[0] }],
    ['meta', { name: 'DC.title', content: 'MaaNTE - MAA 异环小助手' }],
    ['meta', { name: 'DC.creator', content: 'MaaNTE Team' }],
    ['meta', { name: 'DC.subject', content: '游戏自动化,异环,MaaFramework,开源工具' }],
    ['meta', { name: 'DC.description', content: 'MaaNTE | MAA 异环小助手 — 由 MaaFramework 强力驱动的《异环》自动化辅助工具' }],
    ['meta', { name: 'DC.publisher', content: 'MaaNTE Team' }],
    ['meta', { name: 'DC.type', content: 'Documentation' }],
    ['meta', { name: 'DC.format', content: 'text/html' }],
    ['meta', { name: 'DC.language', content: 'zh-CN' }],

    // Structured Data Link
    ['link', { rel: 'alternate', type: 'application/ld+json', href: '/schema.json' }],
  ],

  bundler: viteBundler(),
  shouldPrefetch: false,

  theme: plumeTheme({
    hostname: 'https://maante.org',

    docsRepo: '1bananachicken/MaaNTE',
    docsDir: '/docs',
    docsBranch: upstreamDocsBranch,

    editLink: true,

    cache: 'filesystem',

    autoFrontmatter: {
      permalink: false,
      createTime: false,
      title: false,
    },


    watermark: false,

    markdown: { 
      icon: { provider: 'iconify'},
      collapse: true, // 折叠内容块
      plot: true, // 隐秘文本
      table: { // 表格增强
        align: 'left',
        maxContent: false, // 表格宽度占据整行
        copy: false, // true | 'all' | 'html' | 'md'
      },
      bilibili: true // 哔哩哔哩视频支持
    }
  }),
})
