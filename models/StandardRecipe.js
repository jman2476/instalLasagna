const { DataTypes, Model } = require('sequelize');
const sequelize = require('../db/connections');

class Standard_Recipe extends Model{}

Standard_Recipe.init()


module.exports = Standard_Recipe;