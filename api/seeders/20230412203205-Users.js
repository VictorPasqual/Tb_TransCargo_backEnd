'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    return queryInterface.bulkInsert('Users', [
      {
        name: 'Victor',
        email: 'victor@example.com',
        cpfCnpj: '98819815060',
        password: '01234567',
        role: 'admin',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'Lucas',
        email: 'lucas@example.com',
        cpfCnpj: '98819815060',
        password: '01234567',
        role: 'motorista',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'Vinicius',
        email: 'vinicim@example.com',
        cpfCnpj: '98819815060',
        password: '01234567',
        role: 'cliente',
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ]);
  },

  async down (queryInterface, Sequelize) {
    return queryInterface.bulkDelete('Users', null, {});
  }
};
