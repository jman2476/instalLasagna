const recipeController = require('./recipeController');

const { Recipe, User } = require('../models')

const dashboardController = {
    async showDashBoardPage(req, res) {
        try {
            const recipesData = await recipeController.getUserRecipes(req, res);
            const recipes = recipesData.recipes;
            res.render('pages/dashboard', {
                title: 'InstallLasagna',
                recipes: recipes,
                userId: req.session.userId,
                userName: req.session.userName,
                errors: req.errors
            });
        } catch (error) {
            console.log('Show Dashboard Page has an error', error);
            res.status(500).json({ error: 'Internal Server error' });
        }

    },
    async showMyRecipes(req, res) {
        try {
            const recipesData = await recipeController.getUserRecipes(req, res);


            // const recipes = recipesData.recipes;
            return res.render('pages/dashboard', {
                title: 'Showing search result',
                header: 'Showing search result',
                userId: req.session.userId,
                userName: req.session.userName,
                recipes: recipesData ? recipesData.recipes : [],
                errors: req.errors
            });
        } catch (error) {
            console.log('Show my Recipes has an error', error);
           return res.status(500).json({ error: 'Internal Server error' });
            // res.redirect('/my_recipes')
        }

    },
    async showAllRecipes(req, res) {
        try { // 
            const recipesData = await Recipe.findAll({
                include: User
            })
            // if single obj get 
            // if array map over and get plain true for each
            // const recipes = recipesData.recipes;
            res.render('pages/allRecipesPage', {
                title: 'All Recipes',
                header: 'All Recipes',
                userId: req.session.userId,
                userName: req.session.userName,
                recipes: recipesData && recipesData.map(r => r.get({ plain: true })),
                errors: req.errors
            });
        } catch (error) {
            console.log('Show all Recipes has an error', error);
        }

    },
    async newRecipe(req, res) {
        res.render('pages/newRecipePage', {
            title: 'New Recipe',
            userId: req.session.userId,
            userName: req.session.userName,
            class: 'glow'
        })
    }
};


module.exports = dashboardController;