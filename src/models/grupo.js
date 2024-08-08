const { DataTypes } = require('sequelize');
const sequelize = require('../config/database'); // Configuração do Sequelize

const Grupo = sequelize.define('Grupo', {
  codigo: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
  nome: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  descricao: {
    type: DataTypes.STRING,
    allowNull: true,
  },
});

module.exports = Grupo;
