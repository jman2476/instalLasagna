const router = require('express').Router()
const { recipeController } = require('../../controllers');
const { startNewRecipe, createNewRecipe, buildRecipe } = recipeController;

router.post('/new_recipe', startNewRecipe)
// router.get('/create_recipe', createNewRecipe)
// router.get('/edit_recipe', buildRecipe)

module.exports = router;
