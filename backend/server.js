const express = require('express');
const mongoose = require('mongoose');
//const cors = require('cors');
require('dotenv').config();

const app = express();

const cors = require('cors');
app.use(cors({
  origin: ['https://filmes-api-x66u.onrender.com', 'https://filmes-api-black.vercel.app'], // Alterar depois de criado o servidor e vercel.
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  credentials: true
}));
// Middleware
app.use(cors());
app.use(express.json());

// Rotas
const filmeRotas = require('./routes/filmeRotas');
app.use('/api', filmeRotas);

// Conexão com MongoDB
mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() => console.log('✅ Conectado ao MongoDB Atlas'))
.catch((err) => console.error('Erro ao conectar:', err));

// Rota de teste
app.get('/', (req, res) => {
  res.send('API funcionando com sucesso!');
});

// Iniciar servidor
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`🚀 Servidor rodando na porta ${PORT}`);
});



