'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Rotas extends Model {
    static associate(models) {
      // define association here
    }
  }

  Rotas.init(
    {
      origemCEP: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notNull: {
            msg: 'O campo origemCEP é obrigatório.',
          },
          notEmpty: {
            msg: 'O campo origemCEP não pode ser vazio.',
          },
        },
      },
      destinoCEP: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notNull: {
            msg: 'O campo destinoCEP é obrigatório.',
          },
          notEmpty: {
            msg: 'O campo destinoCEP não pode ser vazio.',
          },
        },
      },
      distancia: {
        type: DataTypes.FLOAT,
        allowNull: false,
        validate: {
          notNull: {
            msg: 'O campo distancia é obrigatório.',
          },
          min: {
            args: [0],
            msg: 'O campo distancia deve ser um número positivo.',
          },
        },
      },
      caminhao: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: 'Caminhao',
        },
      },
    },
    {
      sequelize,
      modelName: 'Rotas',
    }
  );

  return Rotas;
};
