const Materia = require('../models/materia');

// Função para atualizar uma matéria
exports.updateMateria = async (req, res) => {
  try {
    const materia = await Materia.findByPk(req.params.id);  // Encontre a matéria pelo ID
    if (!materia) {
      return res.status(404).json({ error: 'Matéria não encontrada' });
    }

    const { nome } = req.body;
    await materia.update({ nome });  // Atualize o nome da matéria
    res.json(materia);  // Retorne a matéria atualizada
  } catch (error) {
    res.status(500).json({ error: 'Erro ao atualizar matéria', detalhes: error.message });
  }
};

exports.createMateria = async (req, res) => {
  try {
    const { nome, carga_horaria } = req.body;  // Pegue os dados de nome e carga_horaria
    const novaMateria = await Materia.create({ nome, carga_horaria });  // Crie a nova matéria com ambos os campos
    res.status(201).json(novaMateria);  // Retorne a nova matéria criada
  } catch (error) {
    res.status(500).json({ error: 'Erro ao criar matéria', detalhes: error.message });
  }
};

exports.contarMaterias = async (req, res) => {
  try {
    const total = await Materia.count();
    res.json({ total });
  } catch (error) {
    res.status(500).json({ error: 'Erro ao contar matérias', detalhes: error.message });
  }
};

exports.listarMaterias = async (req, res) => {
  try {
    const materias = await Materia.findAll();
    res.json(materias);
  } catch (error) {
    res.status(500).json({ error: 'Erro ao listar matérias', detalhes: error.message });
  }
};

// Função para deletar uma matéria
exports.deleteMateria = async (req, res) => {
  try {
    const materia = await Materia.findByPk(req.params.id);
    
    if (!materia) {
      return res.status(404).json({ error: 'Matéria não encontrada' });
    }

    // Deleta a matéria
    await materia.destroy();
    res.json({ message: 'Matéria deletada com sucesso' });
  } catch (error) {
    res.status(500).json({ error: 'Erro ao deletar matéria', detalhes: error.message });
  }
};