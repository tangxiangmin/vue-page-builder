'use strict';

const CURDController = require('./curd');

class PageController extends CURDController {
  constructor(props) {
    super(props);

    const { ctx } = this;
    this.model = ctx.model.Page;
  }
}

module.exports = PageController;
