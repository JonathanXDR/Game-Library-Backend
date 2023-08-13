const express = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const uuid = require('uuid');
const authenticateToken = require('../middlewares/auth.js');
const User = require('../models/User.js');

const router = express.Router();

router.get('/', authenticateToken, async (req, res) => {
  const allUsers = await User.findAll();
  res.json(allUsers);
});

router.get('/:id', authenticateToken, async (req, res) => {
  const user = await User.findOne({ where: { id: req.params.id } });
  if (!user) {
    return res.status(404).send('User not found');
  }
  res.json(user);
});

router.post('/', async (req, res) => {
  const { username, password } = req.body;
  const hashedPassword = await bcrypt.hash(password, 10);
  const createdUser = await User.create({
    id: uuid.v4(),
    username,
    password: hashedPassword,
  });
  res.json(createdUser);
});

router.post('/login', async (req, res) => {
  const { username, password } = req.body;
  const user = await User.findOne({ where: { username } });
  if (!user) {
    return res.status(401).send('Wrong username or password');
  }

  const isPasswordValid = await bcrypt.compare(password, user.password);
  if (isPasswordValid) {
    const accessToken = jwt.sign(
      { id: user.id, username: user.username },
      process.env.ACCESS_TOKEN_SECRET,
      { expiresIn: '2h' }
    );
    res.setHeader('Set-Cookie', `accessToken=${accessToken}; HttpOnly; Max-Age=${60000 * 15};`);
    res.json(accessToken);
  } else {
    res.sendStatus(403);
  }
});

router.put('/:id', authenticateToken, async (req, res) => {
  const { username, password } = req.body;
  const hashedPassword = await bcrypt.hash(password, 10);
  const foundUser = await User.findOne({ where: { id: req.params.id } });
  foundUser.update({ username, password: hashedPassword });
  await foundUser.save();

  const accessToken = jwt.sign(
    { id: foundUser.id, username: foundUser.username },
    process.env.ACCESS_TOKEN_SECRET,
    { expiresIn: '2h' }
  );
  res.setHeader('Set-Cookie', `accessToken=${accessToken}; HttpOnly; Max-Age=${60000 * 15};`);
  res.json(accessToken);
});

router.delete('/:id', authenticateToken, async (req, res) => {
  await User.destroy({ where: { id: req.params.id } });
  res.sendStatus(204);
});

module.exports = router;
