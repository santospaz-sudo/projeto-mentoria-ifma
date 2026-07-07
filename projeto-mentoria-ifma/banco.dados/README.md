# banco.dados — Plataforma de Mentoria IFMA

Contém tudo que é preciso para rodar o banco de dados e a API do projeto.

## Arquivos

- **schema.sql** → cria o banco `mentoria_ifma`, a tabela `usuarios`, a tabela `areas_mentoria` (com as áreas já cadastradas: Matemática, Química, ADS, TPG, etc.) e a tabela `mentor_areas` para ligar mentores às áreas que eles atendem.
- **db.js** → conexão com o MySQL (usando o `mysql2`).
- **server.js** → servidor Express com as rotas:
  - `POST /cadastrar` → cadastra um usuário (senha é criptografada com `bcrypt`).
  - `POST /login` → valida email e senha.
  - `GET /areas` → lista as áreas de mentoria cadastradas.
- **package.json** → dependências (`express`, `mysql2`, `bcrypt`, `body-parser`).

## Como usar

1. Instale o MySQL/XAMPP e inicie o serviço do MySQL.
2. Importe o banco (via phpMyAdmin ou terminal):
   ```
   mysql -u root -p < schema.sql
   ```
3. Dentro da pasta `banco.dados`, instale as dependências:
   ```
   npm install
   ```
4. Inicie o servidor:
   ```
   npm start
   ```
   O servidor sobe em `http://localhost:3000`.
5. O `cadastro.html` já faz `fetch` para `http://localhost:3000/cadastrar`. Se quiser ativar o login de verdade, aponte o `login.html` (via `js/login.js`) para `http://localhost:3000/login`.

## Observação de segurança

As senhas nunca são salvas em texto puro — o servidor usa `bcrypt` para gerar um hash antes de gravar no banco, e compara o hash no momento do login.
