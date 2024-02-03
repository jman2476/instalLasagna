const router = require('express').Router()
const db = require('../../config/connection.js')
const {recipeController} = require('../../controllers');
console.log(recipeController)
const { sendUserRecipes, sendRecipeSteps } = recipeController;
// pull in the necessary models
// const { User, Step, Recipe } = require('../../models')


// router.get('/user_recipes', (req, res) => {sendUserRecipes(req, res)})

router.get('/recipe_steps/:id', sendRecipeSteps)

module.exports = router;