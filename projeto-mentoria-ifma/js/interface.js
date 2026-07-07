document.addEventListener('DOMContentLoaded', () => {
  const usuario = JSON.parse(localStorage.getItem('usuarioIFMA'));

  if (!usuario) {
    window.location.href = 'login.html';
    return;
  }

  const usuarioInfo = document.getElementById('usuarioInfo');
  if (usuarioInfo) {
    usuarioInfo.textContent = `Olá, ${usuario.nome} ${usuario.sobrenome} (${usuario.tipo})`;
  }

  const logoutBtn = document.getElementById('logoutBtn');
  if (logoutBtn) {
    logoutBtn.addEventListener('click', () => {
      localStorage.removeItem('usuarioIFMA');
      window.location.href = 'login.html';
    });
  }
});
