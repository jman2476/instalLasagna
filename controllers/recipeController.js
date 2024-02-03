const { User, Recipe, Step } = require('../models')

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


async function startNewRecipe(req, res){

    try {
        const { os, recipeTitle } = req.body;
    const userId = req.session.userId || 1;
    const description = '';

    const newRecipe = await Recipe.create({
        title:recipeTitle, 
        os:os, 
        description:description, 
        creatorID:userId});
    console.log(os, recipeTitle);
    const recipeId = newRecipe.dataValues.id;

    await Step.create({ sequence:1, content:'', notes:'', recipeId })

    return res.redirect(`/edit_recipe?recipeId=${recipeId}`);
    } catch (error) {
        console.log(error)
    }
    
}

async function createNewRecipe(req, res){
    // console.log('wdajknd')
    try {
        // const creatorID = req.session.userId || 1;
        const recipeId = req.query.recipeId;
        console.log(recipeId);

        const recipeData = await Recipe.findOne({
            where:{
                id:recipeId
            }
        })
        const recipe = recipeData.dataValues;

        // if recipe has steps, redirect to edit_recipe?recipeId=
        const steps = await Step.findAll({
            where:{
                recipeId
            }
        })

        if(steps.length){
            return;
        } else {
            const step = await Step.create({ sequence:1, content:'', notes:'', recipeId })

            console.log(recipe)
            console.log(step);
    
            res.render('pages/editRecipePage', {
                        title: recipe.title,
                        os:recipe.os,
                        errors: req.errors
                    })
        }

        
    } catch (error) {
        console.log(error)
    }
}
// We want to render the steps and workout how to edit it

async function buildRecipe(req, res){
    try {
        // const creatorID = req.session.userId || 1;
        const recipeId = req.query.recipeId;
        console.log(recipeId);

        const recipeData = await Recipe.findOne({
            where:{
                id:recipeId
            }
        })


        console.log(recipeData);

        // CREATE MORE ROBUST ERROR HANDLING

        if(recipeData === null){
            res.redirect('recipe does not exist') 
            return;
        }

        const recipe = recipeData.dataValues;

        const stepData = await Step.findAll({
            where:{
                recipeId:recipeId
            }
        })

        if(!stepData.length || stepData === null){
            res.redirect('No steps exist for this recipe') 
            return;
        }

        const steps = stepData.dataValues;


        
    
            res.render('pages/editRecipePage', {
                        title: recipe.title,
                        os:recipe.os,
                        errors: req.errors
                    })
        

        
    } catch (error) {
        console.log(error)
    }
}
async function editRecipe(req, res){
res.send('hello')
}
// edit recipe will be on clientside for dynamic building
// edit recipe, u can tell if person can edit if creator id matches userid

// view recipe will be serverside and will render from handlebars
module.exports = { sendUserRecipes, getUserRecipes, createNewRecipe, startNewRecipe, buildRecipe, editRecipe};