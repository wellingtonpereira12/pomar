const pool = require('../config/dbConfig');

// Funções relacionadas a colheitas
async function getColheitas(especie_id, grupo_id) {
  try {
    const result = await pool.query(`SELECT TO_CHAR(B.DATA_COLHEITA, 'DD/MM/YYYY') AS DATA_COLHEITA, 
                                            B.PESO_BRUTO, 
                                            A.GRUPO_ID,
                                            B.INFORMACOES
                                        FROM arvores A, colheitas B, grupos C
                                        WHERE A.ESPECIE_ID = $1
                                        AND   A.GRUPO_ID = $2
                                        AND A.ID = B.ARVORE_ID 
                                        AND C.ID = A.GRUPO_ID
                                        ORDER BY B.DATA_COLHEITA`, [especie_id, grupo_id]);
    return result.rows;
  } catch (err) {
    console.error('Erro ao consultar colheitas:', err);
    throw err;
  }
}

async function getDescricaoColheitas(especie_id, grupo_id) {
  try {
    const result = await pool.query(`SELECT A.IDADE, 
                                            C.NOME, 
                                            D.DESCRICAO
                                      FROM arvores A, grupos C, especies D
                                      WHERE A.ESPECIE_ID = $1
                                        AND A.GRUPO_ID = $2
                                        AND C.ID = A.GRUPO_ID
                                        AND D.ID = A.ESPECIE_ID`, [especie_id, grupo_id]);
    return result.rows[0];
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

async function addColheita(informacoes, data_colheita, peso_bruto, arvore_id) {
  try {
    const result = await pool.query(
      `INSERT INTO colheitas (id, informacoes, data_colheita, peso_bruto, arvore_id) 
                             VALUES 
                             ((SELECT COALESCE(MAX(id), 0) + 1 FROM colheitas), $1, $2, $3, $4) RETURNING *`,
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

async function getGrupoId() {
  try {
    const result = await pool.query(`SELECT DISTINCT grupo_id 
                                       FROM arvores
                                      WHERE especie_id = 4`);
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
      'INSERT INTO especies (id, descricao) VALUES ((SELECT COALESCE(MAX(id), 0) + 1 FROM especies),$1) RETURNING *',
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
      'INSERT INTO grupos (id, nome, descricao) VALUES ((SELECT COALESCE(MAX(id), 0) + 1 FROM grupos),$1, $2) RETURNING *',
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
    const result = await pool.query(`SELECT A.ID, 
                                            B.DESCRICAO, 
                                            A.IDADE, 
                                            C.NOME
                                      FROM arvores A, especies B, grupos C
                                      WHERE A.ESPECIE_ID = B.ID 
                                        AND A.GRUPO_ID = C.ID`);
    return result.rows;
  } catch (err) {
    console.error('Erro ao consultar árvores:', err);
    throw err;
  }
}

// Função para adicionar uma árvore
async function addArvore(arvore) {
  const { idade, especie_id, grupo_id } = arvore;
  try {
    const result = await pool.query(
      'INSERT INTO arvores (id, idade, especie_id, grupo_id) VALUES ((SELECT COALESCE(MAX(id), 0) + 1 FROM arvores), $1, $2, $3) RETURNING *',
      [idade, especie_id, grupo_id]
    );
    return result.rows[0];
  } catch (err) {
    console.error('Erro ao adicionar árvore:', err);
    throw err;
  }
}

async function getArvoreById(id) {
  try {
    const result = await pool.query(`SELECT A.ID, 
                                            B.DESCRICAO, 
                                            A.IDADE, 
                                            C.NOME
                                      FROM arvores A, especies B, grupos C
                                      WHERE A.ID = $1 
                                        AND A.ESPECIE_ID = B.ID 
                                        AND A.GRUPO_ID = C.ID`, [id]);

    if (result.rows.length === 0) {
      return null;
    }

    return result.rows[0];
  } catch (err) {
    console.error('Erro ao buscar árvore pelo ID:', err);
    throw err; // Propaga o erro para o controlador
  }
}

async function updateArvore(id, { idade, especie_id, grupo_id }) {
  try {
    const result = await pool.query(
      `UPDATE arvores
       SET idade = $1, especie_id = $2, grupo_id = $3
       WHERE id = $4
       RETURNING *`,
      [idade, especie_id, grupo_id, id]
    );

    if (result.rows.length === 0) {
      return null;
    }

    return result.rows[0];
  } catch (err) {
    console.error('Erro ao atualizar árvore:', err);
    throw err; // Propaga o erro para o controlador
  }
}

async function deleteArvore(id) {
  try {
    const result = await pool.query(
      `DELETE FROM arvores
       WHERE id = $1
       RETURNING *`,
      [id]
    );

    if (result.rows.length === 0) {
      return null;
    }

    return result.rows[0];
  } catch (err) {
    console.error('Erro ao deletar árvore:', err);
    throw err; // Propaga o erro para o controlador
  }
}

module.exports = {
  deleteArvore,
  testConnection,
  getArvores,
  getArvoreById,
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
  updateArvore,
  getGrupoId,
  getDescricaoColheitas
};
