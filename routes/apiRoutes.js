var db = require("../models");

module.exports = function(app) {
  // Get all recent searches
  app.get("/", function(req, res) {
    db.SearchView.findAll({}).then(function(foodResults) {
      res.render("index", {
        recent: foodResults
      });
    });
  });

  app.post("/api/updateResults", function(req, res) {
    var foodArray = [];
    var foodName = req.body.test;
    //console.log("length of array: " + foodName.length);
    var promise = new Promise(function(resolve) {
      do {
        var foodObject = {
          foodID: "",
          name: "",
          calories: 0,
          protien: 0,
          carbs: 0,
          sugar: 0,
          fat: 0
        };
        var foodNutrients = foodName[0].food.nutrients;
        //console.log("Original: " + JSON.stringify(foodName[0]));
        foodObject.foodID = foodName[0].food.foodId;
        foodObject.name = foodName[0].food.label;
        //checks is there is calorie key value pair
        if (foodNutrients.ENERC_KCAL) {
          foodObject.calories = foodNutrients.ENERC_KCAL;
        } else {
          foodObject.calories = 0;
        }
        //checks is there is protien key value pair
        if (foodNutrients.PROCNT) {
          foodObject.protien = foodNutrients.PROCNT;
        } else {
          foodObject.protien = 0;
        }
        //checks is there is sugar key value pair
        if (foodNutrients.SUGAR) {
          foodObject.sugar = foodNutrients.SUGAR;
        } else {
          foodObject.sugar = 0;
        }
        //checks is there is carbs key value pair
        if (foodNutrients.CHOCDF) {
          foodObject.carbs = foodNutrients.CHOCDF;
        } else {
          foodObject.carbs = 0;
        }
        //checks is there is fat key value pair
        if (foodNutrients.FAT) {
          foodObject.fat = foodNutrients.FAT;
        } else {
          foodObject.fat = 0;
        }
        //console.log("After: " + JSON.stringify(foodObject));
        foodArray.push(foodObject);
        foodName = foodName.slice(1);
        //console.log("Length: " + foodName.length);
      } while (foodName.length > 0);
      if (foodName.length === 0) {
        resolve(foodArray);
      }
    });
    //once our food Object is populated, send it to the handlebars index file to create our search results list
    promise.then(function(foodArray) {
      console.log("promise");
      // delete previous results in DB
      db.SearchView.destroy({
        where: {}
      }).then(function() {
        db.SearchView.bulkCreate(foodArray).then(function(){
          res.send("testing");
        });
      });
    });
  });

  // Create a new Recent Search
  app.post("/api/addRecent", function(req, res) {
    db.Example.create(req.body).then(function(dbExample) {
      res.json(dbExample);
    });
  });

  // Delete an example by id
  app.delete("/api/examples/:id", function(req, res) {
    // eslint-disable-next-line prettier/prettier
    db.Example.destroy({
      where: {
        id: req.params.id
      }
    }).then(function(dbExample) {
      res.json(dbExample);
    });
  });
};
