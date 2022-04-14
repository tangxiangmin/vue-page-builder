import {createServer, build as buildVite} from 'vite'

import * as  fs from 'fs-extra'
import * as path from 'path'


function getInlineConfig() {
  return {}
}

export async function startServer() {
  const server = await createServer(getInlineConfig())
  await server.listen()

  server.printUrls()
  console.log('server start success...')
}

function getEntryHTMLTemplate(entry: string) {
  return `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Title</title>
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width,initial-scale=1.0,
    minimum-scale=1.0,maximum-scale=1.0,user-scalable=no,viewport-fit=cover">
</head>
<body>
<div id="app"></div>
<script type="module">
  import {createApp} from 'vue'
  import App from '${entry}'

  createApp(App).mount('#app')
</script>
</body>
</html>
`
}

function resolve(src:string) {
  return path.resolve(__dirname, `..${src}`)
}

export async function build(id: string, content: string) {
  const folder = `/temp/${id}`

  const entry = `${folder}/index.html`
  const app = `${folder}/App.vue`

  const buildTargetFile = resolve(entry)
  process.env.BUILD_TARGET_FILE = buildTargetFile

  await fs.ensureDir(resolve(folder))

  const entryHtml = getEntryHTMLTemplate(app)

  await fs.writeFile(buildTargetFile, entryHtml)
  await fs.writeFile(resolve(app), content)

  // todo SSR编译
  await buildVite(getInlineConfig())
  // todo 把编译后的结果上传到cdn
  const html = await fs.readFile(resolve(`/dist/${entry}`))
  return html.toString()
}
