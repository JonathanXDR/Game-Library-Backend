const express = require('express');
const app = express();
const gameJs = require('./game.js');
const PORT = process.env.PORT || 5000;

let games = [
  { id: '1', name: 'Minecraft', year: 2011 },
  { id: '2', name: 'LOL', year: 2015 },
];

app.use(express.json());

//both index.js and things.js should be in same directory
app.use('/game', gameJs);

// Code
app.get('/game', (req, res) => {
  res.json(games);
});

app.get('/game/:id', (req, res) => {
  const gameId = req.params.id;
  const foundGame = games.find((game) => game.id === gameId);
  res.json(foundGame);
});

app.listen(PORT, () => {
  console.log(`server isch am laufe!!! http://localhost:${PORT}`);
});

app.post('/game', (req, res) => {
  games.push(req.body);
  res.send(games);
});

app.put('/game/:id', (req, res) => {
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

app.delete('/game/:id', (req, res) => {
  const gameId = req.params.id;

  const newGames = games.filter((game) => game.id !== gameId);
  games = newGames;
  res.send(games);
});

// GET /game => return all (Done)
// GET /game/1 => return one
// POST /game => create
// PUT /game => update
// DELETE /game => delete
