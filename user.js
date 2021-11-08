const express = require('express');
const bcrypt = require('bcrypt');
const router = express.Router();
const connection = require('./config/database.js');
const uuid = require('uuid');
const jwt = require('jsonwebtoken');
const authenticateToken = require('./middlewares/auth.js');
const User = require('./models/User.js');
const sequelize = require('sequelize');

// User Login
router.get('/', authenticateToken, async (req, res) => {
  const allUsers = await User.findAll();
  res.json(allUsers);

  // connection.query('SELECT * FROM user', (err, rows) => {
  //   if (err) throw err;
  //   res.json(rows);
  // });
});

router.post('/', async (req, res) => {
  const hashedPassword = await bcrypt.hash(req.body.password, 10);
  connection.query(
    `INSERT INTO user (id, username, password) VALUES ("${uuid.v4()}", "${
      req.body.username
    }", "${hashedPassword}")`,
    (err, rows) => {
      if (err) throw err;
      res.sendStatus(200);
    }
  );
});

router.post('/login', (req, res) => {
  connection.query(
    `SELECT * FROM user WHERE username = "${req.body.username}"`,
    (err, rows) => {
      if (err) throw err;
      if (rows.length === 0) {
        return res.status(400).send('Cannot find user');
      }
      try {
        bcrypt.compare(req.body.password, rows[0].password).then((hash) => {
          if (hash) {
            const accessToken = jwt.sign(
              req.body.username,
              process.env.ACCESS_TOKEN_SECRET
              // { expiresIn: '15s' }
            );

            res.json(accessToken);
          } else {
            res.sendStatus(403);
          }
        });
      } catch {
        res.sendStatus(500);
      }
    }
  );
});

//export this router to use in our index.js
module.exports = router;
