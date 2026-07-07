const mysql = require('mysql2');

// Conexão com o banco de dados MySQL (ex: XAMPP)
const conexao = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '', // senha do XAMPP (geralmente vazia)
  database: 'mentoria_ifma'
});

conexao.connect(err => {
  if (err) {
    console.error('Erro na conexão com o banco:', err);
    return;
  }
  console.log('Conectado ao banco mentoria_ifma!');
});

module.exports = conexao;
