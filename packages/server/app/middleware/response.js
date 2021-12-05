module.exports = options => {
    return async function (ctx, next) {
        await next();

        let body = ctx.body;
        ctx.body = {
            code: 0,
            msg: "SUCCESS",
            data: body,
        };
    }
}

