const express = require('express');
const router = express.Router();
const arvoreController = require('../controllers/arvoreController');

router.get('/', arvoreController.getAllArvores);
router.post('/', arvoreController.createArvore);

module.exports = router;
