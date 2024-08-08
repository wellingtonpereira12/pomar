const { DataTypes } = require('sequelize');
const sequelize = require('../config/database'); // Configuração do Sequelize

const Colheita = sequelize.define('Colheita', {
  informacoes: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  data_colheita: {
    type: DataTypes.DATE,
    allowNull: false,
  },
  peso_bruto: {
    type: DataTypes.FLOAT,
    allowNull: false,
  },
  arvore_id: {
    type: DataTypes.INTEGER,
    references: {
      model: 'Arvores',
      key: 'id',
    },
    allowNull: false,
  },
});

module.exports = Colheita;
