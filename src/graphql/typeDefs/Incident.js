const fs = require('fs')
const path = require('path')
const { gql } = require('apollo-server-express')


module.exports = gql`${fs.readFileSync(path.join(__dirname, '../schemas/Incident.gql'), 'utf8')}`;
