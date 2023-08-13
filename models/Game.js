const { DataTypes } = require('sequelize');
const db = require('../config/database.js');

const Game = db.define('game', {
    name: {
      type: DataTypes.STRING,
    },
    year: {
      type: DataTypes.INTEGER,
    },
    rating: {
      type: DataTypes.INTEGER,
    },
  }, 
  {
    freezeTableName: true,
    timestamps: false,
  }
);

module.exports = Game;
