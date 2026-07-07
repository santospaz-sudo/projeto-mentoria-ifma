const express = require('express');
const bodyParser = require('body-parser');
const bcrypt = require('bcrypt');
const conexao = require('./db');

const app = express();
const PORTA = 3000;

app.use(bodyParser.json());

// Libera acesso do front-end (login.html / cadastro.html) rodando em outra origem
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'GET,POST');
  res.header('Access-Control-Allow-Headers', 'Content-Type');
  next();
});

// ---------- Rota de Cadastro ----------
app.post('/cadastrar', async (req, res) => {
  const { nome, sobrenome, data_nascimento, email, senha, tipo } = req.body;

  if (!nome || !sobrenome || !data_nascimento || !email || !senha || !tipo) {
    return res.status(400).json({ erro: 'Preencha todos os campos.' });
  }

  try {
    const senhaHash = await bcrypt.hash(senha, 10);

    const sql = `INSERT INTO usuarios (nome, sobrenome, data_nascimento, email, senha, tipo)
                 VALUES (?, ?, ?, ?, ?, ?)`;

    conexao.query(sql, [nome, sobrenome, data_nascimento, email, senhaHash, tipo], (err, resultado) => {
      if (err) {
        if (err.code === 'ER_DUP_ENTRY') {
          return res.status(409).json({ erro: 'Este email já está cadastrado.' });
        }
        console.error(err);
        return res.status(500).json({ erro: 'Erro ao cadastrar usuário.' });
      }
      res.status(201).json({ mensagem: 'Usuário cadastrado com sucesso!', id: resultado.insertId });
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ erro: 'Erro interno no servidor.' });
  }
});

// ---------- Rota de Login ----------
app.post('/login', (req, res) => {
  const { email, senha } = req.body;

  if (!email || !senha) {
    return res.status(400).json({ erro: 'Informe email e senha.' });
  }

  const sql = 'SELECT * FROM usuarios WHERE email = ?';
  conexao.query(sql, [email], async (err, resultados) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ erro: 'Erro ao consultar usuário.' });
    }

    if (resultados.length === 0) {
      return res.status(401).json({ erro: 'Email ou senha inválidos.' });
    }

    const usuario = resultados[0];
    const senhaCorreta = await bcrypt.compare(senha, usuario.senha);

    if (!senhaCorreta) {
      return res.status(401).json({ erro: 'Email ou senha inválidos.' });
    }

    res.status(200).json({
      mensagem: 'Login realizado com sucesso!',
      usuario: {
        id: usuario.id,
        nome: usuario.nome,
        sobrenome: usuario.sobrenome,
        email: usuario.email,
        tipo: usuario.tipo
      }
    });
  });
});

// ---------- Rota para listar áreas de mentoria ----------
app.get('/areas', (req, res) => {
  conexao.query('SELECT * FROM areas_mentoria', (err, resultados) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ erro: 'Erro ao buscar áreas.' });
    }
    res.status(200).json(resultados);
  });
});

app.listen(PORTA, () => {
  console.log(`Servidor rodando em http://localhost:${PORTA}`);
});
