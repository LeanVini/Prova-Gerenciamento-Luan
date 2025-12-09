const Usuario = require('../models/usuario');
const jwt = require('jsonwebtoken');
const Aluno = require('../models/aluno');
const Professor = require('../models/professor');

// Chave secreta para JWT (DEVE ser uma variável de ambiente em produção)
const JWT_SECRET = 'sua_chave_secreta_muito_forte';

// Função de Cadastro
exports.register = async (req, res) => {
  try {
    const { nome_usuario, senha, perfil, nome, disciplina, idade } = req.body;

    if (!nome_usuario || !senha || !perfil || !nome) {
      return res.status(400).json({ error: 'Preencha todos os campos obrigatórios.' });
    }

    let referencia;
    let referencia_id = null;

    if (perfil === 'aluno') {
      if (!idade) {
        return res.status(400).json({ error: 'Idade é obrigatória para Aluno.' });
      }
      referencia = await Aluno.create({ nome, idade });
      referencia_id = referencia.id;
    } else if (perfil === 'professor') {
      if (!disciplina) {
        return res.status(400).json({ error: 'Disciplina é obrigatória para Professor.' });
      }
      referencia = await Professor.create({ nome, disciplina });
      referencia_id = referencia.id;
    } else {
      return res.status(400).json({ error: 'Perfil inválido.' });
    }

    const usuario = await Usuario.create({ nome_usuario, senha, perfil, referencia_id });

    // Gera o token
    const token = jwt.sign({ id: usuario.id, perfil: usuario.perfil, referencia_id: usuario.referencia_id }, JWT_SECRET, {
      expiresIn: '1d' // Expira em 1 dia
    });

    res.status(201).json({ token, perfil: usuario.perfil, referencia_id: usuario.referencia_id });

  } catch (error) {
    console.error('Erro no cadastro:', error);
    if (error.name === 'SequelizeUniqueConstraintError') {
      return res.status(400).json({ error: 'Este nome de usuário já está cadastrado.' });
    }
    res.status(500).json({ error: 'Erro interno do servidor.' });
  }
};

// Função de Login
exports.login = async (req, res) => {
  try {
    const { nome_usuario, senha } = req.body;

    const usuario = await Usuario.findOne({ where: { nome_usuario } });

    if (!usuario) {
      return res.status(401).json({ error: 'Nome de usuário ou senha inválidos.' });
    }

    const senhaValida = await usuario.validarSenha(senha);

    if (!senhaValida) {
      return res.status(401).json({ error: 'Nome de usuário ou senha inválidos.' });
    }

    // Gera o token
    const token = jwt.sign({ id: usuario.id, perfil: usuario.perfil, referencia_id: usuario.referencia_id }, JWT_SECRET, {
      expiresIn: '1d' // Expira em 1 dia
    });

    res.json({ token, perfil: usuario.perfil, referencia_id: usuario.referencia_id });

  } catch (error) {
    console.error('Erro no login:', error);
    res.status(500).json({ error: 'Erro interno do servidor.' });
  }
};
