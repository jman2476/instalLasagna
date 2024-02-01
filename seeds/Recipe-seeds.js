const { Recipe, User } = require('../models');
const faker = require('faker');

async function generateRecipeData() {
    const recipeSeeds = [];
    const users = await User.findAll();

    if(users.length === 0) {
        console.log('No users found. Seed users first');
        return;
    }

    for (const user of users) {
        const numberOfRecipes = faker.datatype.number({ min:1, max: 5});

        for(let i = 0; i < numberOfRecipes; i++) {
            recipeSeeds.push({
                title: faker.lorem.words(),
                description: faker.lorem.paragraph(),
                userId: user.id
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