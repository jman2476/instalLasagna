const router = require('express').Router()
const db = require('../../config/connection.js')
const {recipeController} = require('../../controllers');
// pull in the necessary models
// const { User, Step, Recipe } = require('../../models')


// router.get('/user_recipes', (req, res) => {sendUserRecipes(req, res)})

// router.get('/recipes/:id', recipeController.getRecipeSteps);

router.post('/recipes/:id/update', recipeController.updateRecipe);

router.get('/recipes/new_step', recipeController.createNewStep)

module.exports = router;