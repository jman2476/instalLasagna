const { GraphQLError } = require('graphql')

const { User } = require('../../models')
const { generateJWT } = require('../../config/auth')

module.exports = {
    queries: {
        async authenticate(_, __, { req }) {
            const token = req.cookies.token

            if(!token) return null

            try {
                const user_id = verifyJWT(token)

                const user = await User.findById(user_id)

                return user

            } catch (err) {
                console.log(err)

                return null
            }
        },

        // getUserRecipes: ,
        // getUserNotes: ,
    },

    mutations: {
        async registerUser(_, { username, email, password }, { res }) {

            try {
                const user = await User.create({ username, email, password })

                console.log(user)
                const token = generateJWT(user._id)

                res.cookie('token', token, { httpOnly: true })

                return user
            } catch (err) {
                if (err.code === 11000) {
                    throw new GraphQLError('A user with these credentials already exists')
                }

                if(err.errors) {
                    let errors = []

                    for (let prop in err.errors) {
                        errors.push(err.errors[prop].message)
                    }

                    console.log(errors)
                    throw new GraphQLError(errors)
                }
            }
        },

        async loginUser(_, args, { res }) {
            try {
                const user = await User.findOne({ email: args.email })

                if (!user) {
                    throw new GraphQLError('No users with that email found')
                }

                const pass_check = await user.validatePass(args.password)

                if (!pass_check) {
                    throw new GraphQLError('Incorrect password')
                }

                const token = generateJWT(user._id)

                res.cookie('token', token, { httpOnly: true })

                return user
            } catch (err) {
                console.log('Login error', err)

                if (err.errors) {
                    let errors = Object.values(err.errors).map((val) => val.message);

                    throw new GraphQLError[errors];
                } else {
                    throw err;
                }
            }
        },

        logoutUser(_, __, { res }) {
            try {
                res.clearCookie('token')

                return { message: 'User logged out successfully' }
            } catch (err) {
                console.log(err)
            }
        }
    }
}