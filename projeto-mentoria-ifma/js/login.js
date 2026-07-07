document.getElementById('loginForm').addEventListener('submit', async (event) => {
  event.preventDefault();

  const email = document.getElementById('email').value.trim();
  const senha = document.getElementById('senha').value;

  if (!email || !senha) {
    alert('Preencha email e senha.');
    return;
  }

  try {
    const response = await fetch('http://127.0.0.1:3000/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, senha })
    });

    const data = await response.json();

    if (!response.ok) {
      // servidor respondeu com erro (5xx/4xx) — tentar fallback local antes de notificar o usuário
      console.warn('Servidor retornou erro ao fazer login:', data);

      const usersKey = 'ifma_users';
      const users = JSON.parse(localStorage.getItem(usersKey) || '[]');
      const found = users.find(u => u.email === email && u.senha === senha);

      if (found) {
        const usuario = { id: found.id || null, nome: found.nome, sobrenome: found.sobrenome, email: found.email, tipo: found.tipo };
        localStorage.setItem('usuarioIFMA', JSON.stringify(usuario));
        window.location.href = 'mentoria.html';
        return;
      }

      alert(data.erro || 'Falha ao fazer login.');
      return;
    }

    localStorage.setItem('usuarioIFMA', JSON.stringify(data.usuario));
    window.location.href = 'mentoria.html';
  } catch (error) {
    console.warn('Login remoto falhou, tentando autenticação local:', error);

    // fallback local: verifica users salvos no localStorage
    const usersKey = 'ifma_users';
    const users = JSON.parse(localStorage.getItem(usersKey) || '[]');
    const found = users.find(u => u.email === email && u.senha === senha);

    if (found) {
      const usuario = { id: found.id || null, nome: found.nome, sobrenome: found.sobrenome, email: found.email, tipo: found.tipo };
      localStorage.setItem('usuarioIFMA', JSON.stringify(usuario));
      window.location.href = 'mentoria.html';
      return;
    }

    alert('Não foi possível conectar ao servidor e não existem credenciais locais correspondentes.');
  }
});
