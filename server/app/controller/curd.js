'use strict';

const Controller = require('egg').Controller;

class CURDController extends Controller {
  constructor(props) {
    super(props);

    this.model = null;
  }

  // get
  async index() {
    const { ctx } = this;
    const { pageSize = 10, pageNum = 0 } = ctx.query;
    const query = {
      limit: parseInt(pageSize, 10),
      offset: parseInt(pageSize * (pageNum - 1), 10),
      order: [
        [ 'createdAt', 'DESC' ],
      ],
    };
    const { count, rows } = await this.model.findAndCountAll(query);
    ctx.body = {
      total: count,
      list: rows,
    };
  }

  // get one
  async show() {
    const { ctx } = this;
    const { id } = ctx.params;
    ctx.body = await this.model.findOne({ id });
  }

  // add one
  async create() {
    const { ctx } = this;
    const data = ctx.request.body;
    if (!data) {
      throw new Error('参数错误');
    }
    ctx.body = await this.model.create(data);
  }

  // update one
  async update() {
    const { ctx } = this;

    const { id, ...data } = ctx.request.body;

    const user = await this.model.findByPk(id);
    if (!user) {
      ctx.status = 404;
      return;
    }
    await user.update(data);
    ctx.body = user;
  }

  // remove one
  async destroy() {
    const { ctx } = this;
    const { id } = ctx.params;
    const user = await this.model.findByPk(id);
    if (!user) {
      ctx.status = 404;
      return;
    }
    await user.destroy();
    ctx.body = null;
  }


}

module.exports = CURDController;
