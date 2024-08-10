require('dotenv').config(); // Para carregar variáveis de ambiente

const { Pool } = require('pg');

// Configuração do pool de conexões
const pool = new Pool({
  user: 'pomardb',
  host: 'pomardb.cvkig0w8kioa.us-east-1.rds.amazonaws.com',
  database: 'postgres',
  password: 'pomardb123',
  port: 5432,
  ssl: {
    rejectUnauthorized: false  // Isso desativa a verificação do certificado; use com cuidado.
  }
});

module.exports = pool;
