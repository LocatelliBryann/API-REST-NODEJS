const express = require('express');
const bcrypt = require('bcrypt');
const { body, validationResult } = require('express-validator');
const router = express.Router();
const User = require('../models/users');
const jwt = require('jsonwebtoken');
const jwtSecret = process.env.JWT_SECRET;

function authenticateToken(req, res, next) {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  if (!token) {
    return res.status(401).json({ error: 'Token não fornecido' });
  }

  jwt.verify(token, jwtSecret, (err, user) => {
    if (err) {
      return res.status(403).json({ error: 'Token inválido ou expirado' });
    }
    req.user = user;
    next();
  });
}

// Validações comuns para criar e atualizar
const userValidationRules = [
  body('nome').trim().escape().notEmpty().withMessage('Nome é obrigatório'),
  body('email').isEmail().normalizeEmail().withMessage('Email inválido'),
  body('idade').isInt({ min: 1 }).withMessage('Idade deve ser um número positivo'),
  body('senha').isLength({ min: 6 }).withMessage('Senha deve ter no mínimo 6 caracteres')
];

// Criar novo usuário
router.post('/', userValidationRules, async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  try {
    const { nome, email, idade, senha } = req.body;

    // Hash da senha
    const hashedPassword = await bcrypt.hash(senha, 10); // 10 = número de rounds (segurança)

    const user = await User.create({ nome, email, idade, senha: hashedPassword });
    res.status(201).json({ message: 'Usuário criado com sucesso', user });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Erro ao criar usuário' });
  }
});

// Login de usuário
router.post('/login', async (req, res) => {
  const { email, senha } = req.body;

  if (!email || !senha) {
    return res.status(400).json({ error: 'Email e senha são obrigatórios' });
  }

  try {
    const user = await User.findOne({ where: { email } });

    if (!user) {
      return res.status(401).json({ error: 'Credenciais inválidas' });
    }

    const passwordMatch = await bcrypt.compare(senha, user.senha);

    if (!passwordMatch) {
      return res.status(401).json({ error: 'Credenciais inválidas' });
    }

    const token = jwt.sign(
      { id: user.id, email: user.email },
      jwtSecret,
      { expiresIn: '1h' } // tempo de expiração do token
    );

    res.status(200).json({ token });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Erro no login' });
    console.error('Login error:', error);
  }
});

// Listar todos os usuários
router.get('/', async (req, res) => {
  try {
    const users = await User.findAll();
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ error: 'Erro ao listar usuários' });
  }
});

// Atualizar usuário - protegido por JWT
router.put('/:id', authenticateToken, userValidationRules, async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  try {
    const user = await User.findByPk(req.params.id);
    if (!user) return res.status(404).json({ message: 'Usuário não encontrado' });

    const { nome, email, idade } = req.body;
    await user.update({ nome, email, idade });
    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ error: 'Erro ao atualizar usuário' });
  }
});

// Deletar usuário - protegido por JWT
router.delete('/:id', authenticateToken, async (req, res) => {
  try {
    const user = await User.findByPk(req.params.id);
    if (!user) return res.status(404).json({ message: 'Usuário não encontrado' });

    await user.destroy();
    res.status(200).json({ message: 'Usuário deletado com sucesso' });
  } catch (error) {
    res.status(500).json({ error: 'Erro ao deletar usuário' });
  }
});

module.exports = router;