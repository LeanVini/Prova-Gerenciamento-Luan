const express = require('express');
const router = express.Router();
const notaFrequenciaController = require('../controllers/notaFrequenciaController');
const { authenticate, authorizeProfessor, authorizeAluno } = require('../middlewares/auth');

// Middleware para injetar o objeto io (WebSocket) nas rotas
const ioMiddleware = (req, res, next) => {
  req.io = req.app.get('io');
  next();
};

// Rotas para Professores (Cadastro/Atualização)
router.post('/notas', authenticate, authorizeProfessor, ioMiddleware, (req, res) => notaFrequenciaController.cadastrarNota(req, res, req.io));
router.post('/frequencias', authenticate, authorizeProfessor, ioMiddleware, (req, res) => notaFrequenciaController.cadastrarFrequencia(req, res, req.io));

// Rotas para Alunos (Consulta)
router.get('/alunos/:alunoId/notas', authenticate, authorizeAluno, notaFrequenciaController.consultarNotasAluno);
router.get('/alunos/:alunoId/frequencias', authenticate, authorizeAluno, notaFrequenciaController.consultarFrequenciaAluno);

module.exports = router;
