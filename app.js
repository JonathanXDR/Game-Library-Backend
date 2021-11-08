const express = require('express');
const app = express();
const gameRouter = require('./game.js');
const userRouter = require('./user.js');
const connection = require('./database.js');
require('dotenv').config();

const PORT = process.env.PORT || 5000;

connection.connect();

app.use(express.json());

//both index.js and things.js should be in same directory
app.use('/game', gameRouter);
app.use('/user', userRouter);

// Code

app.listen(PORT, () => {
  console.log(`server isch am laufe!!! http://localhost:${PORT}`);
});

// GET /game => return all (Done)
// GET /game/1 => return one
// POST /game => create
// PUT /game => update
// DELETE /game => delete
