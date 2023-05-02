'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    return queryInterface.bulkInsert('Cargas', [
      {
        notaFiscal: '000000098',
        cpf_cnpj: '55342236851',
        descricao: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
        peso: 100,
        origemLat: '-20.493560',
        origemLng: '-47.416729',
        destinoLat: '-20.569439',
        destinoLng: '-47.382785',
        caminhaoId: 2,
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ]);
  },

  async down (queryInterface, Sequelize) {
    return queryInterface.bulkDelete('Cargas', null, {});
  }
};
