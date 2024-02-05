const recipeController = require('./recipeController');
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
        const recipesData = await recipeController.getAllRecipes(req, res);
        const recipes = recipesData.recipes;
        res.render('pages/allRecipesPage' , {
            title: 'All Recipes',
            header: 'All Recipes',
            userId: req.session.userId,
            userName: req.session.userName,
            recipes: recipes,
            errors: req.errors,
            // creatorName: ,
            // creatorId: 
        });
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