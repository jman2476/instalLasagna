// get mods
const router = require('express').Router();
const { recipeController, dashboardController, searchController, authController } = require('../controllers');

console.log(`\n\n\nrecipe`)
console.log(recipeController)
console.log(`\n\n\nrecipe`)

//show dashboard
router.get('/', dashboardController.showAllRecipes);

router.get('/my_recipes', dashboardController.showMyRecipes) 

router.get('/all_recipes', dashboardController.showAllRecipes) 

router.get('/new_recipe', dashboardController.newRecipe)

// show recipe page
router.get('/view_recipe/:id', recipeController.buildRecipe);

// show edit recipe page
// router.get('/edit_recipe/:editId', recipeController.buildRecipe);
router.post('/recipe/new', recipeController.startNewRecipe)


// show search page
router.get('/search', searchController.showSearchPage);

router.get('/delete', recipeController.handleDelete)

// show sign up page
router.get('/signup', authController.showSignUpPage);

// show log in page
router.get('/login', authController.showLoginPage);


module.exports = router;