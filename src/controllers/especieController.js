const db = require('../db/queries');

exports.getAllEspecies = async (req, res) => {
  try {
    const especies = await db.getEspecies();
    res.json(especies);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.createEspecie = async (req, res) => {
  try {
    const especie = req.body;
    const newEspecie = await db.addEspecie(especie);
    res.status(201).json(newEspecie);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.updateEspecie = async (req, res) => {
  try {
    const { id } = req.params;
    const especie = req.body;
    const updatedEspecie = await db.updateEspecie(id, especie);
    if (!updatedEspecie) {
      return res.status(404).json({ message: 'Espécie não encontrada' });
    }
    res.json(updatedEspecie);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.deleteEspecie = async (req, res) => {
  try {
    const { id } = req.params;
    const deletedEspecie = await db.deleteEspecie(id);
    if (!deletedEspecie) {
      return res.status(404).json({ message: 'Espécie não encontrada' });
    }
    res.status(204).end();
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
