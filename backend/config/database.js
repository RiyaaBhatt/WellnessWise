const { Sequelize } = require('sequelize');

const sequelize = new Sequelize({
  dialect: 'sqlite',
  storage: './Diet.sqlite',
});

module.exports = sequelize;
