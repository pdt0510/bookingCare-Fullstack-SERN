//src18, 7ms57ss
'use strict';
const tableInfo = {
  tableName: 'users',
};

module.exports = {
  // 8ms53ss, v71xx1,
  up: async (queryInterface, Sequelize) => {
    return Promise.all([
      queryInterface.changeColumn(tableInfo.tableName, 'avatar', {
        type: Sequelize.BLOB('medium'), //55ms11ss
        // type: Sequelize.BLOB, //8ms53ss,
        allowNull: true,
      }),
    ]);
  },

  // 8ms53ss
  down: async (queryInterface, Sequelize) => {
    return Promise.all([
      queryInterface.changeColumn(tableInfo.tableName, 'avatar', {
        type: Sequelize.STRING, // 8ms53ss
        allowNull: true,
      }),
    ]);
  },
};

// module.exports = {
//    //v71xx1
//   async up(queryInterface, Sequelize) {
//     const colsTypes = handleColTypes(Sequelize);
//     await queryInterface.createTable(`${tableInfo.tableName}`, {
//       id: {
//         allowNull: false,
//         autoIncrement: true,
//         primaryKey: true,
//         type: Sequelize.INTEGER,
//       },
//       ...colsTypes,
//       createdAt: {
//         allowNull: false,
//         type: Sequelize.DATE,
//       },
//       updatedAt: {
//         allowNull: false,
//         type: Sequelize.DATE,
//       },
//     });
//   },
//   async down(queryInterface, Sequelize) {
//     await queryInterface.dropTable(`${tableInfo.tableName}`);
//   },
//   tableInfo,
//   handleColTypes,
// };
