const express = require('express');
const bodyParser = require('body-parser');
const swaggerUi = require('swagger-ui-express');
const YAML = require('yamljs');
const db = require('./db/queries');

// Importar as rotas
const arvoreRoutes = require('./routes/arvoreRoutes');
const especieRoutes = require('./routes/especieRoutes');
const grupoRoutes = require('./routes/grupoRoutes');
const colheitaRoutes = require('./routes/colheitaRoutes');

// Configuração do Swagger
const swaggerDocument = YAML.load('./swagger.yaml');

// Criar a instância do Express
const app = express();

// Configurar middleware
app.use(bodyParser.json());
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

// Configurar rotas
app.use('/arvores', arvoreRoutes);
app.use('/especies', especieRoutes);
app.use('/grupos', grupoRoutes);
app.use('/colheitas', colheitaRoutes);

// Iniciar o servidor
const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
  db.testConnection();
});
