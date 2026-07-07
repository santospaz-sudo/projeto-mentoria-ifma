document.getElementById("busca").addEventListener("keyup", filtrarMentorias);

function filtrarMentorias() {
  const termo = document.getElementById("busca").value.toLowerCase().trim();
  const botoes = Array.from(document.querySelectorAll(".botoes button"));
  const resultado = document.getElementById("resultado");

  resultado.innerHTML = "";
  resultado.classList.remove('active');

  if (!termo) {
    botoes.forEach(botao => {
      botao.style.display = "inline-block";
    });
    return;
  }

  botoes.forEach(botao => {
    const texto = botao.textContent.toLowerCase();
    if (texto.includes(termo)) {
      const resultadoBotao = document.createElement("button");
      resultadoBotao.className = botao.className;
      resultadoBotao.textContent = botao.textContent;
      resultadoBotao.addEventListener("click", () => {
        botao.click();
      });
      resultado.appendChild(resultadoBotao);
      resultado.classList.add('active');
    }
    botao.style.display = "none";
  });
}
