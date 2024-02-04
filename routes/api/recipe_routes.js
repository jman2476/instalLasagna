const router = require('express').Router()
const db = require('../../config/connection.js')
const {recipeController} = require('../../controllers');
const { sendUserRecipes, getRecipeSteps, updateRecipe, createNewStep } = recipeController;
// pull in the necessary models
// const { User, Step, Recipe } = require('../../models')


// router.get('/user_recipes', (req, res) => {sendUserRecipes(req, res)})

// router.get('/recipes/:id', getRecipeSteps);

router.post('/recipes/:id/update', updateRecipe);

router.get('/recipes/new_step', createNewStep)

module.exports = router;