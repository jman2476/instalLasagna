const { ErrorReport, User, Recipe, Step } = require('../models');
const { faker } = require('@faker-js/faker');


async function generateErrorReportData() {
    const errorReportSeeds = [];
    const users = await User.findAll();
    const recipes = await Recipe.findAll();

    if (users.length === 0 || recipes.length == 0) {
        console.log('No users or recipes found. Seed users and recipes first.');
        return;
    }

    for (const user of users){
        for (const recipe of recipes){
            const steps = await Step.findAll({ where: { recipeId: recipe.id } });
            const step = steps.length > 0 ? faker.helpers.arrayElement(steps) : null;


            errorReportSeeds.push({
                description: faker.lorem.sentence(),
                userId: user.id,
                recipeId: recipe.id,
                stepId: step ? step.id : null
            });
        }
    }
    return errorReportSeeds;
}

async function seedErrorReports() {
    const reports = await generateErrorReportData();
    if(!reports) {
        console.log('Error report seeding unsuccessful');
    }
    try {
        await ErrorReport.bulkCreate(reports, { validate: true });
    } catch (err) {
        console.log(err);
    }
}

module.exports = seedErrorReports;