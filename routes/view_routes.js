// get mods
const router = require('express').Router();
const { recipeController, dashboardController, searchController, authController } = require('../controllers');

//show dashboard
router.get('/', dashboardController.showDashBoardPage);

// show recipe page
router.get('/view_recipe/:id', recipeController.buildRecipe);

// show edit recipe page
router.get('/edit_recipe/:editId', recipeController.buildRecipe);

// show search page
router.get('/search', searchController.showSearchPage);

// show sign up page
router.get('/signup', authController.showSignUpPage);

// show log in page
router.get('/login', authController.showLoginPage);


module.exports = router;