const express = require('express');
const router = express.Router();
const arvoreController = require('../controllers/arvoreController');

router.get('/', arvoreController.getAllArvores);
router.post('/', arvoreController.createArvore);
router.get('/:id', arvoreController.getArvoreById);
router.put('/:id', arvoreController.updateArvore);
router.delete('/:id', arvoreController.deleteArvore);

module.exports = router;
