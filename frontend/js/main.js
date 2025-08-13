const API_BASE_URL = 'https://filmes-api-x66u.onrender.com/api';

const form = document.getElementById('form-filme');
const tabela = document.getElementById('tabela-filme');

let idEditando = null; // Para controlar se está editando

// Carregar filmes
async function carregarFilmes() {
  try {
    const resposta = await fetch(`${API_BASE_URL}/filmes`);
    const filmes = await resposta.json();

    tabela.innerHTML = '';

    filmes.forEach(filme => {
      const linha = document.createElement('tr');

      linha.innerHTML = `
        <td>${filme.titulo}</td>
        <td>${filme.duracao || ''}</td>
        <td>${filme.genero || ''}</td>
        <td>${filme.sinopse || ''}</td>
        <td>
          <button class="editar" onclick="editarFilme('${filme._id}')">Editar</button>
          <button class="excluir" onclick="excluirFilme('${filme._id}')">Excluir</button>
        </td>
      `;

      tabela.appendChild(linha);
    });
  } catch (error) {
    alert('Erro ao carregar filmes: ' + error.message);
  }
}

// Enviar formulário (criar ou atualizar)
form.addEventListener('submit', async (e) => {
  e.preventDefault();

  const titulo = document.getElementById('titulo').value.trim();
  const duracao = document.getElementById('duracao').value.trim();
  const genero = document.getElementById('genero').value;
  const sinopse = document.getElementById('sinopse').value.trim();

  if (!titulo) {
    alert('O título é obrigatório');
    return;
  }

  const filme = { titulo, duracao, genero, sinopse };

  try {
    let resposta;
    if (idEditando) {
      resposta = await fetch(`${API_BASE_URL}/filmes/${idEditando}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(filme)
      });
    } else {
      resposta = await fetch(`${API_BASE_URL}/filmes`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(filme)
      });
    }

    if (!resposta.ok) {
      const erro = await resposta.json();
      throw new Error(erro.mensagem || 'Erro desconhecido');
    }

    alert(idEditando ? 'Filme atualizado!' : 'Filme criado!');
    idEditando = null;
    form.reset();
    carregarFilmes();

  } catch (error) {
    alert('Erro ao salvar filme: ' + error.message);
  }
});

// Excluir filme
async function excluirFilme(id) {
  if (!confirm('Deseja realmente excluir este filme?')) return;

  try {
    const resposta = await fetch(`${API_BASE_URL}/filmes/${id}`, {
      method: 'DELETE'
    });

    if (!resposta.ok) throw new Error('Falha ao excluir');

    alert('Filme excluído!');
    carregarFilmes();
  } catch (error) {
    alert('Erro ao excluir filme: ' + error.message);
  }
}

// Editar filme
async function editarFilme(id) {
  try {
    const resposta = await fetch(`${API_BASE_URL}/filmes`);
    const filmes = await resposta.json();

    const filme = filmes.find(c => c._id === id);
    if (!filme) {
      alert('Filme não encontrado');
      return;
    }

    document.getElementById('titulo').value = filme.titulo;
    document.getElementById('duracao').value = filme.duracao;
    document.getElementById('genero').value = filme.genero;
    document.getElementById('sinopse').value = filme.sinopse;

    idEditando = id;

  } catch (error) {
    alert('Erro ao buscar filme para editar: ' + error.message);
  }
}
window.editarFilme = editarFilme;
window.excluirFilme = excluirFilme;
// Inicializar lista
carregarFilmes();

