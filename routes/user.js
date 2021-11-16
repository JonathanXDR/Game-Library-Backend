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
          { expiresIn: '60s' }
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

module.exports = router;
