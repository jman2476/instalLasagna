const { sign, verify } = require('jsonwebtoken')
const { GraphQLError } = require('graphql')

function generateJWT(user_id) {
    const token = sign({user_id}, process.env.JWT_SECRET)

    return token
}

function verifyJWT(token) {

}

function protect(resolver) {

}

module.exports = { generateJWT, verifyJWT, protect }