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
        origem: '-20.493560, -47.416729',
        destino: '-20.569439, -47.382785',
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
