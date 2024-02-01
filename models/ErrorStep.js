const { DataTypes, Model } = require('sequelize');
const sequelize = require('../db/connections');

class ErrorStep extends Model{}

ErrorStep.init()

module.exports = ErrorStep;