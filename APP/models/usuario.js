const { DataTypes } = require('sequelize');
const db = require('../config/database');
const bcrypt = require('bcrypt');

const Usuario = db.define('Usuario', {
  nome_usuario: { // Novo campo para login/identificação
    type: DataTypes.STRING,
    allowNull: false,
    unique: true
  },
  senha: {
    type: DataTypes.STRING,
    allowNull: false
  },
  perfil: {
    type: DataTypes.ENUM('aluno', 'professor'),
    allowNull: false
  },
  // Opcional: Relacionar com Aluno ou Professor
  referencia_id: {
    type: DataTypes.INTEGER,
    allowNull: true
  }
}, {
  hooks: {
    beforeCreate: async (usuario) => {
      const salt = await bcrypt.genSalt(10);
      usuario.senha = await bcrypt.hash(usuario.senha, salt);
    },
    beforeUpdate: async (usuario) => {
      if (usuario.changed('senha')) {
        const salt = await bcrypt.genSalt(10);
        usuario.senha = await bcrypt.hash(usuario.senha, salt);
      }
    }
  }
});

// Método para comparar senhas
Usuario.prototype.validarSenha = function(senha) {
  return bcrypt.compare(senha, this.senha);
};

module.exports = Usuario;
