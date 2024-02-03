const { Recipe, User } = require('../models');
const { faker } = require('@faker-js/faker');


async function generateRecipeData() {
    const recipeSeeds = [];
    const users = await User.findAll();

    if(users.length === 0) {
        console.log('No users found. Seed users first');
        return;
    }

    for (const user of users) {
        const numberOfRecipes = faker.datatype.number({ min:3, max: 5});

        for(let i = 0; i < numberOfRecipes; i++) {
            recipeSeeds.push({
                title: faker.lorem.words(),
                os: faker.helpers.arrayElement(['Windows', 'macOS', 'Linux', null]),
                description: faker.lorem.paragraph(),
                creatorID: user.id
            });
        }
    }
    return recipeSeeds;
}

async function seedRecipes() {
    const recipes = await generateRecipeData();
    await Recipe.bulkCreate(recipes, { validate: true });
}

module.exports = seedRecipes;