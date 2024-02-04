const router = require('express').Router()
const {signUpUser, logInUser, logoutUser} = require('../../controllers/authController.js')

// pull in the necessary models
const User = require('../../models/User.js')


// create a new user
router.post('/signup', signUpUser)

// login existing user
router.post('/login', logInUser)

router.get('/logout', logoutUser)

// export router

module.exports = router;