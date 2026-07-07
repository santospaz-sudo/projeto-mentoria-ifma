const mysql = require('mysql2');

const conexao = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '', // senha do XAMPP (geralmente vazia)
  database: 'mentoria_ifma'
});

conexao.connect(err => {
  if (err) {
    console.error('Erro na conexão:', err);
    return;
  }
  console.log('Conectado ao banco mentoria_ifma!');
});

module.exports = conexao;
