const express = require('express');
const router = express.Router();
const materiaController = require('../controllers/materiaController');
const { authenticate, authorizeProfessor } = require('../middlewares/auth');

// Rota para listar todas as matérias
router.put('/:id', authenticate, authorizeProfessor, materiaController.updateMateria);

// Rota para criar uma nova matéria
router.post('/', authenticate, authorizeProfessor, materiaController.createMateria);

// quantas materias tenho
router.get('/contar', authenticate, materiaController.contarMaterias);

router.get('/', authenticate, materiaController.listarMaterias);

router.delete('/:id', authenticate, authorizeProfessor, materiaController.deleteMateria);


module.exports = router;