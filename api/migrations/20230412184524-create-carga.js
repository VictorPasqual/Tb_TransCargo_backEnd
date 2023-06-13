'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Cargas', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      notaFiscal: {
        type: Sequelize.STRING
      },
      cpf_cnpj: {
        type: Sequelize.STRING
      },
      descricao: {
        type: Sequelize.STRING
      },
      peso: {
        type: Sequelize.FLOAT
      },
      origemLat: {
        type: Sequelize.STRING
      },
      origemLng: {
        type: Sequelize.STRING
      },
      destinoLat: {
        type: Sequelize.STRING
      },
      destinoLng: {
        type: Sequelize.STRING
      },
      caminhao: {
        type: Sequelize.INTEGER
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Cargas');
  }
};