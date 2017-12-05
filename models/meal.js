module.exports = function(sequelize, DataTypes) {
var Meal = sequelize.define("Meal", {
  meal: {
    type: DataTypes.STRING
  },
  protein: {
    type: DataTypes.INTEGER
  },
  carb: {
    type: DataTypes.INTEGER
  },
  veggieFruits: {
    type: DataTypes.INTEGER
  },
  fat: {
    type: DataTypes.INTEGER
  }
}, {
  timestamps: false
});

  return Meal;
};


