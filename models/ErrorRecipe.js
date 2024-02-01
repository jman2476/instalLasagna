const { DataTypes, Model } = require('sequelize');
const sequelize = require('../db/connections');

class ErrorRecipe extends Model{}

ErrorRecipe.init()

module.exports = ErrorRecipe;