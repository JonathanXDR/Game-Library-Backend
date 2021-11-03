const express = require('express');
const app = express();
const gameJs = require('./game.js');
const PORT = process.env.PORT || 5000;

app.use(express.json());

//both index.js and things.js should be in same directory
app.use('/game', gameJs);

// Code

app.listen(PORT, () => {
  console.log(`server isch am laufe!!! http://localhost:${PORT}`);
});

// GET /game => return all (Done)
// GET /game/1 => return one
// POST /game => create
// PUT /game => update
// DELETE /game => delete
