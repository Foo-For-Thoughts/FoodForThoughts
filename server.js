// Requiring necessary npm packages
var express = require("express")
var bodyParser = require("body-parser")
var session = require("express-session")
var passport = require("passport")
// Setting up port and requiring models for syncing
var PORT = process.env.PORT || 8080
var db = require("./models/index")
// Creating express app and configuring middleware needed for authentication
var app = express()
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
app.use(express.static("public"))
// We need to use sessions to keep track of our user's login status
app.use(session({ secret: "keyboard cat", resave: true, saveUninitialized: true }))
// Passing passport to our config to load our authentication strategies
require("./config/passport")(passport)
app.use(passport.initialize())
app.use(passport.session())
//creating tables
db.sequelize.sync()
// Requiring our routes
require("./routes/foodforthoughtcontroller.js")(app, passport)
app.listen(PORT, function() {
  console.log(`Listening on port ${ PORT }. Visit http://localhost:${ PORT }/ in your browser.
  `)
})
// export the app for testing
module.exports = app