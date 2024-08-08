require('dotenv').config(); // Para carregar variáveis de ambiente

const { Pool } = require('pg');

// Configuração do pool de conexões
const pool = new Pool({
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  database: process.env.DB_NAME,
  password: process.env.DB_PASSWORD,
  port: process.env.DB_PORT || 5432,
  ssl: {
    rejectUnauthorized: false  // Isso desativa a verificação do certificado; use com cuidado.
  }
});

module.exports = pool;