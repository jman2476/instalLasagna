const view = require('./view_routes');
const user = require('./form_routes/user_form')
const step = require('./form_routes/step_form')
const recipeDB = require('./api/recipe_routes')
const searchDB = require('./api/search_routes')
const recipeForm = require('./form_routes/recipe_form')


module.exports = {view, user, step, recipeDB, searchDB, recipeForm };