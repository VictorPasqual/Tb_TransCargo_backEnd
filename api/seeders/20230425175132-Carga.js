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
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        notaFiscal: '000001234',
        cpf_cnpj: '12345678900',
        descricao: 'Produto A',
        peso: 50,
        origemLat: '-22.123456',
        origemLng: '-47.987654',
        destinoLat: '-22.654321',
        destinoLng: '-47.321987',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        notaFiscal: '000005678',
        cpf_cnpj: '98765432100',
        descricao: 'Produto B',
        peso: 75,
        origemLat: '-23.987654',
        origemLng: '-48.123456',
        destinoLat: '-23.321987',
        destinoLng: '-48.654321',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        notaFiscal: '000009876',
        cpf_cnpj: '11122233344',
        descricao: 'Produto C',
        peso: 120,
        origemLat: '-24.654321',
        origemLng: '-49.987654',
        destinoLat: '-24.123456',
        destinoLng: '-49.321987',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        notaFiscal: '000002345',
        cpf_cnpj: '98765432101',
        descricao: 'Produto D',
        peso: 90,
        origemLat: '-25.123456',
        origemLng: '-50.987654',
        destinoLat: '-25.654321',
        destinoLng: '-50.321987',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        notaFiscal: '000003456',
        cpf_cnpj: '11122233345',
        descricao: 'Produto E',
        peso: 65,
        origemLat: '-26.987654',
        origemLng: '-51.123456',
        destinoLat: '-26.321987',
        destinoLng: '-51.654321',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        notaFiscal: '000004567',
        cpf_cnpj: '55342236852',
        descricao: 'Produto F',
        peso: 80,
        origemLat: '-27.654321',
        origemLng: '-52.987654',
        destinoLat: '-27.123456',
        destinoLng: '-52.321987',
        createdAt: new Date(),
        updatedAt: new Date()
      }
      
      
    ]);
  },

  async down (queryInterface, Sequelize) {
    return queryInterface.bulkDelete('Cargas', null, {});
  }
};
