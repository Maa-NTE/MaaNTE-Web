import { writeFileSync, mkdirSync } from 'fs'
import { resolve, dirname } from 'path'
import type { App } from 'vuepress'

function makeRedirectHtml(target: string): string {
  return `<!DOCTYPE html>
<html lang="zh-CN">
<head>
  <meta charset="utf-8">
  <meta http-equiv="refresh" content="0;url=${target}">
  <script>window.location.replace('${target}')</script>
  <title>MaaNTE 文档站 — 跳转中...</title>
  <link rel="canonical" href="https://maante.org${target}">
</head>
<body>
  <p>正在跳转到 <a href="${target}">MaaNTE 文档站（简体中文）</a>…</p>
</body>
</html>`
}

/**
 * 从 app.pages 中提取需要重定向的"短路径"集合
 * /zh_cn/userdocs/ → /userdocs/
 * /zh_cn/translation.html → /translation.html
 */
function buildShortPathSet(app: App): Set<string> {
  const paths = new Set<string>()
  for (const page of app.pages) {
    if (!page.path.startsWith('/zh_cn/')) continue
    paths.add(page.path.replace(/^\/zh_cn/, ''))
  }
  // 根路径
  paths.add('/')
  paths.add('/index.html')
  return paths
}

export default () => ({
  name: 'redirect-legacy-zh-cn-paths',

  // ── 生产构建 ──────────────────────────────────────────────
  async onGenerated(app: App): Promise<void> {
    const destDir = app.dir.dest()
    const written = new Set<string>()

    // 根路径重定向
    const indexPath = resolve(destDir, 'index.html')
    writeFileSync(indexPath, makeRedirectHtml('/zh_cn/'), 'utf-8')
    written.add(indexPath)

    for (const page of app.pages) {
      if (!page.path.startsWith('/zh_cn/')) continue

      // /zh_cn/xxx/  → /xxx/index.html
      // /zh_cn/xxx.html → /xxx.html
      const shortPath = page.path.replace(/^\/zh_cn/, '')
      const filePath = resolve(destDir, `.${shortPath}`)
      const dir = shortPath.endsWith('/')
        ? resolve(destDir, `.${shortPath}`)
        : dirname(filePath)
      const fullPath = shortPath.endsWith('/')
        ? resolve(dir, 'index.html')
        : filePath

      if (written.has(fullPath)) continue
      written.add(fullPath)

      try {
        mkdirSync(dir, { recursive: true })
        writeFileSync(fullPath, makeRedirectHtml(page.path), 'utf-8')
      } catch {
        // 冲突时跳过
      }
    }
  },

  // ── 开发模式 ──────────────────────────────────────────────
  extendsBundlerOptions(bundlerOptions: any, app: App): void {
    if (!app.env.isDev) return

    // 从已解析的页面列表中构建精确重定向白名单
    const shortPaths = buildShortPathSet(app)

    bundlerOptions.viteOptions = bundlerOptions.viteOptions ?? {}
    bundlerOptions.viteOptions.plugins = bundlerOptions.viteOptions.plugins ?? []
    bundlerOptions.viteOptions.plugins.push({
      name: 'redirect-legacy-zh-cn-middleware',
      configureServer(server: any) {
        server.middlewares.use((req: any, res: any, next: any) => {
          if (!req.url) return next()

          let pathname: string
          try {
            pathname = new URL(req.url, 'http://localhost').pathname
          } catch {
            return next()
          }

          // 只在精确匹配 zh_cn 页面短路径时重定向，其他全部放行
          if (shortPaths.has(pathname)) {
            const target = pathname === '/' || pathname === '/index.html'
              ? '/zh_cn/'
              : `/zh_cn${pathname}`
            res.statusCode = 302
            res.setHeader('Location', target)
            res.end()
            return
          }

          next()
        })
      },
    })
  },
})
