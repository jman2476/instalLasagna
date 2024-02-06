const { Sequelize } = require("sequelize");
const { User, Recipe, Step } = require("../models");


const searchController = {
    showSearchPage(req, res) {
        try {
            const recipes = req.session.recipes;

            res.render('pages/search', {
                title: 'Search',
                recipes: recipes,
                errors: req.errors,

            })
        } catch (error) {
            console.log('Show search Page has an error', error);
            res.status(500).json({ error: 'Internal Server error' });
        }

    },
    async getSearchResult(req, res) {
        console.log(req.body);
        try {
            const searchQuery = req.body.title;
            const recipes = await Recipe.findAll({

                where: {
                    title: {
                        [Sequelize.Op.like]: `%${searchQuery}%`,
                        [Sequelize.Op.ne]: 'Blank Step Holder'
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
            res.render('pages/search', {
                title: 'Search',
                recipes: simplifiedRecipes,
                errors: req.errors,
                query: searchQuery

            })

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