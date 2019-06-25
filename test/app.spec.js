const config = require('config')
import { mongo_connect, setup_apollo, graphqlPath } from '../src/server'
const url = `http://localhost:3000`;
const request = require('supertest')(url);


beforeAll(() => {

  return new Promise((resolve, reject) => {
    mongo_connect().then(()=>{
      setup_apollo().then(app=>{
        const { host, port } = config.get('server')
        app.listen({ port }, () => {
          resolve()
        })
      })
    }).catch(err=>{
      reject()
    })
  })
});

describe('Incident management system', () => {

    describe('GraphQL', () => {

      let insertedId = null;

      it('allows queries',  ( done ) => {

        request.get(`${graphqlPath}`)
          .expect(400)
          .end((err, res) => {
              if (err) return done(err);
              done();
        })

      });


      it('Insert incidents', (done) => {
          request.post(`${graphqlPath}`)
          .send({ query: 'mutation { createIncident (incident: { title: "2xPfUDuBwB",}){_id,title}}' })
          .expect(200)
          .end((err, res) => {
              if (err) return done(err);
              expect(res.body.data.createIncident.title).toMatch('2xPfUDuBwB')
              insertedId = res.body.data.createIncident._id;
              done()
          })
      });

      it('Filter incident', (done) => {
          request.post(`${graphqlPath}`)
          .send({ query: `{ incidents (filter: { title: "2xPfUDuBwB" }) { _id, title }}` })
          .expect(200)
          .end((err, res) => {
              if (err) return done(err);
              expect(res.body.data.incidents[0].title).toMatch('2xPfUDuBwB')
              done()
          })
      })

      it('Resolve incident', (done) => {
          request.post(`${graphqlPath}`)
          .send({ query: `mutation { changeIncidentStatus ( _id: "${insertedId}",status: Resolved)}` })
          .expect(200)
          .end((err, res) => {
              if (err) return done(err);
              expect(res.body.data.changeIncidentStatus).toMatch(insertedId)
              done()
          })
      })

      it('Check if incident resolved', (done) => {
          request.post(`${graphqlPath}`)
          .send({ query: `{ incident(_id: "${insertedId}") { _id,status }}` })
          .expect(200)
          .end((err, res) => {
              if (err) return done(err);
              expect(res.body.data.incident.status).toMatch("Resolved")
              done()
          })
      })

      it('Acknowledge incident', (done) => {
          request.post(`${graphqlPath}`)
          .send({ query: `mutation { changeIncidentStatus ( _id: "${insertedId}",status: Acknowledged)}` })
          .expect(200)
          .end((err, res) => {
              if (err) return done(err);
              expect(res.body.data.changeIncidentStatus).toMatch(insertedId)
              done()
          })
      })

      it('Check if incident Acknowledged', (done) => {
          request.post(`${graphqlPath}`)
          .send({ query: `{ incident(_id: "${insertedId}") { _id,status }}` })
          .expect(200)
          .end((err, res) => {
              if (err) return done(err);
              expect(res.body.data.incident.status).toMatch("Acknowledged")
              done()
          })
      })


      it('Assign incident to a user', (done) => {
          request.post(`${graphqlPath}`)
          .send({ query: `mutation { assignIncident ( incident: "${insertedId}",user: "testuser")}` })
          .expect(200)
          .end((err, res) => {
              if (err) return done(err);
              expect(res.body.data.assignIncident).toMatch(insertedId)
              done()
          })
      })

      it('Check if incident assigned to the correct user', (done) => {
          request.post(`${graphqlPath}`)
          .send({ query: `{ incident(_id: "${insertedId}") { _id,assignee }}` })
          .expect(200)
          .end((err, res) => {
              if (err) return done(err);
              expect(res.body.data.incident.assignee).toMatch("testuser")
              done()
          })
      })


      it('Delete incident', (done) => {
          request.post(`${graphqlPath}`)
          .send({ query: `mutation { deleteIncident (_id: "${insertedId}")}` })
          .expect(200)
          .end((err, res) => {
              if (err) return done(err);
              expect(res.body.data.deleteIncident).toMatch(insertedId)
              done()
          })
      })


    })



})
