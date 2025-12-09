const { Op } = require('sequelize');
const Nota = require('../models/nota');
const Frequencia = require('../models/frequencia');
const Aluno = require('../models/aluno');
const Professor = require('../models/professor');
const Materia = require('../models/materia');

// Função auxiliar para emitir eventos WebSocket
const emitWebSocketEvent = (io, event, data) => {
  if (io) {
    io.emit(event, data);
  }
};

// --- Funções para Notas ---

// Cadastrar/Atualizar Nota (Professor)
exports.cadastrarNota = async (req, res, io) => {
  try {
    const { aluno_id, professor_id, materia_id, valor } = req.body;

    if (!aluno_id || !professor_id || valor === undefined) {
      return res.status(400).json({ error: 'Aluno, professor e valor são obrigatórios.' });
    }

    const payload = { aluno_id, professor_id, valor };
    if (materia_id) {
      payload.materia_id = materia_id;
    }

    const nota = await Nota.create(payload);

    // Emitir evento WebSocket
    emitWebSocketEvent(io, 'nota_cadastrada', nota);

    return res.status(201).json(nota);
  } catch (error) {
    console.error('Erro ao cadastrar nota:', error);
    return res.status(500).json({ error: 'Erro interno do servidor.' });
  }
};

// Consultar Notas de um Aluno (Aluno)
exports.consultarNotasAluno = async (req, res) => {
  try {
    const { alunoId } = req.params;

    const notas = await Nota.findAll({
      where: { aluno_id: alunoId },
      include: [
        { model: Aluno, attributes: ['nome'] },
        { model: Professor, attributes: ['nome'] },
        { model: Materia, attributes: ['nome'] }
      ],
      order: [['data_lancamento', 'DESC']]
    });

    return res.json(notas);
  } catch (error) {
    console.error('Erro ao consultar notas do aluno:', error);
    return res.status(500).json({ error: 'Erro interno do servidor.' });
  }
};

// --- Funções para Frequência ---

// Cadastrar/Atualizar Frequência (Professor)
exports.cadastrarFrequencia = async (req, res, io) => {
  try {
    const { aluno_id, materia_id, porcentagem } = req.body;

    if (!aluno_id || porcentagem === undefined) {
      return res.status(400).json({ error: 'Aluno e porcentagem são obrigatórios.' });
    }
    
    const whereClause = materia_id ? { aluno_id, materia_id } : { aluno_id };
    const defaults = { porcentagem };
    if (materia_id) {
      defaults.materia_id = materia_id;
    }

    const [frequencia, created] = await Frequencia.findOrCreate({
      where: whereClause,
      defaults
    });

    if (!created) {
      frequencia.porcentagem = porcentagem;
      await frequencia.save();
    }

    // Emitir evento WebSocket
    emitWebSocketEvent(io, 'frequencia_atualizada', frequencia);

    return res.status(200).json(frequencia);
  } catch (error) {
    console.error('Erro ao cadastrar/atualizar frequência:', error);
    return res.status(500).json({ error: 'Erro interno do servidor.' });
  }
};

// Consultar Frequência de um Aluno (Aluno)
exports.consultarFrequenciaAluno = async (req, res) => {
  try {
    const { alunoId } = req.params;

    const frequencias = await Frequencia.findAll({
      where: { aluno_id: alunoId },
      include: [
        { model: Aluno, attributes: ['nome'] },
        { model: Materia, attributes: ['nome'] }
      ]
    });

    return res.json(frequencias);
  } catch (error) {
    console.error('Erro ao consultar frequência do aluno:', error);
    return res.status(500).json({ error: 'Erro interno do servidor.' });
  }
};
