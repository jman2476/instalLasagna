const { DataTypes, Model } = require('sequelize');
const sequelize = require('../db/connections');

class User extends Model{}

User.init()

module.exports = User;