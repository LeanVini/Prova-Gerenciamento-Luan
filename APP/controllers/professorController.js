// professorController.js
const Professor = require('../models/professor');

// Função para listar todos os professores
exports.listarProfessores = async (req, res) => {
  try {
    const professores = await Professor.findAll();
    res.json(professores);
  } catch (error) {
    res.status(500).json({ error: 'Erro ao listar professores', detalhes: error.message });
  }
};

// Função para obter um professor por ID
exports.getProfessorById = async (req, res) => {
  try {
    const professor = await Professor.findByPk(req.params.id);
    if (!professor) {
      return res.status(404).json({ error: 'Professor não encontrado' });
    }
    res.json(professor);
  } catch (error) {
    res.status(500).json({ error: 'Erro ao buscar professor', detalhes: error.message });
  }
};

// Função para criar um novo professor
exports.createProfessor = async (req, res) => {
  try {
    const { nome, disciplina } = req.body;
    const novoProfessor = await Professor.create({ nome, disciplina });
    res.status(201).json(novoProfessor);
  } catch (error) {
    res.status(500).json({ error: 'Erro ao criar professor', detalhes: error.message });
  }
};

// Função para atualizar um professor
exports.updateProfessor = async (req, res) => {
  try {
    const professor = await Professor.findByPk(req.params.id);
    if (!professor) {
      return res.status(404).json({ error: 'Professor não encontrado' });
    }

    const { nome, disciplina } = req.body;
    await professor.update({ nome, disciplina });
    res.json(professor);
  } catch (error) {
    res.status(500).json({ error: 'Erro ao atualizar professor', detalhes: error.message });
  }
};

// Função para deletar um professor
exports.deleteProfessor = async (req, res) => {
  try {
    const professor = await Professor.findByPk(req.params.id);
    if (!professor) {
      return res.status(404).json({ error: 'Professor não encontrado' });
    }

    await professor.destroy();
    res.json({ message: 'Professor removido com sucesso' });
  } catch (error) {
    res.status(500).json({ error: 'Erro ao remover professor', detalhes: error.message });
  }
};
