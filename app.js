const express = require('express');
const app = express();

const PORT = process.env.PORT || 5000;

let games = [
  { id: '1', name: 'Minecraft', year: 2011 },
  { id: '2', name: 'LOL', year: 2015 },
];

app.use(express.json());

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

// GET /game => return all (Done)
// GET /game/1 => return one
// POST /game => create
// PUT /game => update
// DELETE /game => delete
