const config           = require('config')
const express          = require('express')
const mongoose         = require('mongoose')
const { ApolloServer } = require('apollo-server-express')
import schema from './graphql/schema'
const cors = require('cors')
mongoose.Promise       = global.Promise

const { seedUsers } = require('./db-init')


export function mongo_connect(){
    return mongoose.connect(config.get('db.uri'), { useNewUrlParser: true })
}

export const graphqlPath =  '/graphql'
export async function setup_apollo( host, port ){

  // TODO: Initialize Apollo with the required arguments as you see fit
  const server = new ApolloServer({schema});
  const app = express()
  app.use(cors())
  server.applyMiddleware({
    app,
    path: graphqlPath

  })

  return app

}

export function db_seed(){
  return seedUsers()
}

if (require.main === module) {

  mongo_connect().then(db_seed).then(()=>{
    const { host, port } = config.get('server')
    setup_apollo().then(app=>{
      app.listen({ port }, () => {
        console.log(`Server ready at http://${ host }:${ port }${ graphqlPath }`)
      })
    })

  }).catch((error) => {
      console.error(error)
      process.exit(-1)
  });

}
