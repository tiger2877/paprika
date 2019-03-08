module.exports = function(sequelize, DataTypes) {
  var Recent = sequelize.define("Example", {
    text: {
      type: DataTypes.STRING,
      notNull: false,
      len: [1, 30]
    }
  });
  return Recent;
};
