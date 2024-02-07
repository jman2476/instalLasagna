const { Sequelize } = require("sequelize");
const { User, Recipe, Step } = require("../models");
const sequelize = require("../config/connection");
const { errorHandler, validateSession } = require("./authController");
const NULL_STEP_RECIPE_ID = 0;
const SYSTEM_CREATOR_ID = 1;
// /api/user_recipes
const recipeController = {
  async getUserRecipes(req, res) {
    try {
      const userId = req.session.userId;
      if(!userId){
        return res.redirect('/login')
      }

      const userRecipes = await Recipe.findAll({
        where: {
          creatorID: userId,
          title: {
            [Sequelize.Op.ne]: 'Blank Step Holder' // Exclude recipes with 'Blank Step Holder' as title
          }
        },
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
      } else {
        console.log("No user recipes found");
      }
    } catch (error) {
      console.log('Get User Recipe has an error', error);
      res.status(500).json({ error: 'Internal Server error' });
    }
  },

  async sendUserRecipes(req, res) {
    // currently not in use
    try {
      const userRecipes = await this.getUserRecipes(req, res);
      if (userRecipes) {
        res.send({ recipes: userRecipes.map((recipe) => recipe.toJSON()) });
      } else {
        res.status(500).send("No recipes for this user");
      }
    } catch (error) {
      console.log('Send User Recipes has an error', error);
      res.status(500).json({ error: 'Internal Server error' });
    }
  },

  async getRecipeSteps(req, res) {
    // currently not in use
    try {
      console.log(`\n\n get recipe steps`);
      const recipeId = req.params.id;
      const stepData = await Step.findAll({
        where: {
          recipeId: recipeId,
        },
      });
      // console.log(stepData);

      if (!stepData.length || stepData === null) {
        res.send("No steps exist for this recipe get recipesteps");
        return;
      }

      res.send(stepData);
    } catch (error) {
      console.log('Get Recipe Steps has an error', error);
      res.status(500).json({ error: 'Internal Server error' });
    }

  },

  async startNewRecipe(req, res) {
    try {
      const { os, recipeTitle } = req.body;
      const userId = req.session.userId;
      const username = req.session.userName;
      const description = "";

      if(!userId){
        return res.redirect('/login')
      }

      const newRecipeData = {
        title: recipeTitle ? recipeTitle : `${username}'s New Recipe`,
        os: os,
        description: description,
        creatorID: userId,
      }

      if (validateSession(req)) {
        const newRecipe = await Recipe.create(newRecipeData);
        const recipeId = newRecipe.dataValues.id;

        console.log(newRecipe);

        return res.render("pages/editRecipePage", {
          recipeId,
          ...newRecipeData,
          errors: req.errors,
          userId: req.session.userId,
          userName: req.session.userName,
        });
      }

      return res.redirect("/login");
    } catch (error) {
      console.log('Start New Recipe has an error', error);
      // res.status(500).json({ error: 'Internal Server error' });
      return res.redirect('/my_recipes')

    }
  },

  async buildRecipe(req, res) {
    try {

      // const creatorID = req.session.userId || 1;
      const viewRecipeId = req.params.id; // editing recipe
      const editRecipeId = req.params.editId;


      if(viewRecipeId){
        console.log('should be viewing the recipe');
        console.log(req.session.userId, req.session.userName,)
      } else {
        console.log('should be editing the recipe');
        console.log(req.session.userId, req.session.userName,)
      }
      // get current user information
      const userIDcurrent = req.session.userId;

      const recipeId = viewRecipeId || editRecipeId;
      console.log(`\n\nId's`);
      console.log(viewRecipeId);
      console.log(editRecipeId);
      console.log(recipeId);
      console.log(`\n\n`);

      const recipeData = await Recipe.findOne({
        where: {
          id: recipeId,
        },
        include:Step
      });

      // CREATE MORE ROBUST ERROR HANDLING

      if (recipeData === null) {
        res.redirect("recipe does not exist");
        return;
      }

      const recipe = recipeData.dataValues;
      const creatorId = recipe.creatorID;
      const boolId = creatorId === userIDcurrent;

      console.log("RECIPE", recipe);

      const stepsData = await Step.findAll({
        where: {
          recipeId: recipeId,
        },
      });

      // if (!stepsData.length || stepsData === null) {
      //   return res.redirect("No steps exist for this recipe build");
      // }

      const sortedSteps = stepsData
        .map((step) => step.dataValues)
        .sort((a, b) => a.sequence - b.sequence);
      const recipeDataToSend = {
        title: recipe.title,
        os: recipe.os,
        steps: sortedSteps,
        recipeId: recipeId,
        boolId: boolId,
        errors: req.errors,
        userId: req.session.userId,
        userName: req.session.userName,
      };

      console.log("sorted Steps:");

      console.log(sortedSteps);
      if (editRecipeId && boolId) {
        return res.render("pages/editRecipePage", recipeDataToSend);
      } else {
        return res.render("pages/viewRecipePage", recipeDataToSend);
      }
    } catch (error) {
      console.log('Build Recipe has an error',error);
      res.status(500).json({ error: 'Internal Server error' });

    }
  },
  async updateRecipe(req, res) {
   
    // const { id } = req.params;
    const {steps, recipeId} = req.body;
    const t = await sequelize.transaction();
    console.log("Update");
    
    try {
     await Step.destroy({ where: { recipeId } }, { transaction: t });
      for(const step of steps){
        await Step.create({ ...step, recipeId }, { transaction: t })
      }
      const recipeData = await Recipe.findOne({
        where: {
          id: recipeId,
        },
        include:Step
      });
console.log(recipeData)

      await t.commit()
      return res.send('success');

    } catch (err) {
      await t.rollback();
      console.log('Update Recipe has an error',err);
      res.status(500).json({ error: 'Internal Server error' });

    }
  },
  async createNewStep(req, res) {
    try {
      // need to create a system user
      const systemUser = await User.findOne({
        where: {
          username: 'system'
        }
      })

      await recipeController.ensureNullStepRecipeExists();
      const stepData = {
        sequence: -1,
        content: "",
        notes: "",
        recipeId: systemUser.id,
      };
      console.log("stepdata");

      console.log(stepData);

      const newStep = await Step.create(stepData);
      res.json({ stepId: newStep.id });
    } catch (err) {
      console.log("Create New Step has an error", err);
      res.status(500).json({ error: 'Internal Server error' });

    }
  },
  async deleteRecipe(req, res) {
    try {
      const recipeId = req.params.id;

      const transaction = await sequelize.transaction();

      try {
        // deleting related error reports
        await Step.destroy({
          where: {
            recipeId: recipeId,
          },
          transaction: transaction,
        });

        // delete recipe
        await Recipe.destroy({
          where: {
            id: recipeId,
          },
          transaction: transaction,
        });

        await transaction.commit();

        res.redirect("/my-recipes");
      } catch (err) {
        await transaction.rollback();
        console.log(err);
        res.status(500).send("An error occured while deleting the recipe");
      }
    } catch (err) {
      console.log(err);
      res.status(500).send("An error occured while deleting the recipe");
    }
  },
  handleDelete(req, res) {
    res.redirect("/");
  },
  async getAllRecipes() {
    try {
      const allRecipes = await Recipe.findAll({
        where: {
          title: {
            [Sequelize.Op.ne]: 'Blank Step Holder' // Exclude recipes with 'Blank Step Holder' as title
          }
        }, include: [
          {
            model: User,
            attributes: ["id", "username"], // creator id and creator username
          },
        ],
      });

      if (allRecipes.length) {
        // res.render('pages/allRecipesPage', {

        // })
        return {
          recipes: allRecipes.map((recipe) => recipe.get({ plain: true })),
        };
      } else {
        console.log("No user recipes found");
      }
    } catch (error) {
      console.log('Handle Delete has an error',error);
      res.status(500).json({ error: 'Internal Server error' });

    }
  },
  async ensureNullStepRecipeExists() {
    try {
      // need to create a system user
      const systemUser = await User.findOne({
        where: {
          username: 'system'
        }
      })
      systemUser.id;

      console.log(`\n\n\n\n\n\n\n\n\nn\n\n\n system user`)
      console.log(systemUser)

      let nullStepRecipe = await Recipe.findOne({
        where:{
          title: "Blank Step Holder"
        }
      });


      console.log(nullStepRecipe)

      if (!nullStepRecipe) { // if null step doesnt exist, create one
        console.log('making Null Step Recipe by System...')
        nullStepRecipe = await Recipe.create({
          title: "Blank Step Holder",
          description: "This recipe holds blank steps to send to recipe builder",
          os: "",
          creatorID: systemUser.id,
          published: false,
        });
      }
      console.log(nullStepRecipe)
      return nullStepRecipe;
    } catch (err) {
      console.log('Could not create Null Step Recipe', err)
      res.status(500).json({ error: 'Internal Server error' });

    }

  },
};

module.exports = recipeController;
