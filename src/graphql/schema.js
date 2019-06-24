import userTypeDef from './typeDefs/User'
import incidentTypeDef from './typeDefs/Incident'
import userResolvers from './resolvers/User'
import incidentResolvers from './resolvers/Incident'
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

export default makeExecutableSchema({
  typeDefs: [ queryTypeDefs, userTypeDef, incidentTypeDef ],
  resolvers: _.merge(resolvers, userResolvers, incidentResolvers),
  debug: true,
  tracing: true,
  introspection: true,
  playground: true
});
