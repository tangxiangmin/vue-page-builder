'use strict';

const CURDController = require('./curd');

class WidgetController extends CURDController {
  constructor(props) {
    super(props);

    const { ctx } = this;
    this.model = ctx.model.Widget;
  }

  async findWidgetByFileId() {
    const { ctx } = this;
    ctx.response.set('content-type', 'application/text; charset=utf-8');

    const { id } = ctx.params;
    const realId = id.split('.')[0];
    const result = await this.model.findOne({ where: { id: realId } });
    if (result) {
      ctx.body = result.content;
    }

  }
  async findWidgetConfigByFileId() {
    const { ctx } = this;
    ctx.response.set('content-type', 'application/text; charset=utf-8');

    const { id } = ctx.params;
    const realId = id.split('.')[0];
    const result = await this.model.findOne({ where: { id: realId } });
    if (result) {
      ctx.body = result.configContent;
    }
  }

}

module.exports = WidgetController;
