const router = require('express').Router()
const { recipeController } = require('../../controllers');
const { startNewRecipe } = recipeController;

router.post('/new_recipe', startNewRecipe)

module.exports = router
