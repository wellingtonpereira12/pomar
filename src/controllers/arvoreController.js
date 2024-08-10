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

exports.getArvoreById = async (req, res) => {
  try {
    const { id } = req.params;
    const getArvore = await db.getArvoreById(id);

    if (!getArvore) {
      return res.status(404).json({ message: 'Árvore não encontrada' });
    }

    res.status(200).json(getArvore);
  } catch (error) {
    console.error('Erro ao buscar árvore pelo ID:', error);
    res.status(500).json({ message: 'Erro no servidor' });
  }
};


exports.updateArvore = async (req, res) => {
  const { id } = req.params;
  const { idade, especie_id, grupo_id } = req.body;

  try {
    const updatedArvore = await db.updateArvore(id, { idade, especie_id, grupo_id });

    if (!updatedArvore) {
      return res.status(404).json({ message: 'Árvore não encontrada' });
    }

    res.status(200).json(updatedArvore);
  } catch (error) {
    console.error('Erro ao atualizar árvore:', error);
    res.status(500).json({ message: 'Erro no servidor' });
  }
};

exports.deleteArvore = async (req, res) => {
  const { id } = req.params;

  try {
    const deletedArvore = await db.deleteArvore(id);

    if (!deletedArvore) {
      return res.status(404).json({ message: 'Árvore não encontrada' });
    }

    res.status(200).json({ message: 'Árvore deletada com sucesso' });
  } catch (error) {
    console.error('Erro ao deletar árvore:', error);
    res.status(500).json({ message: 'Erro no servidor' });
  }
};