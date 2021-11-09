const Sequelize = require('sequelize');

// Option 1: Passing parameters separately
// const sequelize = new Sequelize('crud-app', 'root', '1234', {
//   host: 'localhost',
//   dialect: 'mysql',
//   pool: {
//     max: 5,
//     min: 0,
//     acquire: 30000,
//     idle: 10000,
//   },
// });

const sequelize = new Sequelize(
  'mysql://b419b00049aa73:c32864bc@eu-cdbr-west-01.cleardb.com/heroku_b37cf1b032edfd7?reconnect=true'
);

module.exports = sequelize;
