const gql = String.raw


// typeDefs explain the resolver
// Queries get data
// Mutations change data
const typeDefs = gql`

    type User {
        _id: ID
        username: String
        email: String
    }

    type Recipe {
        _id: ID
    }

    type Step {
        _id: ID
    }

    type Note {
        _id: ID
    }

    type Success {
        message: String
    }

    type Query {
        authenticate: User
    }

    type Mutation {
        registerUser(username: String!, email: String!, password: String!): User
        loginUser(email: String!, password: String!): User
        logoutUser: Success

    }
`;


module.exports = typeDefs