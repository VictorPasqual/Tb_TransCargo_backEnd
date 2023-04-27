'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    return queryInterface.bulkInsert('Caminhoes', [
      {
        placa: 'BRA2E19',
        marca: 'Mercedes',
        modelo: 'ACTROS',
        owner: 1,
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ]);
  },

  async down (queryInterface, Sequelize) {
    return queryInterface.bulkDelete('Caminhoes', null, {});
  }
};
