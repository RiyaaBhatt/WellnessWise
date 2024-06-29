const { DataTypes, Model } = require('sequelize');
const sequelize = require('../config/database');

class Nutrition extends Model {}

Nutrition.init({
  name: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
  calories: {
    type: DataTypes.FLOAT,
    allowNull: false,
  },
  protein: {
    type: DataTypes.FLOAT,
    allowNull: false,
  },
  carbohydrates: {
    type: DataTypes.FLOAT,
    allowNull: false,
  },
  fats: {
    type: DataTypes.FLOAT,
    allowNull: false,
  },
  fiber: {
    type: DataTypes.FLOAT,
    allowNull: true,
  },
  vitamins: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  minerals: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  recipe: {
    type: DataTypes.STRING,
    allowNull: false,
  }
}, {
  sequelize,
  modelName: 'Nutrition',
});

module.exports = Nutrition;
