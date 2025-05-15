const express = require('express');
const dotenv = require('dotenv');
const sequelize = require('./config/database');
const userRoutes = require('./routes/userRoutes');
const helmet = require('helmet');
const csrf = require('csurf');
const cookieParser = require('cookie-parser');

dotenv.config();

const app = express();

// Segurança
app.use(helmet());
app.use(cookieParser());
app.use(express.json());

// Proteção CSRF (exceto em rotas GET)
app.use(csrf({ cookie: true }));

// Envia o token CSRF como cookie para o front-end
app.use((req, res, next) => {
  res.cookie('XSRF-TOKEN', req.csrfToken());
  next();
});

// Rotas
app.use('/users', userRoutes);

// Inicialização
const PORT = process.env.PORT || 3000;

sequelize.sync({ force: false })
  .then(() => {
    app.listen(PORT, () => {
      console.log(`Servidor rodando na porta ${PORT}`);
    });
  })
  .catch((err) => console.error('Erro ao conectar ao banco de dados:', err));
