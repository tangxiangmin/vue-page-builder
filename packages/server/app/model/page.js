'use strict';

module.exports = app => {
  const { STRING, INTEGER, DATE, TEXT } = app.Sequelize;

  const Page = app.model.define('page', {
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

  return Page;
};
