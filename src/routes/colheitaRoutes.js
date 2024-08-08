const express = require('express');
const router = express.Router();
const colheitaController = require('../controllers/colheitaController');

// Listar todas as colheitas
router.get('/', colheitaController.getAllColheitas);

// Adicionar uma nova colheita
router.post('/', colheitaController.createColheita);

// Atualizar uma colheita existente
router.put('/:id', colheitaController.updateColheita);

// Remover uma colheita
router.delete('/:id', colheitaController.deleteColheita);

module.exports = router;
