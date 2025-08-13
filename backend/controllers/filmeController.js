const Filme = require('../models/filmeModel');

// Criar novo contato
const criarFilme = async (req, res) => {
  try {
    const novoFilme = new Filme(req.body);
    await novoFilme.save();
    res.status(201).json(novoFilme);
  } catch (error) {
    res.status(400).json({ mensagem: 'Erro ao criar contato', erro: error.message });
  }
};

// Listar todos os contatos
const listarFilmes = async (req, res) => {
  try {
    const contatos = await Filme.find();
    res.status(200).json(contatos);
  } catch (error) {
    res.status(500).json({ mensagem: 'Erro ao listar contatos', erro: error.message });
  }
};

// Atualizar contato por ID
const atualizarFilme = async (req, res) => {
  try {
    const contatoAtualizado = await Filme.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!contatoAtualizado) return res.status(404).json({ mensagem: 'Filme não encontrado' });
    res.status(200).json(contatoAtualizado);
  } catch (error) {
    res.status(400).json({ mensagem: 'Erro ao atualizar contato', erro: error.message });
  }
};

// Excluir contato por ID
const deletarFilme = async (req, res) => {
  try {
    const contatoExcluido = await Filme.findByIdAndDelete(req.params.id);
    if (!contatoExcluido) return res.status(404).json({ mensagem: 'Filme não encontrado' });
    res.status(200).json({ mensagem: 'Filme excluído com sucesso' });
  } catch (error) {
    res.status(400).json({ mensagem: 'Erro ao excluir contato', erro: error.message });
  }
};

module.exports = {
  criarFilme,
  listarFilmes,
  atualizarFilme,
  deletarFilme
};
