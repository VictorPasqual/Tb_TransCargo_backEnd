'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Carga extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Carga.init({
    descricao: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    peso: {
      type: DataTypes.FLOAT,
      allowNull: false,
    },
    origem: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    destino: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    caminhao: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'Caminhao',
        key: 'id',
      },
    }
  }, {
    sequelize,
    modelName: 'Carga',
  });
  return Carga;
};