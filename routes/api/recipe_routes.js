const router = require('express').Router()
const db = require('../../config/connection.js')
const {recipeController} = require('../../controllers');
// pull in the necessary models
// const { User, Step, Recipe } = require('../../models')

// REMEMBER: THESE URLS ARE PREFIXED WITH /api

// router.get('/user_recipes', (req, res) => {sendUserRecipes(req, res)})

// router.get('/recipes/:id', recipeController.getRecipeSteps);

router.put('/recipe/update', recipeController.updateRecipe);

// router.get('/recipes/new_step', recipeController.createNewStep)

router.delete('/recipes/:id/delete', recipeController.deleteRecipe)

// router.post('/recipe/new', recipeController.startNewRecipe)

module.exports = router;

// so right now we need to set up put route and new
// mthd in recipecontroller to update recipe with new steps
