var db = require("../models");

module.exports = function(app) {
  // Get all recent searches
  app.get("/api/recent", function(req, res) {
    db.Recent.findAll({}).then(function(dbExamples) {
      res.json(dbExamples);
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
    db.Example.destroy({ where: { id: req.params.id } }).then(function(dbExample) {
      res.json(dbExample);
    });
  });
};
