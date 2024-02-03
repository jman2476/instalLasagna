const { User, Recipe } = require('../models')

// /api/user_recipes
async function getUserRecipes(req, res) {
    try {
        const userId = req.session.userId || 1;

        const userRecipes = await Recipe.findAll({
            where: { creatorID: userId },
            include: [{
                model: User,
                attributes: ['username']
            }]
        })
        if (userRecipes) {
            return { recipes: userRecipes.map(recipe => recipe.get({plain: true})) };
            // res.send({recipes: userRecipes.map(recipe => recipe.toJSON())});
        } else {
            console.log('No user recipes found')
        }
    } catch (error) {
        console.log(error)
    }
}

async function sendUserRecipes(req, res) {
    try {
        const userRecipes = await getUserRecipes(req, res);
        if (userRecipes) {
            res.send({ recipes: userRecipes.map(recipe => recipe.toJSON()) });
        } else {
            res.status(404).send('No recipes for this user');
        }
    } catch (error) {
        console.log(error)
    }
    // console.log('running fxn')
    // res.send('yat!')
}
// const getUserRecipes = async(req, res);

async function createNewRecipe(req, res){
    try {
        const creatorID = req.session.userId || 1;

            

    } catch (error) {

    }

}


module.exports = { getUserRecipes };