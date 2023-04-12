'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Rotas extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Rotas.init({
    origem: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    destino: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    distancia: {
      type: DataTypes.FLOAT,
      allowNull: false,
    },
    caminhao: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'Caminhao',
      }
    }
  }, {
    sequelize,
    modelName: 'Rotas',
  });
  return Rotas;
};