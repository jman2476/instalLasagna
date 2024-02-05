const { Sequelize } = require("sequelize");
const { User, Recipe, Step, ErrorReport } = require("../models");
const sequelize = require("../config/connection");

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
        res.status(404).send("No recipes for this user");
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

      const newRecipe = await Recipe.create({
        title: recipeTitle,
        os: os,
        description: description,
        creatorID: userId,
      });
      const recipeId = newRecipe.dataValues.id;

      await Step.create({ sequence: 1, content: "", notes: "", recipeId });

      return res.redirect(`/edit_recipe/${recipeId}`);
    } catch (error) {
      console.log(error);
    }
  },

  async buildRecipe(req, res) {
    try {
      // const creatorID = req.session.userId || 1;
      const viewRecipeId = req.params.id; // editing recipe
      const editRecipeId = req.params.editId;

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
        errors: req.errors,
      };

      console.log("sorted Steps:");

      console.log(sortedSteps);
      if (viewRecipeId) {
        return res.render("pages/viewRecipePage", recipeDataToSend);
      } else if (editRecipeId) {
        return res.render("pages/editRecipePage", recipeDataToSend);
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
    const stepData = {
      sequence: -1,
      content: "",
      notes: "",
      recipeId: 1,
    };
    console.log("stepdata");

    console.log(stepData);

    const newStep = await Step.create(stepData);
    res.json({ stepId: newStep.id });
  },
  async deleteRecipe(req, res){
    try{
        const recipeId = req.params.id;

        const transaction = await sequelize.transaction();

        try { 
            // deleting related error reports
            await ErrorReport.destroy({
                where:{
                    recipeId:recipeId
                },
                transaction:transaction
            });

            // delete recipe
            await Recipe.destroy({
            where: {
              id: recipeId,
            },
            transaction:transaction,
          });
        

          await transaction.commit();

        res.redirect('/')

        } catch(err) {
            await transaction.rollback();
            console.log(err);
            res.status(500).send('An error occured while deleting the recipe')
        }

       
    } catch(err){
        console.log(err)
        res.status(500).send('An error occured while deleting the recipe')

    }

  }
};

module.exports = recipeController;
