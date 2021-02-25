'use strict';

module.exports = app => {
  const { STRING, INTEGER, DATE, TEXT } = app.Sequelize;

  const Widget = app.model.define('widget', {
    id: { type: INTEGER, primaryKey: true, autoIncrement: true },
    name: STRING(30),
    content: TEXT,
    createdAt: {
      type: DATE,
      filed: 'created_at',
    },
    updatedAt: {
      type: DATE,
      filed: 'updated_at',
    },
  });

  return Widget;
};
