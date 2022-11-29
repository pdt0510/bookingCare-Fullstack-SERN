'use strict';
const tableInfo = {
  tableName: 'doctor_infors',
};

//src27, v101xx1
module.exports = {
  up: async (queryInterface, Sequelize) => {
    return Promise.all([
      queryInterface.addColumn(tableInfo.tableName, 'specialityId', {
        type: Sequelize.INTEGER,
        allowNull: false,
        defaultValue: 1,
      }),
      queryInterface.addColumn(tableInfo.tableName, 'clinicId', {
        type: Sequelize.INTEGER,
        allowNull: false,
        defaultValue: 1,
      }),
    ]);
  },

  down: async (queryInterface, Sequelize) => {
    return Promise.all();
  },
};
