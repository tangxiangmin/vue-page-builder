module.exports = options => {
  return async function (ctx, next) {
    await next();

    const content = ctx.response.get('content-type')
    const isJSON = /application\/json/.test(content)
    if (isJSON) {
      let body = ctx.body;
      ctx.body = {
        code: 0,
        msg: "SUCCESS",
        data: body,
      };
    }
  }
}

