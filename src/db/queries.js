const pool = require('../config/dbConfig');

// Funções relacionadas a colheitas
async function getColheitas() {
  try {
    const result = await pool.query('SELECT * FROM colheitas');
    return result.rows;
  } catch (err) {
    console.error('Erro ao consultar colheitas:', err);
    throw err;
  }
}

async function getColheitaById(id) {
  try {
    const result = await pool.query('SELECT * FROM colheitas WHERE id = $1', [id]);
    return result.rows[0];
  } catch (err) {
    console.error('Erro ao consultar colheita por ID:', err);
    throw err;
  }
}

async function addColheita(colheita) {
  const { informacoes, data_colheita, peso_bruto, arvore_id } = colheita;
  try {
    const result = await pool.query(
      'INSERT INTO colheitas (informacoes, data_colheita, peso_bruto, arvore_id) VALUES ($1, $2, $3, $4) RETURNING *',
      [informacoes, data_colheita, peso_bruto, arvore_id]
    );
    return result.rows[0];
  } catch (err) {
    console.error('Erro ao adicionar colheita:', err);
    throw err;
  }
}

async function updateColheita(id, colheita) {
  const { informacoes, data_colheita, peso_bruto, arvore_id } = colheita;
  try {
    const result = await pool.query(
      'UPDATE colheitas SET informacoes = $1, data_colheita = $2, peso_bruto = $3, arvore_id = $4 WHERE id = $5 RETURNING *',
      [informacoes, data_colheita, peso_bruto, arvore_id, id]
    );
    return result.rows[0];
  } catch (err) {
    console.error('Erro ao atualizar colheita:', err);
    throw err;
  }
}

async function deleteColheita(id) {
  try {
    const result = await pool.query('DELETE FROM colheitas WHERE id = $1 RETURNING *', [id]);
    return result.rows[0];
  } catch (err) {
    console.error('Erro ao deletar colheita:', err);
    throw err;
  }
}

// Funções relacionadas a espécies
async function getEspecies() {
  try {
    const result = await pool.query('SELECT * FROM especies');
    return result.rows;
  } catch (err) {
    console.error('Erro ao consultar espécies:', err);
    throw err;
  }
}

async function getEspecieById(id) {
  try {
    const result = await pool.query('SELECT * FROM especies WHERE id = $1', [id]);
    return result.rows[0];
  } catch (err) {
    console.error('Erro ao consultar espécie por ID:', err);
    throw err;
  }
}

async function addEspecie(especie) {
  const { descricao } = especie;
  try {
    const result = await pool.query(
      'INSERT INTO especies (descricao) VALUES ($1) RETURNING *',
      [descricao]
    );
    return result.rows[0];
  } catch (err) {
    console.error('Erro ao adicionar espécie:', err);
    throw err;
  }
}

async function updateEspecie(id, especie) {
  const { descricao } = especie;
  try {
    const result = await pool.query(
      'UPDATE especies SET descricao = $1 WHERE id = $2 RETURNING *',
      [descricao, id]
    );
    return result.rows[0];
  } catch (err) {
    console.error('Erro ao atualizar espécie:', err);
    throw err;
  }
}

async function deleteEspecie(id) {
  try {
    const result = await pool.query('DELETE FROM especies WHERE id = $1 RETURNING *', [id]);
    return result.rows[0];
  } catch (err) {
    console.error('Erro ao deletar espécie:', err);
    throw err;
  }
}
// Funções relacionadas a grupos
async function getGrupos() {
  try {
    const result = await pool.query('SELECT * FROM grupos');
    return result.rows;
  } catch (err) {
    console.error('Erro ao consultar grupos:', err);
    throw err;
  }
}

async function getGrupoById(id) {
  try {
    const result = await pool.query('SELECT * FROM grupos WHERE id = $1', [id]);
    return result.rows[0];
  } catch (err) {
    console.error('Erro ao consultar grupo por ID:', err);
    throw err;
  }
}

async function addGrupo(grupo) {
  const { nome, descricao } = grupo;
  try {
    const result = await pool.query(
      'INSERT INTO grupos (nome, descricao) VALUES ($1, $2) RETURNING *',
      [nome, descricao]
    );
    return result.rows[0];
  } catch (err) {
    console.error('Erro ao adicionar grupo:', err);
    throw err;
  }
}

async function updateGrupo(id, grupo) {
  const { nome, descricao } = grupo;
  try {
    const result = await pool.query(
      'UPDATE grupos SET nome = $1, descricao = $2 WHERE id = $3 RETURNING *',
      [nome, descricao, id]
    );
    return result.rows[0];
  } catch (err) {
    console.error('Erro ao atualizar grupo:', err);
    throw err;
  }
}

async function deleteGrupo(id) {
  try {
    const result = await pool.query('DELETE FROM grupos WHERE id = $1 RETURNING *', [id]);
    return result.rows[0];
  } catch (err) {
    console.error('Erro ao deletar grupo:', err);
    throw err;
  }
}

// Função para testar a conexão
async function testConnection() {
  try {
    const client = await pool.connect();
    console.log('Conexão com o banco de dados estabelecida com sucesso.');
    client.release(); // Libere o cliente após usar
  } catch (err) {
    console.error('Não foi possível conectar ao banco de dados:', err);
  }
}

// Função para listar árvores
async function getArvores() {
  try {
    const result = await pool.query('SELECT * FROM arvores');
    return result.rows;
  } catch (err) {
    console.error('Erro ao consultar árvores:', err);
    throw err;
  }
}

// Função para adicionar uma árvore
async function addArvore(arvore) {
  const { descricao, idade, especie_id } = arvore;
  try {
    const result = await pool.query(
      'INSERT INTO arvores (descricao, idade, especie_id) VALUES ($1, $2, $3) RETURNING *',
      [descricao, idade, especie_id]
    );
    return result.rows[0];
  } catch (err) {
    console.error('Erro ao adicionar árvore:', err);
    throw err;
  }
}

module.exports = {
  testConnection,
  getArvores,
  addArvore,
  getColheitas,
  getColheitaById,
  addColheita,
  updateColheita,
  deleteColheita,
  getEspecies,
  getEspecieById,
  addEspecie,
  updateEspecie,
  deleteEspecie,
  getGrupos,
  getGrupoById,
  addGrupo,
  updateGrupo,
  deleteGrupo,
};
