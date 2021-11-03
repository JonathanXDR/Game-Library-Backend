const express = require('express');
const bcrypt = require('bcrypt');
const router = express.Router();
const connection = require('./database.js');
const uuid = require('uuid');

// User Login
router.get('/', (req, res) => {
  connection.query('SELECT * FROM user', (err, rows) => {
    if (err) throw err;
    res.json(rows);
  });
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

      console.log(rows);

      if (rows.length === 0) {
        return res.status(400).send('Cannot find user');
      }
      try {
        bcrypt.compare(req.body.password, rows[0].password).then((hash) => {
          if (hash) {
              // TODO: Generate jwt token
              // TODO: send token
            res.send('Success');
          } else {
            res.send('Not Allowed');
          }
        });
      } catch {
        res.status(500).send();
      }
    }
  );
});
//export this router to use in our index.js
module.exports = router;
