const express = require('express');
const cors = require('cors');
const conexao = require('../db');

const app = express();

function responderErroBanco(res, err, mensagem) {
  console.error(mensagem, err);
  return res.status(503).json({
    erro: 'Não foi possível comunicar com o banco de dados. Verifique o MySQL/XAMPP e as credenciais.'
  });
}

app.use(cors()); // permite que o cadastro.html (aberto no navegador) acesse a API
app.use(express.json()); // substitui o body-parser (já incluso no Express 5)

// Rota de cadastro de usuário
app.post('/cadastrar', (req, res) => {
  const { nome, sobrenome, data_nascimento, email, senha, tipo } = req.body;

  // Validação básica
  if (!nome || !sobrenome || !data_nascimento || !email || !senha || !tipo) {
    return res.status(400).json({ erro: 'Preencha todos os campos.' });
  }

  // Verifica se o email já existe
  const sqlVerifica = 'SELECT id FROM usuarios WHERE email = ?';
  conexao.query(sqlVerifica, [email], (err, resultados) => {
    if (err) {
      return responderErroBanco(res, err, 'Erro ao verificar email:');
    }

    if (resultados.length > 0) {
      return res.status(409).json({ erro: 'Já existe um usuário com esse email.' });
    }

    // Insere o novo usuário
    const sqlInsere = `
      INSERT INTO usuarios (nome, sobrenome, data_nascimento, email, senha, tipo)
      VALUES (?, ?, ?, ?, ?, ?)
    `;
    conexao.query(
      sqlInsere,
      [nome, sobrenome, data_nascimento, email, senha, tipo],
      (err, resultado) => {
        if (err) {
          return responderErroBanco(res, err, 'Erro ao cadastrar usuário:');
        }
        return res.status(201).json({
          mensagem: 'Usuário cadastrado com sucesso!',
          id: resultado.insertId
        });
      }
    );
  });
});

// Rota de login (usada por login.html / js/login.js)
app.post('/login', (req, res) => {
  const { email, senha } = req.body;

  if (!email || !senha) {
    return res.status(400).json({ erro: 'Informe email e senha.' });
  }

  const sql = 'SELECT id, nome, sobrenome, email, tipo FROM usuarios WHERE email = ? AND senha = ?';
  conexao.query(sql, [email, senha], (err, resultados) => {
    if (err) {
      return responderErroBanco(res, err, 'Erro ao fazer login:');
    }

    if (resultados.length === 0) {
      return res.status(401).json({ erro: 'Email ou senha inválidos.' });
    }

    return res.json({ mensagem: 'Login realizado com sucesso!', usuario: resultados[0] });
  });
});

const PORTA = 3000;
app.listen(PORTA, () => {
  console.log(`Servidor rodando em http://127.0.0.1:${PORTA}`);
});