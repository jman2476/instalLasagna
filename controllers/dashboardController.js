const recipeController = require('./recipeController');
const test = require('./')

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
    async showMyRecipes() {

        const recipesData = await recipeController.getAllRecipes(req, res);
        const recipes = recipesData.recipes;
        res.render('pages/all_recipes' , {
            title: 'All Recipes',
            header: 'All Recipes',
            recipes: recipes,
            errors: req.errors
        });
    },
    async showAllRecipes() {
        const recipesData = await recipeController.getAllRecipes(req, res);
        const recipes = recipesData.recipes;
        res.render('pages/all_recipes' , {
            title: 'All Recipes',
            header: 'All Recipes',
            recipes: recipes,
            errors: req.errors
        });
     }
};


module.exports = dashboardController;