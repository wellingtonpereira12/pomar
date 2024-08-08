const { DataTypes } = require('sequelize');
const sequelize = require('../config/database'); // Configuração do Sequelize
const Arvore = require('./arvore');
const Grupo = require('./grupo');
const ArvoreGrupo = require('./arvoreGrupo');

// Associação muitos-para-muitos
Arvore.belongsToMany(Grupo, { through: ArvoreGrupo });
Grupo.belongsToMany(Arvore, { through: ArvoreGrupo });


const Arvore = sequelize.define('Arvore', {
  codigo: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  descricao: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  idade: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  especie_id: {
    type: DataTypes.INTEGER,
    references: {
      model: 'Especies',
      key: 'id',
    },
  },
});

module.exports = Arvore;
