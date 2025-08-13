const express = require('express');
const router = express.Router();
const {
  criarFilme,
  listarFilmes,
  atualizarFilme,
  deletarFilme
} = require('../controllers/filmeController');

// Rota POST - Criar contato
router.post('/filmes', criarFilme);

// Rota GET - Listar todos os contatos
router.get('/filmes', listarFilmes);

// Rota PUT - Atualizar contato por ID
router.put('/filmes/:id', atualizarFilme);

// Rota DELETE - Excluir contato por ID
router.delete('/filmes/:id', deletarFilme);

module.exports = router;
