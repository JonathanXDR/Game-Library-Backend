const { DataTypes } = require('sequelize');
const db = require('../config/database.js');

const User = db.define('user', {
    username: {
      type: DataTypes.STRING,
    },
    password: {
      type: DataTypes.STRING,
    },
  }, 
  {
    freezeTableName: true,
    timestamps: false,
  }
);

module.exports = User;
