const { DataTypes } = require('sequelize');
const sequelize = require('../config/database'); // Ajuste conforme sua configuração de banco

const Materia = sequelize.define('Materia', {
  nome: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  carga_horaria: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
});

module.exports = Materia;