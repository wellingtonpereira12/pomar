const express = require('express');
const router = express.Router();
const colheitaController = require('../controllers/colheitaController');

router.get('/', colheitaController.getAllColheitas);
router.post('/', colheitaController.createColheita);
router.put('/:id', colheitaController.updateColheita);
router.delete('/:id', colheitaController.deleteColheita);

module.exports = router;
