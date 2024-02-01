const { DataTypes, Model } = require('sequelize');
const sequelize = require('../db/connections');

class ErrorSolution extends Model{}

ErrorSolution.init()

module.exports = ErrorSolution;