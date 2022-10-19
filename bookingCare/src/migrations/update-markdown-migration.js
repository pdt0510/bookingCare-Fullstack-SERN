'use strict';
const tableInfo = {
  tableName: 'markdowns',
};

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return Promise.all([
      queryInterface.changeColumn(tableInfo.tableName, 'contentHTML', {
        type: Sequelize.TEXT('long'),
        allowNull: false,
      }),
      queryInterface.changeColumn(tableInfo.tableName, 'contentMarkdown', {
        type: Sequelize.TEXT('long'),
        allowNull: false,
      }),
      queryInterface.changeColumn(tableInfo.tableName, 'description', {
        type: Sequelize.TEXT('long'),
        allowNull: true,
      }),
      queryInterface.changeColumn(tableInfo.tableName, 'doctorId', {
        type: Sequelize.INTEGER,
        allowNull: true,
      }),
      queryInterface.changeColumn(tableInfo.tableName, 'specialityId', {
        type: Sequelize.INTEGER,
        allowNull: true,
      }),
      queryInterface.changeColumn(tableInfo.tableName, 'clinicId', {
        type: Sequelize.INTEGER,
        allowNull: true,
      }),
    ]);
  },

  down: async (queryInterface, Sequelize) => {
    return Promise.all([
      queryInterface.changeColumn(tableInfo.tableName, 'doctorId', {
        type: Sequelize.INTEGER,
        allowNull: false,
      }),
      queryInterface.changeColumn(tableInfo.tableName, 'specialityId', {
        type: Sequelize.INTEGER,
        allowNull: false,
      }),
      queryInterface.changeColumn(tableInfo.tableName, 'clinicId', {
        type: Sequelize.INTEGER,
        allowNull: false,
      }),
    ]);
  },
};
