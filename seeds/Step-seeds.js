const { Step, Recipe } = require('../models');
const { faker } = require('@faker-js/faker');



async function generateStepData() {
    const stepSeeds = [];
    const allRecipes = await Recipe.findAll();

    for (const recipe of allRecipes) {
        const numberOfSteps = faker.datatype.number({min: 3, max: 10});

        for(let i = 1; i <= numberOfSteps; i++){
            stepSeeds.push({
                sequence:i,
                content:faker.lorem.paragraph(),
                notes:faker.helpers.arrayElement([faker.lorem.sentence(), null]),
                recipeId: recipe.id,
                status:'confirmed'
            })
        }
    }
    return stepSeeds;
}

async function seedSteps() {
    const steps = await generateStepData();
    try {
        await Step.bulkCreate(steps, { validate:true })
    } catch(err){
        console.log(err);
    }
}

module.exports = seedSteps;