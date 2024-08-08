const db = require('../db/queries');

// Listar todas as colheitas
exports.getAllColheitas = async (req, res) => {
  try {
    const colheitas = await db.getColheitas();
    res.json(colheitas);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Adicionar uma nova colheita
exports.createColheita = async (req, res) => {
  try {
    const colheita = req.body;
    const newColheita = await db.addColheita(colheita);
    res.status(201).json(newColheita);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Atualizar uma colheita existente
exports.updateColheita = async (req, res) => {
  try {
    const { id } = req.params;
    const colheita = req.body;
    const updatedColheita = await db.updateColheita(id, colheita);
    if (!updatedColheita) {
      return res.status(404).json({ message: 'Colheita não encontrada' });
    }
    res.json(updatedColheita);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Remover uma colheita
exports.deleteColheita = async (req, res) => {
  try {
    const { id } = req.params;
    const deletedColheita = await db.deleteColheita(id);
    if (!deletedColheita) {
      return res.status(404).json({ message: 'Colheita não encontrada' });
    }
    res.status(204).end();
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
