const router = require('express').Router()
const { recipeController } = require('../../controllers');

router.post('/new_recipe', recipeController.startNewRecipe)
// router.get('/create_recipe', recipeController.createNewRecipe)
// router.get('/edit_recipe', recipeController.buildRecipe)

module.exports = router;
