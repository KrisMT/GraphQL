const {makeExecutableSchema} = require('graphql-tools');

const resolvers = require('./resolvers');

const typeDefs = `
  type Query {
    allLinks(filter: LinkFilter, skip: Int, limit: Int): [Link!]!
    allLocations: [Location!]!
  }

  type Mutation {
    createLink(url: String!, description: String!): Link

    createUser(name: String!, authProvider: AUTH_PROVIDER_EMAIL!): User
    updateUser(userId: ID!, name: String, authProvider: AUTH_PROVIDER_EMAIL!): User
    removeUser(userId: ID!): String
    signinUser(authProvider: AUTH_PROVIDER_EMAIL): SigninPayload!

    createLocation(name: String!): Location
    updateLocation(locationId: ID!, name: String): Location
    removeLocation(locationId: ID!): String

    createGood(qrcode: QR_PROVIDER, goodname: String, startdate: String): Good
    updateGood(goodId: ID!, qrcode: QR_PROVIDER, name: String, income: String): Good

    createCheck(qrcode: QR_PROVIDER, locationId: ID!, date: String): Check
  }

  type Subscription {
    Link(filter: LinkSubsciptionFilter): LinkSubscriptionPayload!
  }

  type Link {
    id: ID!
    url: String!
    description: String!
    postedBy: User
  }

  type User {
    id: ID!
    name: String!
    email: String
    status: USER_STATUS
    checks: [Check!]!
  }

  type Location {
    id: ID!
    name: String
    checks: [Check!]!
  }

  type Good {
    id: ID!
    upcode: String
    cpecode: String
    name: String!
    income: String!
    checks: [Check!]!
  }

  type Check {
    id: ID!
    good: Good!
    location: Location!
    user: User
    checkDate: String
  }

  type SigninPayload {
    token: String
    user: User
  }

  input QR_PROVIDER {
    upcode: String
    cpecode: String
  }

  input LinkFilter {
    OR: [LinkFilter!]
    description_contains: String
    url_contains: String
  }

  input AUTH_PROVIDER_EMAIL {
    email: String!
    password: String!
  }

  input LinkSubsciptionFilter {
    mutation_in: [_ModelMutationType!]
  }

  type LinkSubscriptionPayload {
    mutation: [_ModelMutationType!]!
    node: Link!
  }

  enum _ModelMutationType {
    CREATED
    UPDATED
    DELETED
  }

  enum USER_STATUS {
    ADMIN
    USER
  }

`;

module.exports = makeExecutableSchema({typeDefs, resolvers});
