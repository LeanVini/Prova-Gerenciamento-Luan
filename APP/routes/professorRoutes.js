const express = require('express');
const router = express.Router();
const professorController = require('../controllers/professorController');  // Certifique-se que o nome e o caminho do controlador estão corretos
const { authenticate, authorizeProfessor } = require('../middlewares/auth');

// Defina as rotas corretamente
router.get('/', authenticate, professorController.listarProfessores);           // Para listar todos os professores
router.get('/:id', authenticate, professorController.getProfessorById);         // Para buscar um professor pelo ID
router.post('/', authenticate, authorizeProfessor, professorController.createProfessor);             // Para criar um novo professor
router.put('/:id', authenticate, authorizeProfessor, professorController.updateProfessor);           // Para atualizar um professor
router.delete('/:id', authenticate, authorizeProfessor, professorController.deleteProfessor);       // Para deletar um professor

module.exports = router;
