# 🧪 API RESTful - CRUD de Usuários (Node.js + SQLite + Sequelize)

Este é um projeto simples de uma API RESTful construída com **Node.js**, **Sequelize** e **SQLite**, voltada para fins educacionais e testes locais. A API permite operações básicas de CRUD (Create, Read, Update, Delete) com usuários.

---

## 🚀 Funcionalidades

- ✅ Criar usuários
- ✅ Listar todos os usuários
- ✅ Atualizar um usuário por ID
- ✅ Remover um usuário por ID

---
git 
## 📦 Tecnologias utilizadas

- [Node.js](https://nodejs.org/)
- [Express](https://expressjs.com/)
- [Sequelize](https://sequelize.org/)
- [SQLite](https://www.sqlite.org/)
- [Dotenv](https://github.com/motdotla/dotenv)

---

## ⚙️ Instalação e uso

### 1. Clone o repositório ou baixe o ZIP

```bash
git clone https://github.com/seu-usuario/seu-repositorio.git
cd seu-repositorio
```

Ou baixe o `.zip`, extraia e abra a pasta no VS Code.

### 2. Instale as dependências

```bash
npm install
```

### 3. Crie o arquivo `.env`

Crie um arquivo `.env` na raiz do projeto:

```env
PORT=3000
```

### 4. Inicie o servidor

```bash
node server.js
```

> O servidor estará rodando em `http://localhost:3000`

---

## 🧪 Endpoints da API

### ➕ Criar usuário

```http
POST /users
Content-Type: application/json

{
  "name": "Maria",
  "email": "maria@email.com",
  "age": 30
}
```

### 🔍 Listar todos os usuários

```http
GET /users
```

### ✏️ Atualizar usuário por ID

```http
PUT /users/:id
Content-Type: application/json

{
  "name": "Maria Silva",
  "age": 31
}
```

### ❌ Deletar usuário por ID

```http
DELETE /users/:id
```

---

## 📁 Estrutura do projeto

```
user-api-sqlite/
├── config/
│   └── database.js
├── models/
│   └── User.js
├── routes/
│   └── userRoutes.js
├── server.js
├── .env
├── .gitignore
├── package.json
```

---

## 🛑 .gitignore

O projeto ignora arquivos sensíveis e de ambiente:

```gitignore
node_modules/
.env
database.sqlite
```

---

## 📝 Licença

Este projeto é livre para fins acadêmicos e educacionais.
