const express = require('express');
const router = express.Router();

let games = [
  { id: '1', name: 'Minecraft', year: 2011 },
  { id: '2', name: 'LOL', year: 2015 },
];

router.get('/', (req, res) => {
  res.json(games);
});

router.post('/', (req, res) => {
  games.push(req.body);
  res.send(games);
});

router.put('/:id', (req, res) => {
  const body = req.body;
  const gameId = req.params.id;

  const newGames = games.map((game) => {
    if (game.id === gameId) {
      return body;
    } else {
      return game;
    }
  });
  games = newGames;
  res.send(games);
});

router.delete('/:id', (req, res) => {
  const gameId = req.params.id;

  const newGames = games.filter((game) => game.id !== gameId);
  games = newGames;
  res.send(games);
});

router.get('/:id', (req, res) => {
  const gameId = req.params.id;
  const foundGame = games.find((game) => game.id === gameId);
  res.json(foundGame);
});

//export this router to use in our index.js
module.exports = router;
