// @ts-ignore
import Router from 'koa-router'
import {build} from './compile'
import axios from 'axios'
import json2sfc from "./json2sfc";

const router = new Router();

// 依赖的某个组件更新之后，相关的页面缓存都进行更新
let cacheMap: Record<string, { content: string, createdAt: string }> = {}

function readCache(id: string, date: string):string {
  const cache = cacheMap[id]
  if (!cache) return ''

  const {content, createdAt} = cache
  if (+new Date(createdAt) < +new Date(date)) return ''

  return content

}

function writeCache(id: string, content: string, createdAt: string) {
  cacheMap[id] = {
    content,
    createdAt
  }
}

async function getComponentContent(id: string): Promise<{ content: string, updatedAt: string }> {
  const {data: response} = await axios.get(`http://localhost:7001/api/page/${id}`)
  return response.data
}

// todo 多个请求时排队进行
router.get("/template", async (ctx: any) => {
  const id = ctx.request.query.id
  const {content, updatedAt} = await getComponentContent(id)
  let html = readCache(id, updatedAt)
  if (!html) {
    // 写入内容，然后返回html
    const sfc = json2sfc(content)
    html = await build(id, sfc)

    writeCache(id, html, new Date().toString())
  }
  ctx.type = "html";
  ctx.body = html
});

export default router
