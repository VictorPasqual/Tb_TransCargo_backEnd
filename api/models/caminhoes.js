'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Caminhoes extends Model {
   
    static associate(models) {
      Caminhoes.hasMany(models.Cargas, { foreignKey: 'caminhaoId' });
      
    }
  }
  Caminhoes.init({
    placa: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    marca: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    modelo: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    owner: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  }, {
    sequelize,
    modelName: 'Caminhoes',
  });
  return Caminhoes;
};