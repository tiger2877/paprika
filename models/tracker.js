module.exports = function(sequelize, DataTypes) {
  var Tracker = sequelize.define("Tracker", {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      autoIncrement: true,
      primaryKey: true
    },
    foodID: {
      type: DataTypes.STRING,
      allowNull: false
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    // eslint-disable-next-line prettier/prettier
    calories: {// Calories
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false
    },
    // eslint-disable-next-line prettier/prettier
    carbs: {// Carbs
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false
    },
    // eslint-disable-next-line prettier/prettier
    protien: {// Protien Content
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false
    },
    // eslint-disable-next-line prettier/prettier
    fat: {// Fat Content
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false
    },
    // eslint-disable-next-line prettier/prettier
    sugar: {// Sugars
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false
    }
  });
  return Tracker;
};
