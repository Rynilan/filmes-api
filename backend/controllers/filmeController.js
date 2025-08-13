const Filme = require('../models/filmeModel');

// Criar novo filme
const criarFilme = async (req, res) => {
  try {
    const novoFilme = new Filme(req.body);
    await novoFilme.save();
    res.status(201).json(novoFilme);
  } catch (error) {
    res.status(400).json({ mensagem: 'Erro ao criar filme', erro: error.message });
  }
};

// Listar todos os filme
const listarFilmes = async (req, res) => {
  try {
    const filmes = await Filme.find();
    res.status(200).json(filmes);
  } catch (error) {
    res.status(500).json({ mensagem: 'Erro ao listar filmes', erro: error.message });
  }
};

// Atualizar filme por ID
const atualizarFilme = async (req, res) => {
  try {
    const filmeAtualizado = await Filme.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!filmeAtualizado) return res.status(404).json({ mensagem: 'Filme não encontrado' });
    res.status(200).json(filmeAtualizado);
  } catch (error) {
    res.status(400).json({ mensagem: 'Erro ao atualizar filme', erro: error.message });
  }
};

// Excluir filme por ID
const deletarFilme = async (req, res) => {
  try {
    const filmeExcluido = await Filme.findByIdAndDelete(req.params.id);
    if (!filmeExcluido) return res.status(404).json({ mensagem: 'Filme não encontrado' });
    res.status(200).json({ mensagem: 'Filme excluído com sucesso' });
  } catch (error) {
    res.status(400).json({ mensagem: 'Erro ao excluir filme', erro: error.message });
  }
};

module.exports = {
  criarFilme,
  listarFilmes,
  atualizarFilme,
  deletarFilme
};
