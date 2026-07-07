let mentorias = {};

function fecharMentoria() {
  const painel = document.getElementById('materiaNotas');
  painel.classList.remove('active');
  painel.innerHTML = '';
}

function exibirMentoria(mentoria) {
  const painel = document.getElementById('materiaNotas');
  painel.classList.add('active');

  if (!mentoria) {
    painel.innerHTML = `
      <button class="fechar-notas">✕</button>
      <h3>Mentoria</h3>
      <p>Nenhuma mentoria disponível.</p>
    `;
    painel.querySelector('.fechar-notas').addEventListener('click', fecharMentoria);
    return;
  }

  painel.innerHTML = `
    <button class="fechar-notas">✕</button>
    <h3>${mentoria.titulo}</h3>
    <p>${mentoria.descricao}</p>
    <h4>Assuntos:</h4>
    <ul>
      ${mentoria.assuntos.map(a => `<li>${a}</li>`).join("")}
    </ul>
    <h4>Recursos:</h4>
    <ul>
      ${mentoria.recursos.map(r => `<li>${r}</li>`).join("")}
    </ul>
  `;
  painel.querySelector('.fechar-notas').addEventListener('click', fecharMentoria);
}

function inicializarMentorias() {
  const botoes = document.querySelectorAll('.botoes button');

  botoes.forEach(botao => {
    botao.addEventListener('click', () => {
      const titulo = botao.dataset.mentoria || botao.textContent.trim();
      const mentoria = mentorias[titulo];
      exibirMentoria(mentoria);
    });
  });
}

function carregarMentorias() {
  return fetch('mentorias.json')
    .then(response => response.json())
    .then(data => {
      mentorias = data[0].mentorias.reduce((map, m) => {
        map[m.titulo] = {
          titulo: m.titulo,
          descricao: m.descricao,
          assuntos: m.assuntos,
          recursos: m.recursos
        };
        return map;
      }, {});
    });
}

document.addEventListener('DOMContentLoaded', () => {
  carregarMentorias()
    .catch(error => {
      console.warn('Falha ao carregar mentorias.json; usando dados embutidos:', error);
      mentorias = {
        "Matemática Básica": {
          titulo: "Matemática Básica",
          descricao: "Revisão de álgebra, equações e funções",
          assuntos: ["Equações do 1º grau", "Funções", "Geometria básica"],
          recursos: ["apostila-matematica.pdf", "video-funcoes.mp4"]
        }
      };
    })
    .finally(() => {
      inicializarMentorias();
    });
});

