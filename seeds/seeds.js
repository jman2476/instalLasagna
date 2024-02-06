const { Sequelize } = require('sequelize');

const seedErrorReports = require('./ErrorReport-seeds');
const seedErrorSolutions = require('./ErrorSolution-seeds');
const seedRecipes = require('./Recipe-seeds');
const seedSteps = require('./Step-seeds');
const seedUsers = require('./User-seeds');
const seedSystem = require('./User-seeds')

// seed system 

const seedProduction = false; // IF TRUE IT WILL UPDATE HEROKU SQL DB

const sequelize = seedProduction ? new Sequelize('mysql://df8ug3vp7hnu1lb0:xq4eafk9yfpo55lf@s0znzigqvfehvff5.cbetxkdyhwsb.us-east-1.rds.amazonaws.com:3306/czhtlxrp3s718ti9'): require('../config/connection');

async function seedAll() {
    // if(!seedProduction){
    //     await sequelize.query('DROP DATABASE install_lasagna_db');
    //     await sequelize.query('CREATE DATABASE install_lasagna_db');
    //     await sequelize.query('USE install_lasagna_db');
    
    // }
    await sequelize.sync({ force: true });

    await seedSystem()
    console.log('\n----- SYSTEM SEEDED -----\n')


    await seedUsers();
    console.log('\n----- USERS SEEDED -----\n')

    await seedRecipes();
    console.log('\n----- RECIPES SEEDED -----\n')

    await seedSteps();
    console.log('\n----- STEPS SEEDED -----\n')

    
  


    // await seedErrorSolutions();
    // console.log('\n----- ERROR SOLUTIONS SEEDED -----\n')

    // await seedErrorReports();
    // console.log('\n----- ERROR REPORTS SEEDED -----\n')

    process.exit(0);
}

seedAll();

