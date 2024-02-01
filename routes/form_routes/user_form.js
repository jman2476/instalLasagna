const router = require('express').Router()
const db = require('../db/connections.js')

// pull in the necessary models
const User = require('../../models/User.js')
const Step = require('../../models/Step.js')
const Recipe = require('../../models/Recipe.js')


// create a new user
router.post('/signup', async(req,res) =>{
    try {
        const user = await User.create(req.body)

        req.session.user_id = user.id

        res.redirect('/')
    } catch (error) {
        console.log(error)
    }
})

// login existing user
router.post('/login', async (req, res) => {
    const {email, password} = req.body

    try {
        const user = await User.findOne({
            where: {
                email: email
            }
        })

        if (!user) {
            req.session.errors = ['No users with that email address']

            return res.redirect('/')
        }

        // validate password
        const valid_pass = await user.validatePass(password)

        if(!valid_pass) {
            req.session.errors = ['Invalid password']

            return res.redirect('/')
        }

        req.session.user_id = user.id

        res.redirect('/')

    } catch (error) {
        console.log(error)
    }
})