const express = require('express');
const router = express.Router();
const connection = require('./config/database.js');
const uuid = require('uuid');
const authenticateToken = require('./middlewares/auth.js');

router.get('/', authenticateToken, (req, res) => {
  connection.query('SELECT * FROM game', (err, rows) => {
    if (err) throw err;
    res.json(rows);
  });
});

router.post('/', authenticateToken, (req, res) => {
  const body = req.body;
  connection.query(
    `INSERT INTO game (id, name, year, rating) VALUES ("${uuid.v4()}", "${
      body.name
    }", ${body.year}, ${body.rating})`,
    (err, rows) => {
      if (err) throw err;
      res.sendStatus(200);
    }
  );
});

router.put('/:id', authenticateToken, (req, res) => {
  const body = req.body;
  const gameId = req.params.id;

  connection.query(
    `UPDATE game SET game.name = "${body.name}", game.year = ${body.year}, game.rating = ${body.rating} WHERE id = "${gameId}"`,
    (err, rows) => {
      if (err) throw err;

      res.sendStatus(200);
    }
  );
});

router.delete('/:id', authenticateToken, (req, res) => {
  const gameId = req.params.id;

  connection.query(`DELETE FROM game WHERE id = "${gameId}"`, (err, rows) => {
    if (err) throw err;

    res.sendStatus(204);
  });
});

router.get('/:id', authenticateToken, (req, res) => {
  const gameId = req.params.id;
  connection.query(`SELECT * FROM game WHERE id = "${gameId}"`, (err, rows) => {
    if (err) throw err;
    if (rows.length === 0) {
      res.sendStatus(404);
    } else {
      res.json(rows[0]);
    }
  });
});

//export this router to use in our index.js
module.exports = router;
