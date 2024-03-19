const express = require('express')
require('dotenv').config()
const db = require('./config/connection')
const path = require('path')

const { ApolloServer } = require('@apollo/server')
const { expressMiddleware } = require('@apollo/server/express4')
const app = express()
// import the schema for the database

const PORT = process.env.PORT || 3434

async function serverStart() {
    // Set up apollo server
    const server = new ApolloServer({
        // put the schema here
    }) 

    // Open middleware channels
    app.use(express.json())
    app.use('/graphql', expressMiddleware(server, {
        context(data) {
            return {
                req: data.req,
                res: data.res
            }
        }
    }))

    // Set production to use the built distrobution

    // Confirm the database connection
    db.on('open', () => {
        // start the server
        app.listen(PORT, () => console.log(`All systems are go on port ${PORT}`))
    })

}

serverStart()