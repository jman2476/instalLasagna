const router = require('express').Router()
const { authController } = require('../../controllers')


// create a new user
router.post('/signup', authController.signUpUser)

// login existing user
router.post('/login', authController.logInUser)

// logout user

router.get('/logout', authController.logoutUser)

// export router

module.exports = router;