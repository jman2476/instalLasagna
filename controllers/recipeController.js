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
      const userId = req.session.userId || 2;

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
      } else {
        console.log("No user recipes found");
      }
    } catch (error) {
      console.log(error);
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
      console.log(error);
    }
  },

  async getRecipeSteps(req, res) {
    // currently not in use
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
  },

  async startNewRecipe(req, res) {
    try {
      const { os, recipeTitle } = req.body;
      const userId = req.session.userId || 1;
      const description = "";

      if (recipeTitle === "") return;

      if (validateSession(req)) {
        const newRecipe = await Recipe.create({
          title: recipeTitle,
          os: os,
          description: description,
          creatorID: userId,
        });
        const recipeId = newRecipe.dataValues.id;

        await Step.create({ sequence: 1, content: "", notes: "", recipeId });

        return res.redirect(`/edit_recipe/${recipeId}`);
      }

      return res.redirect("/");
    } catch (error) {
      console.log(error);
    }
  },

  async buildRecipe(req, res) {
    try {
      // const creatorID = req.session.userId || 1;
      const viewRecipeId = req.params.id; // editing recipe
      const editRecipeId = req.params.editId;

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

      if (!stepsData.length || stepsData === null) {
        res.send("No steps exist for this recipe build");
        return;
      }

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
      };

      console.log("sorted Steps:");

      console.log(sortedSteps);
      if (editRecipeId && boolId) {
        return res.render("pages/editRecipePage", recipeDataToSend);
      } else {
        return res.render("pages/viewRecipePage", recipeDataToSend);
      }
    } catch (error) {
      console.log(error);
    }
  },
  async updateRecipe(req, res) {
    const { id } = req.params;
    const { steps } = req.body;
    console.log("Update");

    console.log(steps);
    try {
      let formStepIds = steps.filter((step) => step.id).map((step) => step.id);

      for (const formStep of steps) {
        if (formStep.id) {
          await Step.update(formStep, { where: { id: formStep.id } });
        } else {
          const newStep = await Step.create({ ...formStep, recipeId: id });
          formStepIds.push(newStep.id);
        }
      }

      console.log(`\n\n\n  ------------------ UPDATED`);
      console.log(formStepIds);
      await Step.destroy({
        where: {
          recipeId: id,
          id: { [Sequelize.Op.notIn]: formStepIds },
        },
      });

      const updatedSteps = await Step.findAll({ where: { recipeId: id } });

      console.log(updatedSteps);

      return res.redirect(`/view_recipe/${id}`);
    } catch (err) {
      console.log(err);
    }
  },
  async createNewStep(req, res) {
    try {
        // need to create a system user
        const systemUser = await User.findOne({
          where:{
            username:'system'
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
      console.log("Failed to create Null Step", err);
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
        include: [
          {
            model: User,
            attributes: ["username"], // creator id and creator username
          },
        ],
      });
      if (allRecipes.length) {
        return {
          recipes: allRecipes.map((recipe) => recipe.get({ plain: true })),
        };
      } else {
        console.log("No user recipes found");
      }
    } catch (error) {
      console.log(error);
    }
  },
  async ensureNullStepRecipeExists() {



    try{
    // need to create a system user
    const systemUser = await User.findOne({
      where:{
        username:'system'
      }
    })
     systemUser.id;
    
    console.log(`\n\n\n\n\n\n\n\n\nn\n\n\n system user`)
    console.log(systemUser)

    let nullStepRecipe = await Recipe.findByPk(NULL_STEP_RECIPE_ID);
    
    
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
    } catch(err){
      console.log('Could not create Null Step Recipe', err)
    }

  },
};

module.exports = recipeController;
