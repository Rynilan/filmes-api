const mongoose = require('mongoose');

const FilmeTemplate = new mongoose.Schema({
  titulo: {
    type: String,
    required: true
  },
  duracao: Number,
  genero: String,
  sinopse: String
});

module.exports = mongoose.model('Filme', FilmeTemplate);
