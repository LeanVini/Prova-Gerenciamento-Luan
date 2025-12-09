const { DataTypes } = require('sequelize');
const db = require('../config/database'); // Ajuste conforme sua configuração de banco

const Professor = db.define('Professor', {
  nome: {
    type: DataTypes.STRING,
    allowNull: false
  },
  disciplina: {
    type: DataTypes.STRING,
    allowNull: false
  },

  }, {
  tableName: 'Professores',   // opcional: se quiser nome de tabela diferente
  timestamps: false   
  
});

module.exports = Professor;
