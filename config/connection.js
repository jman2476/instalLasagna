const { Sequelize } = require('sequelize');
const JAWS_URL = process.env.JAWSDB_URL;

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