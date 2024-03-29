const { DataTypes } = require('sequelize');
const db = require('../config/database.js');
const User = db.define(
  'user',
  {
    // Model attributes are defined here
    username: {
      type: DataTypes.STRING,
    },
    password: {
      type: DataTypes.STRING,
      // allowNull defaults to true
    },
  },
  {
    freezeTableName: true,
    timestamps: false,
    // Other model options go here
  }
);

module.exports = User;
