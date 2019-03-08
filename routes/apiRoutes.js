var db = require("../models");

module.exports = function(app) {
  app.get("/api/recent", function(req, res) {
    db.Recent.findAll({}).then(function(dbRecent) {
      res.json(dbRecent);
    });
  });

  // Create a new example
  app.post("/api/recent", function(req, res) {
    db.Recent.create(req.body).then(function(dbRecent) {
      res.json(dbRecent);
    });
  });

  /* Delete an example by id
  app.delete("/api/examples/:id", function(req, res) {
    db.Example.destroy({ where: { id: req.params.id } }).then(function(dbExample) {
      res.json(dbExample);
    });
  });*/
};
