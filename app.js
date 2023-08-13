const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const config = require('dotenv').config();
const app = express();
const PORT = process.env.PORT || 3010;
const gameRouter = require('./routes/game.js');
const userRouter = require('./routes/user.js');
const sequelize = require('./config/database.js');

app.use(morgan('dev'));
app.use(cors());
app.use(cookieParser());
app.use(express.json());
app.use('/game', gameRouter);
app.use('/user', userRouter);


sequelize
  .authenticate()
  .then(() => {
    console.log('Connection has been established successfully.');
  })
  .catch((err) => {
    console.error('Unable to connect to the database:', err);
  });


app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
