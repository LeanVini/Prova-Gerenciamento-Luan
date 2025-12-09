const { DataTypes } = require('sequelize');
const db = require('../config/database');
const Aluno = require('./aluno');
const Materia = require('./materia');

const Frequencia = db.define('Frequencia', {
  porcentagem: {
    type: DataTypes.DECIMAL(5, 2),
    allowNull: false
  },
  data_atualizacao: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW
  }
});

// Associações
Frequencia.belongsTo(Aluno, { foreignKey: 'aluno_id' });
Frequencia.belongsTo(Materia, { foreignKey: 'materia_id' });

Aluno.hasMany(Frequencia, { foreignKey: 'aluno_id' });
Materia.hasMany(Frequencia, { foreignKey: 'materia_id' });

module.exports = Frequencia;
