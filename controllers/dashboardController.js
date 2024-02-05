const recipeController = require('./recipeController');

const { Recipe, User } = require('../models')

const dashboardController = {
    async showDashBoardPage(req, res) {
        const recipesData = await recipeController.getUserRecipes(req, res);
        const recipes = recipesData.recipes;
        res.render('pages/dashboard' , {
            title: 'InstallLasagna',
            recipes: recipes,
            userId: req.session.userId,
            userName: req.session.userName,
            errors: req.errors
        });
    },
    async showMyRecipes(req, res) {
        const recipesData = await recipeController.getUserRecipes(req, res);
        const recipes = recipesData.recipes;
        res.render('pages/dashboard' , {
            title: 'My Recipes',
            header: 'My Recipes',
            userId: req.session.userId,
            userName: req.session.userName,
            recipes: recipes,
            errors: req.errors
        });
    },
    async showAllRecipes(req, res) {
        try{ // 
            const recipesData = await Recipe.findAll({
                include: User
            })
            // if single obj get 
            // if array map over and get plain true for each
            // const recipes = recipesData.recipes;
            res.render('pages/allRecipesPage' , {
                title: 'All Recipes',
                header: 'All Recipes',
                userId: req.session.userId,
                userName: req.session.userName,
                recipes: recipesData && recipesData.map(r => r.get({ plain: true})),
                errors: req.errors
            });
        } catch(err){
            console.log(err)
        }

     },
     async newRecipe(req, res) {
        res.render('pages/newRecipePage', {
            title:'New Recipe',
            userId: req.session.userId,
            userName: req.session.userName,
            class: 'glow'

        })
     }
};


module.exports = dashboardController;