const { User } = require('../models')

// function to handle user sign up
const signUpUser = async(req,res) =>{
    const {email} = req.body
    try {
        // check if user exists
        const exists_user = await User.findAll({
            where: {
                email: email
            }
        })
        
        if(!exists_user) {
            req.session.errors = ['Email is already in use']
            return console.log('User exists')
        }

        //create new user
        const user = await User.create(req.body)

        req.session.user_id = user.id

        res.redirect('/')
    } catch (error) {
        const messages = error.errors.map(errObj => errObj.message)

        req.session.errors = messages
        
        res.redirect('/signup')
    }
}

// function that handles user authentication
const logInUser =  async (req, res) => {
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
        const messages = error.errors.map(errObj => errObj.message)

        req.session.errors = messages
        
        res.redirect('/signup')
    }
}

module.exports = {signUpUser, logInUser}