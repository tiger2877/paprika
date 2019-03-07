// Import the ORM to create functions that will interact with the database
var orm = require("../config/orm.js");

var food = {
  all: function(cb) {
    orm.all("foods", function(res) {
      cb(res);
    });
  },
  // The variables cols and vals are arrays
  create: function(cols, vals, cb) {
    orm.create("foods", cols, vals, function(res) {
      cb(res);
    });
  },
  update: function(objColVals, condition, cb) {
    orm.update("foods", objColVals, condition, function(res) {
      cb(res);
    });
  }
};

// Export the database functions for the controller (foodController.js)
module.exports = food;