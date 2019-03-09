module.exports = function(sequelize, DataTypes) {
  var Recent = sequelize.define("Recent", {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      autoIncrement: true,
      primaryKey: true
    },
    itemName: {
      type: DataTypes.STRING,
      allowNull: false
    },
    // eslint-disable-next-line prettier/prettier
    kCal: {// Calories
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false
    },
    // eslint-disable-next-line prettier/prettier
    CHOCDF: {// Carbs
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false
    },
    // eslint-disable-next-line prettier/prettier
    PROCNT: {// Protien Content
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false
    },
    // eslint-disable-next-line prettier/prettier
    FAT: {// Fat Content
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false
    },
    // eslint-disable-next-line prettier/prettier
    SUGAR: {// Sugars
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false
    }
  });
  return Recent;
};
