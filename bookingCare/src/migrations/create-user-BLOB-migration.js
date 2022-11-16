'use strict';
const tableInfo = {
  tableName: 'users',
};

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return Promise.all([
      queryInterface.changeColumn(tableInfo.tableName, 'avatar', {
        type: Sequelize.BLOB('medium'),

        allowNull: true,
      }),
    ]);
  },

  down: async (queryInterface, Sequelize) => {
    return Promise.all([
      queryInterface.changeColumn(tableInfo.tableName, 'avatar', {
        type: Sequelize.STRING,
        allowNull: true,
      }),
    ]);
  },
};
