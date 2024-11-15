const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
const preferencesRoutes = require('./routes/preferencesRoutes');
const authRoutes = require('./routes/auth'); // Importar as rotas de autenticação

app.use(cors());
app.use(bodyParser.json());

// Registrar as rotas
app.use('/api/preferences', preferencesRoutes);
app.use('/api/auth', authRoutes); // Registrar as rotas de autenticação

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});