const fs = require('fs')
const path = require('path')
const { gql } = require('apollo-server-express')


module.exports = gql`${fs.readFileSync(path.join(__dirname, '../schemas/User.gql'), 'utf8')}`;
