const express = require('express');
const router = express.Router();
const {
  criarFilme,
  listarFilmes,
  atualizarFilme,
  deletarFilme
} = require('../controllers/filmeController');

// Rota POST - Criar filme
router.post('/filmes', criarFilme);

// Rota GET - Listar todos os filmes
router.get('/filmes', listarFilmes);

// Rota PUT - Atualizar filme por ID
router.put('/filmes/:id', atualizarFilme);

// Rota DELETE - Excluir filme por ID
router.delete('/filmes/:id', deletarFilme);

module.exports = router;
