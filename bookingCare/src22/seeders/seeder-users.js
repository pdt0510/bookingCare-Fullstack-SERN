'use strict';
const tablesName = {
  users: 'users',
};

module.exports = {
  async up(queryInterface, Sequelize) {
    return queryInterface.bulkInsert(`${tablesName.users}`, [
      {
        email: 'admin@gmail.com',
        password: '1234567',
        firstName: 'admin',
        lastName: 'Phan',
        gender: 1,
        address: 'HCM',
        phoneNumber: '984563443',
        image: 'string img',
        roleId: 'R1',
        position: 'Pos',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
  },

  async down(queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
  },
};
