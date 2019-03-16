var db = require("../models");

module.exports = function(app) {
  // Get all recent searches
  app.get("/", function(req, res) {
    db.SearchView.findAll({}).then(function(foodResults) {
      db.Recent.findAll({}).then(function(recentResults) {
        res.render("index", {
          foodResults: foodResults,
          recent: recentResults
        });
      });
    });
  });

  app.post("/api/addTracker", function(req, res) {
    console.log(
      "\n addTracker foodID of button clicked: " + req.body.foodID + "\n"
    );
    var foodid = req.body.foodID;
    db.SearchView.findAll({
      where: {
        foodID: foodid
      }
    }).then(function(data) {
      //console.log("addTracker results: " + JSON.stringify(data[0]));
      var foodID = data[0].foodID;
      var name = data[0].name;
      var calories = data[0].calories;
      var protien = data[0].protien;
      var sugar = data[0].sugar;
      var fat = data[0].fat;
      var carbs = data[0].carbs;
      db.Tracker.create({
        foodID: foodID,
        name: name,
        calories: calories,
        protien: protien,
        sugar: sugar,
        fat: fat,
        carbs: carbs
      }).then(function() {
        res.send("done");
      });
    });
  });

  app.get("/api/getTrackerView", function(req, res) {
    db.Tracker.findAll({}).then(function(trackerResults) {
      res.json(trackerResults);
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
        foodObject.foodID = foodName[0].food.foodId;
        foodObject.name = foodName[0].food.label;
        var foodNutrients = foodName[0].food.nutrients;
        if (foodNutrients === undefined) {
          foodObject.calories = 0;
          foodObject.protien = 0;
          foodObject.sugar = 0;
          foodObject.carbs = 0;
          foodObject.fat = 0;
        } else {
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
      })
        .then(function() {
          db.SearchView.bulkCreate(foodArray).then(function() {
            res.send("testing");
            db.Recent.findAll({
              where: {
                name: foodArray[0].name
              }
            }).then(function(found) {
              //console.log(found.length);
              if (found.length === 0) {
                // eslint-disable-next-line prettier/prettier
                db.Recent.create(foodArray[0]).then(function() {//Enters the first item into the recent searches table
                  //console.log("Achieved.");
                });
              } else {
                console.log(" ");
              }
            });
          });
        })
        .catch(function(err) {
          console.log("promise error: " + err);
        });
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
