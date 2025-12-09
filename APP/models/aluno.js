const { DataTypes } = require('sequelize');
const db = require('../config/database'); // Aqui é onde a instância do sequelize está configurada

const Aluno = db.define('Aluno', {
  nome: {
    type: DataTypes.STRING,
    allowNull: false
  },
  idade: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
});

module.exports = Aluno;
