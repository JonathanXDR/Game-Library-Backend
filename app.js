const express = require('express');
const morgan = require('morgan');
const app = express();
const gameRouter = require('./game.js');
const userRouter = require('./user.js');
const sequelize = require('./config/database.js');
require('dotenv').config();

const PORT = process.env.PORT || 3010

app.use(morgan('dev'));

sequelize
  .authenticate()
  .then(() => {
    console.log('Connection has been established successfully.');
  })
  .catch((err) => {
    console.error('Unable to connect to the database:', err);
  });

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
