const { makeExecutableSchema } = require('graphql-tools');

const resolvers = require('./resolvers');

const typeDefs = `
  type Link {
    id: ID!
    url: String!
    description: String!
  }

  type Query {
    allLinks: [Link!]!
  }

  type Mutation {
    createLink(url: String!, description: String!): Link
    createUser(name: String!, authProvider: AUTH_PROVIDER_EMAIL!): User
  }

  type User {
    id: ID!
    name: String!
    email: String
  }

  input AUTH_PROVIDER_EMAIL {
    email: String!
    password: String!
  }

`;

module.exports = makeExecutableSchema({typeDefs, resolvers});
