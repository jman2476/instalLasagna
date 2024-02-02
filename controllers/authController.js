const { User } = require('../models')

// handle the errors
function errorHandler(err, req, res, path) {
    let messages

    if (err.errors) {
        messages = err.errors.map(errObj => errObj.message)
    } else {
        messages = [err.message]
    }

    console.log(messages)
    req.session.errors = messages

    res.redirect(path)
}

// function to handle user sign up
const signUpUser = async (req, res) => {
    try {
        //create new user
        const user = await User.create(req.body)

        req.session.userId = user.id
        req.session.userName = user.userName
        console.log(user)

        res.redirect('/')
    } catch (error) {
        errorHandler(error, req, res, '/signup')
    }
}

// function that handles user authentication
const logInUser = async (req, res) => {
    const { email, password } = req.body

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
        const valid_pass = (password === user.password)

        if (!valid_pass) {
            req.session.errors = ['Invalid password']

            return res.redirect('/')
        }

        req.session.userId = user.dataValues.id
        req.session.userName = user.dataValues.username
       console.log(user.dataValues) 
       console.log(req.session.userName)

        res.redirect('/')

    } catch (error) {
        errorHandler(error, req, res, '/login')
    }
}

module.exports = { signUpUser, logInUser }