var db = require("../models");
var path = require("path");
var Sequelize = require('sequelize');


var isAuthenticated = require('../config/middleware/isAuthenticated');


module.exports = function(app, passport) {
	// Using the passport.authenticate middleware with our local strategy.
	// If the user has valid login credentials, send them to the members page.
	// Otherwise the user will be sent an error
	app.post('/auth/login', passport.authenticate('local'), function(req, res) {
			console.log("authenticated")
			// Since we're doing a POST with javascript, we can't actually redirect that post into a GET request
			// So we're sending the user back the route to the members page because the redirect will happen on the front end
			// They won't get this or even be able to access this page if they aren't authed
			res.send({redirectTo: '/food-diary'})
		});
		// Route for signing up a user. The user's password is automatically hashed and stored securely thanks to
		// how we configured our Sequelize User Model. If the user is created successfully, proceed to log the user in,
		// otherwise send back an error
	app.post('/auth/signup', function(req, res) {
		db.user.create({
				username: req.body.username,
				password: req.body.password
			})
			.then(function() {
				res.send({redirectTo: '/login'})
			})
			.catch(function(err) {
				res.json(err)
			})
	})

	// Route for logging user out
	app.get('/logout', function(req, res) {
			req.logout()
			res.redirect('/')
		})
		// Route for getting some data about our user to be used client side
	app.get('/api/user_data', isAuthenticated, function(req, res) {
		// Sending back a password, even a hashed password, isn't a good idea
		res.json({
			username: req.user.username,
			id: req.user.id
					})
	})

	app.post('/postmeals', function(req, res){
		db.meals.create({
			userId: req.body.user_id,
			meal: req.body.meal,
			protein_servings: req.body.protein,
			fat_servings: req.body.fat,
			carb_servings: req.body.carb,
			fruit_veg_servings: req.body.veggies
		}).then(function(data){
			var morning = new Date()
			var night = new Date()
			morning.setHours(0,0,0,0)
			night.setHours(24,0,0,0)

			db.meals.findAll({
				where: {
					userId: req.body.user_id,
					createdAt: {
						[Sequelize.Op.lt]: night,
						[Sequelize.Op.gt]: morning
					}
				}
			}).then(function(data){
				res.send(data)
			})
		})
	})

	app.get('/meals', function(req, res) {
		var dateVariable = req.body.dateVariable

		var morning = new Date()
		var night = new Date()
		morning.setHours(-24*7,0,0,0)
		night.setHours(24,0,0,0)

		db.meals.findAll({

			where: {
				userId: 1,
				createdAt: {
						[Sequelize.Op.lt]: night,
						[Sequelize.Op.gt]: morning
					}
			}
		}).then(function(meals) {
			res.json(meals);
		});
	})


	app.get("/", function(req, res) {
    	res.sendFile(path.join(__dirname, "../public/index.html"));
  	});

  	app.get("/food-diary", function(req, res) {
    	res.sendFile(path.join(__dirname, "../public/food-diary.html"));
  	});

  	app.get("/chart", function(req, res) {
    	res.sendFile(path.join(__dirname, "../public/chart.html"));
  	});

  	app.get("/login", function(req, res) {
    	res.sendFile(path.join(__dirname, "../public/login.html"));
  	});

  	app.get("/signup", function(req, res) {
    	res.sendFile(path.join(__dirname, "../public/signup.html"));
  	});


}