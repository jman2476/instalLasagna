const { Sequelize } = require("sequelize");
const { User, Recipe, Step } = require("../models");


const searchController = {
    showSearchPage(req, res) {
        const recipes = req.session.recipes;
        res.render('pages/search', {
            title: 'Search',
            recipes: recipes,
            errors: req.errors
        })
    },
    async getSearchResult(req, res) {
        console.log(req.body);
        try {
            const searchQuery = req.body.title;
            const recipes = await Recipe.findAll({
                where: {
                    title: {
                        [Sequelize.Op.like]: `%${searchQuery}%`
                    }
                }
            });
            if (!recipes.length) {
                return res.json({
                    error: 404,
                    message: 'No receipe found by that title.'
                });
            }


            const simplifiedRecipes = recipes.map(recipe => recipe.dataValues);
            req.session.recipes = simplifiedRecipes;
            console.log(req.session.recipes)
            res.redirect('/search');

        } catch (err) {
            console.log(err);
            res.json({
                error: 400,
                message: 'There was an error searching for that book'
            })
        }
     
    }
};


module.exports = searchController;