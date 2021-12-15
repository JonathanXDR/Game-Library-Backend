const express = require('express');
const bcrypt = require('bcrypt');
const router = express.Router();
const uuid = require('uuid');
const jwt = require('jsonwebtoken');
const authenticateToken = require('../middlewares/auth.js');
const User = require('../models/User.js');

// User Login
router.get('/', authenticateToken, async (req, res) => {
  const allUsers = await User.findAll();
  res.json(allUsers);
});

router.get('/:id', authenticateToken, async (req, res) => {
  const user = await User.findOne({ where: { id: req.params.id } });

  if (!user) {
    res.status(404).send('User not found');
  } else {
    res.json(user);
  }
});

router.post('/', async (req, res) => {
  const hashedPassword = await bcrypt.hash(req.body.password, 10);

  const createdUser = await User.create({
    id: uuid.v4(),
    username: req.body.username,
    password: hashedPassword,
  });

  res.json(createdUser);
});

router.post('/login', async (req, res) => {
  // get one user with username
  const user = await User.findOne({ where: { username: req.body.username } });

  // check if user exists
  if (!user) {
    return res.status(401).send('Wrong username or password');
  }

  try {
    bcrypt.compare(req.body.password, user.password).then((hash) => {
      if (hash) {
        const accessToken = jwt.sign(
          { id: user.id, username: user.username },
          process.env.ACCESS_TOKEN_SECRET,
          { expiresIn: '2h' }
        );

        res.json(accessToken);
      } else {
        res.sendStatus(403);
      }
    });
  } catch {
    res.sendStatus(500);
  }
});

router.put('/:id', authenticateToken, async (req, res) => {
  const foundUser = await User.findOne({ where: { id: req.params.id } });
  const hashedPassword = await bcrypt.hash(req.body.password, 10);

  foundUser.update({
    username: req.body.username,
    password: hashedPassword,
  });

  res.send(await foundUser.save());
});

router.delete('/:id', authenticateToken, async (req, res) => {
  // Delete user where id = req.params.id
  await User.destroy({ where: { id: req.params.id } });
  res.sendStatus(204);
});

module.exports = router;
