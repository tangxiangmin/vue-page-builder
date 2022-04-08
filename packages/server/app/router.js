'use strict';

/**
 * @param {Egg.Application} app - egg application
 */
module.exports = app => {
  const { router, controller } = app;

  router.resources('/api/page/', controller.page);
  router.resources('/api/widget/', controller.widget);
  router.get('/api/widget/file/:id', controller.widget.findWidgetByFileId);
  router.get('/api/widget/file_config/:id', controller.widget.findWidgetConfigByFileId);

};
