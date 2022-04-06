// @ts-ignore
import Router from 'koa-router'
import {build} from './compile'
import axios from 'axios'
import json2sfc from "./json2sfc";

const router = new Router();


let cacheMap: any = {}

async function getComponentContent(id: string) {
  const {data} = await axios.get(`http://localhost:7001/api/page/${id}`)
  return json2sfc(data.data.content)
}

// todo 多个请求时排队进行
router.get("/template", async (ctx: any) => {
  const id = ctx.request.query.id
  let html = cacheMap[id]
  if (!html) {
    // 写入内容，然后返回html
    const content = await getComponentContent(id)
    html = await build(content)
    cacheMap[id] = html
  }
  ctx.type = "html";
  ctx.body = html
});

export default router
