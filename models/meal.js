// Dependencies
// =============================================================

// Require the sequelize library
// Require the connection to the database (connection.js)

// Create a "Book" model with the following configuration

// 1. A title property of type STRING
// 2. An author property of type STRING
// 3. A genre property of type STRING
// 4. A pages property of type INTEGER
// 5. Set timestamps to false on this model

// Sync model with DB

// Export the book model for other files to use



// Dependencies
// =============================================================

// Sequelize (capital) references the standard library
var Sequelize = require("sequelize");
// sequelize (lowercase) references my connection to the DB.
var sequelize = require("../config/connection.js");

// Creates a "Book" model that matches up with DB
var Meals = sequelize.define("meals", {
  meal: {
    type: Sequelize.STRING
  },
  protein: {
    type: Sequelize.INTEGER
  },
  carb: {
    type: Sequelize.INTEGER
  },
  veggieFruits: {
    type: Sequelize.INTEGER
  }
}, {
  timestamps: false
});

// Syncs with DB
Meals.sync();

// Makes the Book Model available for other files (will also create a table)
module.exports = Meals;
