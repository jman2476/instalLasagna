const router = require('express').Router()
const {signUpUser, logInUser} = require('../../controllers/authController.js')

// pull in the necessary models
const User = require('../../models/User.js')


// create a new user
router.post('/signup', signUpUser)

// login existing user
router.post('/login', logInUser)

// export router

module.exports = router;