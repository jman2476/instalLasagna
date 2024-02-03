const { User, Recipe, Step } = require("../models");

// /api/user_recipes
async function getUserRecipes(req, res) {
    try {
        const userId = req.session.userId || 1;

        const userRecipes = await Recipe.findAll({
            where: { creatorID: userId },
            include: [
                {
                    model: User,
                    attributes: ["username"],
                },
            ],
        });
        if (userRecipes) {
            return {
                recipes: userRecipes.map((recipe) => recipe.get({ plain: true })),
            };
            // res.send({recipes: userRecipes.map(recipe => recipe.toJSON())});
        } else {
            console.log("No user recipes found");
        }
    } catch (error) {
        console.log(error);
    }
}

async function sendUserRecipes(req, res) {
    console.log(req);
    try {
        const userRecipes = await getUserRecipes(req, res);
        if (userRecipes) {
            res.send({ recipes: userRecipes.map((recipe) => recipe.toJSON()) });
        } else {
            res.status(404).send("No recipes for this user");
        }
    } catch (error) {
        console.log(error);
    }
    // console.log('running fxn')
    // res.send('yat!')
}

async function getRecipeSteps(req, res) {
    const recipeId = req.params.id;
    const stepData = await Step.findAll({
        where: {
            recipeId: recipeId,
        },
    });
    // console.log(stepData);

    if (!stepData.length || stepData === null) {
        res.send("No steps exist for this recipe");
        return;
    }

    // const steps = stepData.dataValues;
    // console.log(steps)
    res.send(stepData);
}



async function startNewRecipe(req, res) {
    try {
        const { os, recipeTitle } = req.body;
        const userId = req.session.userId || 1;
        const description = "";

        const newRecipe = await Recipe.create({
            title: recipeTitle,
            os: os,
            description: description,
            creatorID: userId,
        });
        console.log(os, recipeTitle);
        const recipeId = newRecipe.dataValues.id;

        await Step.create({ sequence: 1, content: "", notes: "", recipeId });

        return res.redirect(`/edit_recipe?recipeId=${recipeId}`);
    } catch (error) {
        console.log(error);
    }
}

// We want to render the steps and workout how to edit it

async function buildRecipe(req, res) {
    try {
        // const creatorID = req.session.userId || 1;
        const recipeId = req.query.recipeId;
        console.log(recipeId);

        const recipeData = await Recipe.findOne({
            where: {
                id: recipeId,
            },
        });

        console.log(recipeData);

        // CREATE MORE ROBUST ERROR HANDLING

        if (recipeData === null) {
            res.redirect("recipe does not exist");
            return;
        }

        const recipe = recipeData.dataValues;

        const stepsForRecipe = await Step.findAll({
            where: {
                recipeId: recipeId,
            },
        });

        if (!stepsForRecipe.length || stepsForRecipe === null) {
            res.redirect("No steps exist for this recipe");
            return;
        }

        res.render("pages/editRecipePage", {
            steps: stepsForRecipe,
            title: recipe.title,
            os: recipe.os,
            recipeId:recipeId,
            errors: req.errors,
        });
    } catch (error) {
        console.log(error);
    }
}
async function editRecipe(req, res) {
    res.send("hello");
}

async function showRecipePage(req, res) {
    const recipeId = req.params.id;

    const recipeData = await Recipe.findOne({
        where: {
            id: recipeId,
        },
    });

    // CREATE MORE ROBUST ERROR HANDLING

    if (recipeData === null) {
        res.redirect("recipe does not exist");
        return;
    }

    const recipe = recipeData.dataValues;

    const stepData = await Step.findAll({
        where: {
            recipeId: recipeId,
        },
    });
    // console.log(stepData);

    if (!stepData.length || stepData === null) {
        res.send("No steps exist for this recipe");
        return;
    }

    const steps = stepData.map(step => step.dataValues);

    console.log(steps);
    res.render('pages/viewRecipePage', {
        title: recipe.title,
        os:recipe.os,
        steps:steps,
        recipeId:recipeId,
        errors: req.errors
    })
}

// edit recipe will be on clientside for dynamic building
// edit recipe, u can tell if person can edit if creator id matches userid

// view recipe will be serverside and will render from handlebars
module.exports = {
    showRecipePage,
    getRecipeSteps,
    sendUserRecipes,
    getUserRecipes,
    startNewRecipe,
    buildRecipe,
    editRecipe,
};
