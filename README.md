# TestFlow

Sistema web para **criação, organização e acompanhamento de casos de teste de software**, desenvolvido para a disciplina de **Programação Web I** (UFAL – Campus Arapiraca), professor Gustavo Miranda.

## Sobre o projeto

Muitas equipes registram seus casos de teste em planilhas, documentos e mensagens soltas, o que deixa as informações descentralizadas e dificulta saber o que já foi executado, aprovado, reprovado ou está pendente.

O **TestFlow** centraliza os casos de teste em um único lugar. Nele é possível:

- Ver um **dashboard** com o total de casos, quantos passaram, falharam ou estão pendentes e o progresso da execução;
- **Listar** todos os casos, com **busca** por ID, título ou funcionalidade e **filtros** por status e prioridade;
- **Cadastrar** novos casos de teste (título, funcionalidade, prioridade, pré-condições, passos e resultado esperado);
- Ver os **detalhes** de cada caso;
- **Registrar o resultado** da execução (Passou / Falhou / Não executado);
- **Excluir** casos de teste.

Todos os dados ficam salvos em um banco de dados **MySQL**.

## Tecnologias

| Parte | Tecnologias |
|-------|-------------|
| Front-end | React 19, Vite, React Router DOM, Lucide React (ícones) |
| Back-end | Node.js, Express |
| Banco de dados | MySQL (biblioteca `mysql2`) |

## Estrutura de pastas

```
testeflow/
├── index.html            # Página HTML inicial
├── src/
│   ├── App.jsx           # Rotas e estado principal (useState / useEffect)
│   ├── components/
│   │   └── Sidebar.jsx   # Menu lateral
│   ├── pages/            # Dashboard, TestCases, NewTestCase, TestCaseDetails, About
│   ├── services/
│   │   └── api.js        # Funções que chamam a API (fetch)
│   └── styles/           # Arquivos CSS de cada página
└── server/
    ├── index.js          # API REST (Express)
    ├── db.js             # Conexão com o MySQL
    ├── database.sql      # Script de criação do banco e dados iniciais
    └── .env.example      # Modelo das configurações do banco
```

## Conceitos da disciplina aplicados

| Requisito | Onde está no projeto |
|-----------|----------------------|
| Página HTML inicial | `index.html` |
| Dividir a página em partes (componentes) | `Sidebar`, páginas em `src/pages` |
| Comandos de locomoção dos componentes | `NavLink` e `useNavigate` (React Router) |
| Estilização em texto e imagens | Arquivos em `src/styles`, logo na `Sidebar` |
| Rotas para diferentes páginas | `App.jsx` (`/`, `/casos`, `/novo-caso`, `/casos/:id`, `/sobre`) |
| Props | `testCases`, `addTestCase`, `updateTestCaseStatus`, `deleteTestCase` |
| Biblioteca de ícones do React | `lucide-react` |
| Eventos `onChange` e `onClick` | Formulário, busca, filtros e botões |
| `useState` e renderização condicional | Estado dos casos, carregando/erro, lista vazia, caso não encontrado |
| Conexão com banco de dados | `server/` (Express + MySQL) |

## Como executar

### Pré-requisitos

- [Node.js](https://nodejs.org/) 18 ou superior
- [MySQL](https://dev.mysql.com/downloads/) 8 (ou MySQL do XAMPP/WAMP)

### 1. Criar o banco de dados

Abra o MySQL Workbench e execute o arquivo `server/database.sql`, ou rode no terminal:

```bash
mysql -u root -p < server/database.sql
```

Isso cria o banco `testflow`, a tabela `casos_teste` e três casos de exemplo.

### 2. Configurar e iniciar o back-end

```bash
cd server
npm install
```

Copie o arquivo `.env.example` para `.env` e coloque o usuário e a senha do seu MySQL:

```env
DB_HOST=localhost
DB_PORT=3306
DB_USER=root
DB_PASSWORD=sua_senha
DB_NAME=testflow
PORT=3001
```

Inicie a API:

```bash
npm start
```

Se estiver tudo certo, aparece no terminal: `Conectado ao MySQL com sucesso!`

### 3. Iniciar o front-end

Em **outro terminal**, na pasta raiz do projeto (`testeflow`):

```bash
npm install
npm run dev
```

Acesse **http://localhost:5173** no navegador.

## Rotas da API

| Método | Rota | Descrição |
|--------|------|-----------|
| GET | `/api/casos` | Lista todos os casos de teste |
| GET | `/api/casos/:id` | Busca um caso pelo ID |
| POST | `/api/casos` | Cadastra um novo caso |
| PATCH | `/api/casos/:id/status` | Atualiza o status de um caso |
| DELETE | `/api/casos/:id` | Exclui um caso |
