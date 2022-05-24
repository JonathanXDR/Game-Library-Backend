const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const app = express();
const gameRouter = require('./routes/game.js');
const userRouter = require('./routes/user.js');
const sequelize = require('./config/database.js');
const cookieParser = require('cookie-parser');
require('dotenv').config();

const PORT = process.env.PORT || 3010;

app.use(morgan('dev'));
app.use(cors());
app.use(cookieParser());

sequelize
  .authenticate()
  .then(() => {
    console.log('Connection has been established successfully.');
  })
  .catch((err) => {
    console.error('Unable to connect to the database:', err);
  });

app.use(express.json());

// Both index.js and things.js should be in same directory
app.use('/game', gameRouter);
app.use('/user', userRouter);

app.listen(PORT, () => {
  console.log(`server isch am laufe!!! http://localhost:${PORT}`);
});

// GET /game => return all (Done)
// GET /game/1 => return one
// POST /game => create
// PUT /game => update
// DELETE /game => delete
