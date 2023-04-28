'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Cargas extends Model {

    static associate(models) {
      Cargas.belongsTo(models.Caminhoes, { foreignKey: 'caminhaoId' });
    }
  }
  Cargas.init({
    notaFiscal: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        is: /^[0-9]{6,8}$/i,
      }
    },
    cpf_cnpj: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        is: /^[0-9]{11}$|^[0-9]{14}$/i,
      }
    },
    descricao: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    peso: {
      type: DataTypes.FLOAT,
      allowNull: false,
    },
    origemLat: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    origemLng: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    destinoLat: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    destinoLng: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    caminhaoId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    }
  }, {
    sequelize,
    modelName: 'Cargas',
  });
  return Cargas;
};