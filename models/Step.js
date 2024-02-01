const { DataTypes, Model } = require('sequelize');
const sequelize = require('../db/connections');

class Step extends Model{}

Step.init()

module.exports = Step;