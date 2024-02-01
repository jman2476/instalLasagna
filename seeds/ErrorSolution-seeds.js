const { ErrorSolution, Recipe } = require('../models');
const faker = require('faker');

async function generateErrorSolutionData() {
    const errorSolutionSeeds = [];
    const recipes = await Recipe.findAll();

    if(recipes.length === 0) {
        console.log('No recipes found. Seed recipes first.');
        return;
    }

    const numberOfSolutions = 20;

    for (let i = 0; i < numberOfSolutions; i++) {
        const linkToRecipe = faker.datatype.boolean();

        if(linkToRecipe && recipes.length > 0) {

            const randomRecipeIndex = faker.datatype.number({ min:0, max:recipes.length - 1 });
            errorSolutionSeeds.push({
                content: `See solution recipe: ${recipes[randomRecipeIndex].title}`,
                recipeId:  recipes[randomRecipeIndex].id
            })
        } else {
            errorSolutionSeeds.push({
                content: faker.lorem.paragraph(),
                recipeId:null
            });
        }
        
    }
    return errorSolutionSeeds;
}

async function seedErrorSolutions() {
    const solutions = await generateErrorSolutionData();
    if(!solutions) {
        console.log('Error solution seeding unsuccesful');
        return;
    }
    try {
        await ErrorSolution.bulkCreate(solutions, { validate: true });
    } catch (err) {
        console.log(err);
    }
}

module.exports = seedErrorSolutions;