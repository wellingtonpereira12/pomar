const { DataTypes } = require('sequelize');
const sequelize = require('../config/database'); // Configuração do Sequelize

const Especie = sequelize.define('Especie', {
  codigo: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
  descricao: {
    type: DataTypes.STRING,
    allowNull: false,
  },
});

module.exports = Especie;
