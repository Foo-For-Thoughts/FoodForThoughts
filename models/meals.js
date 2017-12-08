module.exports = function(sequelize, DataTypes) {
  var Meals = sequelize.define("meals", {
    // date: {
    //   type: DataTypes.DATE,
    //   // AllowNull is a flag that restricts a todo from being entered if it doesn't
    //   // have a text value
    //   allowNull: false
    // },
    meal: {
      type: DataTypes.STRING,
      allowNull: false
    },
    protein_servings: {
      type: DataTypes.INTEGER
    },
    carb_servings: {
      type: DataTypes.INTEGER
    },
    fat_servings: {
      type: DataTypes.INTEGER
    },
    fruit_veg_servings: {
      type: DataTypes.INTEGER
    }
    // ,
    // user_id: {
    //   type: DataTypes.INTEGER
    // }
  });

  Meals.associate = function(models) {
    // We're saying that a Post should belong to an Author
    // A Post can't be created without an Author due to the foreign key constraint
    Meals.belongsTo(models.user, {
      foreignKey: {
        allowNull: false
      }
    });
  };
  return Meals;
};