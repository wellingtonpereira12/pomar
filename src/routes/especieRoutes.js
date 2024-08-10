const express = require('express');
const router = express.Router();
const especieController = require('../controllers/especieController');

router.get('/', especieController.getAllEspecies);
router.post('/', especieController.createEspecie);
router.put('/:id', especieController.updateEspecie);
router.delete('/:id', especieController.deleteEspecie);

module.exports = router;
