const express = require('express');
const router = express.Router();
const User = require('../models/users');

// Listar todos os usuários
router.get('/', async (req, res) => {
  const users = await User.findAll();
  res.status(200).json(users);
});

//Criar novo usuário
router.post('/', async (req, res) => {
  const user = await User.create(req.body);
  res.status(201).json(user);
});

// Atualiza usuário
router.put('/:id', async (req, res) => {
  const user = await User.findByPk(req.params.id);
  if (!user) return res.status(404).json({ message: 'Usuário não encontrado' });

  await user.update(req.body);
  res.status(200).json(user);
});

// Deletar usuário
router.delete('/:id', async (req, res) => {
  const user = await User.findByPk(req.params.id);
  if (!user) return res.status(404).json({ message: 'Usuário não encontrado' });

  await user.destroy();
  res.status(200).json({ message: 'Usuário deletado com sucesso' });
});

module.exports = router;
