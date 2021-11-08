const { Sequelize, DataTypes } = require('sequelize');
const db = require('../config/database.js');
const Game = db.define(
  'game',
  {
    // Model attributes are defined here
    name: {
      type: DataTypes.STRING,
    },
    year: {
      type: DataTypes.INTEGER,
      // allowNull defaults to true
    },
    rating: {
      type: DataTypes.INTEGER,
      // allowNull defaults to true
    },
  },
  {
    freezeTableName: true,
    timestamps: false,
    // Other model options go here
  }
);

module.exports = Game;
