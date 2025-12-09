const express = require('express');
const router = express.Router();
const alunoController = require('../controllers/alunoController');
const { authenticate, authorizeProfessor } = require('../middlewares/auth');

router.get('/', authenticate, alunoController.listarAlunos);
router.get('/:id', authenticate, alunoController.getAlunoById);
router.post('/', authenticate, authorizeProfessor, alunoController.criarAluno);
router.put('/:id', authenticate, authorizeProfessor, alunoController.updateAluno);
router.delete('/:id', authenticate, authorizeProfessor, alunoController.deleteAluno);

module.exports = router;
