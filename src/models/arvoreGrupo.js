const { DataTypes } = require('sequelize');
const sequelize = require('../config/database'); // Configuração do Sequelize

const ArvoreGrupo = sequelize.define('ArvoreGrupo', {
  grupo_id: {
    type: DataTypes.INTEGER,
    references: {
      model: 'Grupos',
      key: 'id',
    },
  },
  arvore_id: {
    type: DataTypes.INTEGER,
    references: {
      model: 'Arvores',
      key: 'id',
    },
  },
});

module.exports = ArvoreGrupo;
