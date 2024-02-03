const router = require('express').Router();
const { recipeController } = require('../controllers');
const { getUserRecipes } = recipeController;
// const Models = require('../models');
// const user

//show dashboard
router.get('/', async(req, res) => {
    const recipesData = await getUserRecipes(req, res);
    const recipes = recipesData.recipes;
    console.log(recipes);
    res.render('pages/dashboard' , {
        title: 'InstallLasagna',
        recipes: recipes,
        userId: req.session.userId,
        userName: req.session.userName,
        errors: req.errors
    });
});

// show recipe page
router.get('/recipe', (req, res) => {
    res.render('pages/recipe', {
        title: 'Recipe',
        errors: req.errors
    })
})

// show search page
router.get('/search', (req,res) => {
    res.render('pages/search', {
        title: 'Search',
        errors: req.errors
    })
})

// view sign up page
router.get('/signup', async (req, res) => {
    res.render('pages/signupPage', {
        title: 'Sign up for an account',
        errors: req.session.errors
    })

    // clear errors
    delete req.session.errors
})


// view log in page
router.get('/login', async (req, res) => {
    res.render('pages/loginPage', {
        title: 'Log into your account',
        errors: req.session.errors
    })

    // clear errors
    delete req.session.errors
})


module.exports = router;