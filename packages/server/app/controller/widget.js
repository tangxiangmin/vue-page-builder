'use strict';

const CURDController = require('./curd');

class WidgetController extends CURDController {
  constructor(props) {
    super(props);

    const { ctx } = this;
    this.model = ctx.model.Widget;
  }
}

module.exports = WidgetController;
