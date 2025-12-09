const Aluno = require('../models/aluno');

exports.getAlunoById = async (req, res) => {
  try {
    const aluno = await Aluno.findByPk(req.params.id);
    if (!aluno) {
      return res.status(404).json({ error: 'Aluno não encontrado' });
    }
    res.json(aluno);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Erro ao buscar aluno' });
  }
};

// Lista todos os alunos
exports.getAllAlunos = async (req, res) => {
  try {
    const alunos = await Aluno.findAll();
    res.json(alunos);
  } catch (error) {
    console.error(error);
res.status(500).json({ error: 'Erro ao buscar alunos', detalhes: error.message });
  }
};

// Busca um aluno pelo ID
exports.getAlunoById = async (req, res) => {
  try {
    const aluno = await Aluno.findByPk(req.params.id);
    if (!aluno) return res.status(404).json({ error: 'Aluno não encontrado' });
    res.json(aluno);
  } catch (error) {
    console.error(error);
res.status(500).json({ error: 'Erro ao buscar alunos', detalhes: error.message });
  }
};

// Cria um novo aluno
exports.createAluno = async (req, res) => {
  try {
    const { nome, idade } = req.body;
    const novoAluno = await Aluno.create({ nome, idade });
    res.status(201).json(novoAluno);
  } catch (error) {
    console.error(error);
res.status(500).json({ error: 'Erro ao buscar alunos', detalhes: error.message });
  }
};

// Atualiza um aluno existente
exports.updateAluno = async (req, res) => {
  try {
    const aluno = await Aluno.findByPk(req.params.id);
    if (!aluno) return res.status(404).json({ error: 'Aluno não encontrado' });

    const { nome, idade } = req.body;
    await aluno.update({ nome, idade });
    res.json(aluno);
  } catch (error) {
    console.error(error);
res.status(500).json({ error: 'Erro ao buscar alunos', detalhes: error.message });
  }
};

// Remove um aluno
exports.deleteAluno = async (req, res) => {
  try {
    const aluno = await Aluno.findByPk(req.params.id);
    if (!aluno) return res.status(404).json({ error: 'Aluno não encontrado' });

    await aluno.destroy();
    res.json({ message: 'Aluno removido com sucesso' });
  } catch (error) {
    console.error(error);
res.status(500).json({ error: 'Erro ao buscar alunos', detalhes: error.message });
  }
};

exports.listarAlunos = async (req, res) => {
  try {
    const alunos = await Aluno.findAll();
    res.json(alunos);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Erro ao buscar alunos' });
  }
};

// Criar um novo aluno
exports.criarAluno = async (req, res) => {
  try {
    const { nome, idade } = req.body;
    const aluno = await Aluno.create({ nome, idade });
    res.status(201).json(aluno);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Erro ao criar aluno' });
  }
};