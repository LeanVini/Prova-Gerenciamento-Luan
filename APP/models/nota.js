const { DataTypes } = require('sequelize');
const db = require('../config/database');
const Aluno = require('./aluno');
const Professor = require('./professor');
const Materia = require('./materia');

const Nota = db.define('Nota', {
  valor: {
    type: DataTypes.DECIMAL(4, 2),
    allowNull: false
  },
  data_lancamento: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW
  }
});

// Associações
Nota.belongsTo(Aluno, { foreignKey: 'aluno_id' });
Nota.belongsTo(Professor, { foreignKey: 'professor_id' });
Nota.belongsTo(Materia, { foreignKey: 'materia_id' });

Aluno.hasMany(Nota, { foreignKey: 'aluno_id' });
Professor.hasMany(Nota, { foreignKey: 'professor_id' });
Materia.hasMany(Nota, { foreignKey: 'materia_id' });

module.exports = Nota;
