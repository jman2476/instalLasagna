const router = require('express').Router()
const db = require('../db/connections.js')

// pull in the necessary models
const User = require('../../models/User.js')
const Step = require('../../models/Step.js')
const Recipe = require('../../models/Recipe.js')


// Get user info
router.get('/users', async (req, res) => {
    //query the users database, and return all
    try {
        const users = await User.findAll()

        responseObj.json(users)
    } catch (error) {
        console.log(error)
    }
})

// create a new user