const mysql = require('mysql2');

const conexao = mysql.createConnection({
  host: process.env.DB_HOST || '127.0.0.1',
  port: Number(process.env.DB_PORT) || 3306,
  user: process.env.DB_USER || 'root',
  password: process.env.DB_PASSWORD || '',
  database: process.env.DB_NAME || 'mentoria_ifma',
  charset: 'utf8mb4'
});

conexao.connect(err => {
  if (err) {
    console.error('Erro na conexão com o banco:', err.message);
    return;
  }
  console.log('Conectado ao banco mentoria_ifma!');
});

conexao.on('error', err => {
  console.error('Erro inesperado na conexão do banco:', err.message);
});

module.exports = conexao;
