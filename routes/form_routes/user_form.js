const router = require('express').Router()
const {signUpUser, logInUser} = require('../../controllers/user-controller.js')

// pull in the necessary models
const User = require('../../models/User.js')


// create a new user
router.post('/signup', signUpUser(req, res))

// login existing user
router.post('/login', logInUser(req, res))