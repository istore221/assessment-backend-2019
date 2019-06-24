const userTypeDef = require('./typeDefs/User')
const incidentTypeDef = require('./typeDefs/Incident')
const userResolvers = require('./resolvers/User')
const incidentResolvers = require('./resolvers/Incident')
const { makeExecutableSchema } = require('graphql-tools');
const { gql } = require('apollo-server-express')
const _ = require('lodash')


// The GraphQL schema
const queryTypeDefs = `

   type Query {
     _: Boolean
   }

   type Mutation {
     _: Boolean
   }

   type Subscription {
     _: Boolean
   }


`;

const resolvers = {};

module.exports = makeExecutableSchema({
  typeDefs: [ queryTypeDefs, userTypeDef, incidentTypeDef ],
  resolvers: _.merge(resolvers, userResolvers, incidentResolvers)
});
