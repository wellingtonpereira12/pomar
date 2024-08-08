const db = require('../db/queries');

exports.getAllArvores = async (req, res) => {
  try {
    const arvores = await db.getArvores();
    res.json(arvores);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.createArvore = async (req, res) => {
  try {
    const arvore = req.body;
    const newArvore = await db.addArvore(arvore);
    res.status(201).json(newArvore);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
