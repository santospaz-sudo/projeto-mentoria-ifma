-- =====================================================
-- Banco de Dados: Plataforma de Mentoria IFMA
-- =====================================================

CREATE DATABASE IF NOT EXISTS mentoria_ifma
  CHARACTER SET utf8mb4
  COLLATE utf8mb4_unicode_ci;

USE mentoria_ifma;

-- Tabela de usuários (mentores e mentorados)
CREATE TABLE IF NOT EXISTS usuarios (
  id INT AUTO_INCREMENT PRIMARY KEY,
  nome VARCHAR(100) NOT NULL,
  sobrenome VARCHAR(100) NOT NULL,
  data_nascimento DATE NOT NULL,
  email VARCHAR(150) NOT NULL UNIQUE,
  senha VARCHAR(255) NOT NULL,
  tipo ENUM('mentor', 'mentorado') NOT NULL,
  criado_em TIMESTAMP DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB;

-- Tabela de áreas de mentoria (ex: Matemática, ADS, TPG, etc.)
CREATE TABLE IF NOT EXISTS areas_mentoria (
  id INT AUTO_INCREMENT PRIMARY KEY,
  nome VARCHAR(100) NOT NULL,
  categoria ENUM('formacao_geral', 'ensino_superior') NOT NULL
) ENGINE=InnoDB;

-- Tabela de vínculo entre mentor e área que ele mentora
CREATE TABLE IF NOT EXISTS mentor_areas (
  id INT AUTO_INCREMENT PRIMARY KEY,
  usuario_id INT NOT NULL,
  area_id INT NOT NULL,
  FOREIGN KEY (usuario_id) REFERENCES usuarios(id) ON DELETE CASCADE,
  FOREIGN KEY (area_id) REFERENCES areas_mentoria(id) ON DELETE CASCADE
) ENGINE=InnoDB;

-- Dados iniciais das áreas exibidas em mentoria.html
INSERT INTO areas_mentoria (nome, categoria) VALUES
  ('Matemática', 'formacao_geral'),
  ('Língua Portuguesa', 'formacao_geral'),
  ('Química', 'formacao_geral'),
  ('Biologia', 'formacao_geral'),
  ('Inglês', 'formacao_geral'),
  ('Artes', 'formacao_geral'),
  ('Educação Física', 'formacao_geral'),
  ('Física', 'formacao_geral'),
  ('Sociologia', 'formacao_geral'),
  ('Análise e Desenvolvimento de Sistemas (ADS)', 'ensino_superior'),
  ('Tecnologia em Processos Gerenciais (TPG)', 'ensino_superior');