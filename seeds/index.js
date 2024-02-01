const seedErrorReports = require('./ErrorReport-seeds');
const seedErrorSolutions = require('./ErrorSolution-seeds');
const seedRecipes = require('./Recipe-seeds');
const seedSteps = require('./Step-seeds');
const seedUsers = require('./User-seeds');

const sequelize = require('../config/connection');

async function seedAll() {
    await sequelize.sync({ force: true });

    await seedUsers();
    console.log('\n----- USERS SEEDED -----\n')

    await seedRecipes();
    console.log('\n----- RECIPES SEEDED -----\n')

    await seedSteps();
    console.log('\n----- STEPS SEEDED -----\n')

    await seedErrorSolutions();
    console.log('\n----- ERROR SOLUTIONS SEEDED -----\n')

    await seedErrorReports();
    console.log('\n----- ERROR REPORTS SEEDED -----\n')

    process.exit(0);
}

seedAll();

