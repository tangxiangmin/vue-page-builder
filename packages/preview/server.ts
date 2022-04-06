// @ts-ignore
import Koa from 'koa'

// @ts-ignore
import  bodyparser from 'koa-bodyparser'

// @ts-ignore
import  cors from 'koa-cors'

import router from './router'

const app = new Koa();

app.use(cors())
app.use(bodyparser());

app.use(router.routes()).use(router.allowedMethods());


async function init() {
  const port = 9988;
  app.listen(port, '0.0.0.0');
  console.log(`app run at ${port}`);
}

init()
