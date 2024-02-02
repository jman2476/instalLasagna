const router = require('express').Router()
const db = require('../../config/connection.js')
const {getUserRecipes} = require('../../controllers')
// pull in the necessary models
// const { User, Step, Recipe } = require('../../models')


router.get('/user_recipes', (req, res) => getUserRecipes(req, res))


module.exports = router;