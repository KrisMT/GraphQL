const {makeExecutableSchema} = require('graphql-tools');

const resolvers = require('./resolvers');

const typeDefs = `
  type Link {
    id: ID!
    url: String!
    description: String!
    postedBy: User
    votes: [Vote!]!
  }

  type Query {
    allLinks: [Link!]!
  }

  type Mutation {
    createLink(url: String!, description: String!): Link
    createVote(linkId: ID!): Vote
    createUser(name: String!, authProvider: AUTH_PROVIDER_EMAIL!): User
    signinUser(authProvider: AUTH_PROVIDER_EMAIL): SigninPayload!
  }

  type User {
    id: ID!
    name: String!
    email: String
    votes: [Vote!]!
  }

  input AUTH_PROVIDER_EMAIL {
    email: String!
    password: String!
  }

  type SigninPayload {
    token: String
    user: User
  }

  type Vote {
    id: ID!
    user: User!
    link: Link!
  }

`;

module.exports = makeExecutableSchema({typeDefs, resolvers});
