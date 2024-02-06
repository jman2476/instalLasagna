const { Sequelize } = require('sequelize');
const JAWS_URL = process.env.JAWSDB_URL;
// const JAWS_URL = 'mysql://df8ug3vp7hnu1lb0:xq4eafk9yfpo55lf@s0znzigqvfehvff5.cbetxkdyhwsb.us-east-1.rds.amazonaws.com:3306/czhtlxrp3s718ti9';

require('dotenv').config();

  const sequelize = JAWS_URL ? new Sequelize(JAWS_URL) : new Sequelize(
    process.env.DB_DATABASE_NAME,
    process.env.DB_USER,
    process.env.DB_PASSWORD || '', 
    {
      host: process.env.DB_HOST_URL,
      dialect: 'mysql'
    }
  );

  module.exports = sequelize;