const { User, Recipe } = require('../models')


async function getUserRecipes(req, res){
    try {
        const userId = req.params.id

    const userRecipes = await Recipe.findAll({
        where:{ creatorID: userId},
        include:[{
            model: User,
            attributes:['username']
        }]
    })
    if(userRecipes){
        res.render('userRecipes', {recipes: userRecipes.map(recipe => recipe.toJSON())});
    } else {
        res.status(404).send('No recipes for this user');
    }
    console.log('running fxn')
    res.send('yat!')
    } catch (error) {
        console.log(error);
        res.status(500).send('Server Error')
    }
    
}
// const getUserRecipes = async(req, res);


module.exports = { getUserRecipes };