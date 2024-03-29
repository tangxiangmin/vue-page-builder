'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    const { INTEGER, DATE, STRING, TEXT } = Sequelize;
    await queryInterface.createTable('widgets', {
      id: { type: INTEGER, primaryKey: true, autoIncrement: true },
      name: STRING(30),
      content: TEXT,
      config_content: TEXT,
      postfix: STRING(10),
      created_at: DATE,
      updated_at: DATE,
    });
  },

  down: async queryInterface => {
    await queryInterface.dropTable('widgets');
  },
};
