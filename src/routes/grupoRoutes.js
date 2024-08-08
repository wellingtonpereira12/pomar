const express = require('express');
const router = express.Router();
const grupoController = require('../controllers/grupoController');

// Listar todos os grupos
router.get('/', grupoController.getAllGrupos);

// Adicionar um novo grupo
router.post('/', grupoController.createGrupo);

// Atualizar um grupo existente
router.put('/:id', grupoController.updateGrupo);

// Remover um grupo
router.delete('/:id', grupoController.deleteGrupo);

module.exports = router;
