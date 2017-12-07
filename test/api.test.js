const app = require('../server.js')
const db = require('../models/index')
const expect = require('chai').expect
const request = require('supertest').agent(app)

describe('Some simple API tests', () => {
  describe('A GET to /random', () => {
    it('should return a random number between 1 and 1000', done => {
      request
        .get('/api/random')
        .expect(200) // check that the status code is a success
        .end((error, response) => {
          expect(response.body.random < 1).to.equal(false)
          expect(response.body.random >= 1).to.equal(true)
          expect(response.body.random <= 1000).to.equal(true)
          expect(response.body.random > 1000).to.equal(false)
          // this line of code is really crucial because it tells mocha that 
          // the asynchronous test has finished.
          done()
        })
    })
  })
  describe('A POST to /api/users', () => {
    before('Delete all users to prevent duplicate key errors', done => {
      db.User.destroy({ truncate: true })
        .then(() => {
          done()
        })
    })
    it('should create and send back a new user record', done => {
      var userAttrs = {
        email: 'davidb.prof@gmail.com',
        password: 'best password ever'
      }
      request
        .post('/api/users')
        .send(userAttrs)
        .end((error, response) => {
          var user = response.body
          // Make sure the password isn't being sent back
          expect(user.password).to.equal(undefined)
          // Make sure the user was created with the email we sent
          expect(user.email).to.equal(userAttrs.email)
          // Make sure the user was created with an id
          expect(user.id).to.not.equal(undefined)
          // Then we'll directly query the database to make sure that the password
          // saved in the databse isn't the plaintext password we sent
          db.User.findOne({ where: { id: user.id }})
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