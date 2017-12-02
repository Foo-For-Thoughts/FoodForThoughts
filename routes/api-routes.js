// *********************************************************************************
// api-routes.js - this file offers a set of routes for displaying and saving data to the db
// *********************************************************************************

// Dependencies
// =============================================================
var Meal = require("../models/meal.js");


// Routes
// =============================================================
module.exports = function(app) {

  // Add sequelize code to get all meals and return them as JSON
  app.get("/api/all", function(req, res) {
    Meal.findAll({}).then(function(results) {
      res.json(results);
    });
  });

  // Add sequelize code to get a specific meal and return it as JSON
  app.get("/api/:meal", function(req, res) {
    if (req.params.meal) {
      Meal.findAll({
        where: {
          meal: req.params.meal
        }
      }).then(function(results) {
        res.json(results);
      });
    }
  });

  // Add sequelize code to get all meals of a specific carb and return them as JSON
  app.get("/api/carb/:carb", function(req, res) {
    if (req.params.carb) {
      Meal.findAll({
        where: {
          carb: req.params.carb
        }
      }).then(function(results) {
        res.json(results);
      });
    }
  });

  // Add sequelize code to get all meals from a specific protein and return them as JSON
  app.get("/api/protein/:protein", function(req, res) {
    if (req.params.protein) {
      Meal.findAll({
        where: {
          protein: req.params.protein
        }
      }).then(function(results) {
        res.json(results);
      });
    }
  });

  // Add sequelize code to get all "long" meals (more than 150 veggieFruits) and return them as JSON
  app.get("/api/meals/long", function(req, res) {
    Meal.findAll({
      where: {
        veggieFruits: {
          $gte: 300
        }
      },
      order: [["veggieFruits", "DESC"]]
    }).then(function(results) {
      res.json(results);
    });
  });

  // Add sequelize code to get all "short" meals (150 veggieFruits or less) and return them as JSON
  app.get("/api/meals/short", function(req, res) {
    Meal.findAll({
      where: {
        veggieFruits: {
          $lte: 150
        }
      },
      order: [["veggieFruits", "ASC"]]
    }).then(function(results) {
      res.json(results);
    });
  });

  // Add sequelize code to create a meal
  app.post("/api/new", function(req, res) {
    console.log("Meal Data:");
    console.log(req.body);
    Meal.create({
      meal: req.body.meal,
      protein: req.body.protein,
      carb: req.body.carb,
      veggieFruits: req.body.veggieFruits
    });
  });

  // Add sequelize code to delete a meal
  app.post("/api/delete", function(req, res) {
    console.log("Meal Data:");
    console.log(req.body);
    Meal.destroy({
      where: {
        id: req.body.id
      }
    });
  });



  
};
