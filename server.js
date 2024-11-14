const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
const preferencesRoutes = require('./routes/preferences');

app.use(cors());
app.use(bodyParser.json());
app.use('/api/preferences', preferencesRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});