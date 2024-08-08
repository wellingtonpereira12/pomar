const db = require('../db/queries');

// Listar todos os grupos
exports.getAllGrupos = async (req, res) => {
  try {
    const grupos = await db.getGrupos();
    res.json(grupos);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Adicionar um novo grupo
exports.createGrupo = async (req, res) => {
  try {
    const grupo = req.body;
    const newGrupo = await db.addGrupo(grupo);
    res.status(201).json(newGrupo);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Atualizar um grupo existente
exports.updateGrupo = async (req, res) => {
  try {
    const { id } = req.params;
    const grupo = req.body;
    const updatedGrupo = await db.updateGrupo(id, grupo);
    if (!updatedGrupo) {
      return res.status(404).json({ message: 'Grupo não encontrado' });
    }
    res.json(updatedGrupo);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Remover um grupo
exports.deleteGrupo = async (req, res) => {
  try {
    const { id } = req.params;
    const deletedGrupo = await db.deleteGrupo(id);
    if (!deletedGrupo) {
      return res.status(404).json({ message: 'Grupo não encontrado' });
    }
    res.status(204).end();
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
