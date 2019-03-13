var db = require("../models");

module.exports = function(app) {
  // Load index page
  app.get("/", function(req, res) {
    db.Recent.findAll({}).then(function(dbRecent) {
      res.render("index", {
        msg: "Welcome!",
        recents: dbRecent
      });
    });
  });

  // Load example page and pass in an example by id
  app.get("/recent/:id", function(req, res) {
    // eslint-disable-next-line prettier/prettier
    db.Recent.findOne({ where: { id: req.params.id } }).then(function(dbRecent) {
      res.render("example", {
        example: dbRecent
      });
    });
  });

  // Render 404 page for any unmatched routes
  app.get("*", function(req, res) {
    res.render("404");
  });
};
