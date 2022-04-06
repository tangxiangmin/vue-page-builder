import {createServer, build as buildVite, ViteDevServer} from 'vite'

// @ts-ignore
import fs from 'fs-extra'
// @ts-ignore
import path from 'path'

function getInlineConfig() {
  return {}
}

export async function startServer() {
  const server = await createServer(getInlineConfig())
  await server.listen()

  server.printUrls()
  console.log('server start success...')
}

export async function build(content:string) {
  // 写入
  const target = path.resolve(__dirname,'./src/App.vue')
  await fs.writeFile(target, content)

  console.log(content)
  await buildVite(getInlineConfig())
  // todo 把编译后的结果上传到cdn
  const html = await fs.readFile(path.resolve(__dirname,'./dist/index.html'))
  return html.toString()
}
