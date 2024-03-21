const { model, Schema } = require('mongoose')

const recipeSchema = new Schema(

)

const Recipe = model('Recipe', recipeSchema)

module.exports = Recipe