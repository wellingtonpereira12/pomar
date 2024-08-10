const db = require('../db/queries');

// Listar todas as colheitas
exports.getAllColheitas = async (req, res) => {
  try {
    const especies = await db.getEspecies();
    let objcolheitas = [];
    for (let index1 in especies) {
      const grupo = await db.getGrupoId(especies[index1].id);
      for (let index2 in grupo) {
        const colheitas = await db.getColheitas(especies[index1].id, grupo[index2].grupo_id);
        const descricaoColheitas = await db.getDescricaoColheitas(especies[index1].id, grupo[index2].grupo_id);

        if (colheitas.length > 0) {
          objcolheitas.push({
            nome: descricaoColheitas.descricao,
            idade: descricaoColheitas.idade,
            tipo: descricaoColheitas.nome,
            colheitas
          })  
        }
      }
    }
    res.json(objcolheitas);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Adicionar uma nova colheita
exports.createColheita = async (req, res) => {
  try {
    const { informacoes, data_colheita, peso_bruto, arvore_id } = req.body;
    const ArvoreById = await db.getArvoreById(arvore_id);
    if (ArvoreById) {
       const newColheita = await db.addColheita(informacoes, data_colheita, peso_bruto, arvore_id);
       res.status(201).json(newColheita);
    } else {
      res.status(404).json('Id da Arvore não encontrado');
    }
    
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
