const { userResolver,
    recipeResolver,
    noteResolver,
    stepResolver} = require('./lib/')

const resolvers = {
    Query: {
        ...userResolver.queries,
        ...recipeResolver.queries,
        ...stepResolver.queries,
        ...noteResolver.queries
    },

    Mutation: {
        ...userResolver.mutations,
        ...recipeResolver.mutations,
        ...stepResolver.mutations,
        ...noteResolver.mutations
    }
}

module.exports = resolvers