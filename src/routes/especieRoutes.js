const express = require('express');
const router = express.Router();
const especieController = require('../controllers/especieController');

// Listar todas as espécies
router.get('/', especieController.getAllEspecies);

// Adicionar uma nova espécie
router.post('/', especieController.createEspecie);

// Atualizar uma espécie existente
router.put('/:id', especieController.updateEspecie);

// Remover uma espécie
router.delete('/:id', especieController.deleteEspecie);

module.exports = router;
