const express = require('express');
const bodyParser = require('body-parser');
const swaggerUi = require('swagger-ui-express');
const YAML = require('yamljs');
const db = require('./db/queries');

const arvoreRoutes = require('./routes/arvoreRoutes');
const especieRoutes = require('./routes/especieRoutes');
const grupoRoutes = require('./routes/grupoRoutes');
const colheitaRoutes = require('./routes/colheitaRoutes');

const swaggerDocument = YAML.load('./swagger.yaml');

const app = express();

app.use(bodyParser.json());
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

app.use('/arvores', arvoreRoutes);
app.use('/especies', especieRoutes);
app.use('/grupos', grupoRoutes);
app.use('/colheitas', colheitaRoutes);

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
  db.testConnection();
});
