'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Users', [{
      email: 'tuansyho@egmail.com',
      firstName: 'Ho ',
      lastName: 'Tuan',
      address: 'Viet Nam ',
      gender: 1,
      roleId: 'R1',
      phonenumber: '023569874',
      positionId: 'dortor',
      createdAt: new Date(),
      updatedAt: new Date()
    }]);
  },

  down: async (queryInterface, Sequelize) => {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
  }
};
