const app = require('../server.js')
const db = require('../models/index')
const expect = require('chai').expect
const request = require('supertest').agent(app)

console.log(process.env.NODE_ENV)

describe('Some simple API tests', () => {
  describe('A GET to /logout', () => {
    it('should return the index path', done => {
      request
        .get('/logout')
        .expect(200) // check that the status code is a success
        .end((error, response) => {
          expect(response.body.redirectTo).to.equal('/')
          done()
        })
    })
  })
  describe('A POST to /auth/signup', () => {
    before('Delete all users to prevent duplicate key errors', done => {
      db.sequelize.query('TRUNCATE user CASCADE')
        .then(() => {
          done()
        })
    })
    it('should create and send back a new user record', done => {
      var userAttrs = {
        username: 'erev1',
        password: 'password'
      }
      request
        .post('/api/users')
        .send(userAttrs)
        .end((error, response) => {
          var user = response.body
          // Make sure the password isn't being sent back
          expect(user.password).to.equal(undefined)
          // Make sure the user was created with the email we sent
          expect(user.username).to.equal(userAttrs.username)
          // Make sure the user was created with an id
          expect(user.id).to.not.equal(undefined)
          // Then we'll directly query the database to make sure that the password
          // saved in the databse isn't the plaintext password we sent
          db.user.findOne({ where: { id: user.id }})
            .then( user => {
              expect(user.password).to.not.equal(userAttrs.password)
              // this line of code is really crucial because it tells mocha that 
              // the asynchronous test has finished.
              done()
            })
        })
    })
  })
})