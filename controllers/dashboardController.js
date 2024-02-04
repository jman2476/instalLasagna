const recipeController = require('./recipeController');
const test = require('./')

const dashboardController = {
    async showDashBoardPage(req, res) {
        console.log('recipe contoller')

        console.log(test)
        const recipesData = await recipeController.getUserRecipes(req, res);
        const recipes = recipesData.recipes;
        res.render('pages/dashboard' , {
            title: 'InstallLasagna',
            recipes: recipes,
            userId: req.session.userId,
            userName: req.session.userName,
            errors: req.errors
        });
    }
};


module.exports = dashboardController;