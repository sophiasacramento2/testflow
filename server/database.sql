-- Script do banco de dados do TestFlow (MySQL)
-- Execute no MySQL Workbench ou no terminal:  mysql -u root -p < database.sql

CREATE DATABASE IF NOT EXISTS testflow
  CHARACTER SET utf8mb4
  COLLATE utf8mb4_unicode_ci;

USE testflow;

CREATE TABLE IF NOT EXISTS casos_teste (
  id            VARCHAR(10)  NOT NULL PRIMARY KEY,
  title         VARCHAR(150) NOT NULL,
  feature       VARCHAR(100) NOT NULL,
  priority      ENUM('Alta', 'Média', 'Baixa') NOT NULL,
  status        ENUM('Passou', 'Falhou', 'Não executado') NOT NULL DEFAULT 'Não executado',
  preconditions TEXT,
  steps         TEXT NOT NULL,
  expected      TEXT NOT NULL,
  created_at    TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Dados iniciais (os mesmos que estavam fixos no App.jsx)
INSERT IGNORE INTO casos_teste
  (id, title, feature, priority, status, preconditions, steps, expected)
VALUES
  ('TC001', 'Login com dados válidos', 'Autenticação', 'Alta', 'Passou',
   'Usuário deve estar cadastrado no sistema.',
   '1. Acessar a página de login\n2. Informar e-mail\n3. Informar senha\n4. Clicar em Entrar',
   'O usuário deve ser direcionado para a página inicial.'),

  ('TC002', 'Recuperação de senha', 'Autenticação', 'Média', 'Falhou',
   'Usuário deve possuir uma conta cadastrada.',
   '1. Acessar o login\n2. Clicar em Esqueci minha senha\n3. Informar o e-mail',
   'O sistema deve enviar as instruções de recuperação.'),

  ('TC003', 'Cadastro de usuário', 'Usuários', 'Alta', 'Não executado',
   'Usuário não deve possuir cadastro.',
   '1. Acessar cadastro\n2. Preencher os campos\n3. Clicar em Cadastrar',
   'O novo usuário deve ser cadastrado.');
