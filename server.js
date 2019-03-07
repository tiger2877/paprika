// *****************************************************************************
// Server.js - This file is the initial starting point for the Node/Express server.
// ******************************************************************************
// *** Dependencies
// =============================================================
var express = require("express");
var bodyParser = require("body-parser");

// *** Sets up the Express App
// =============================================================
var app = express();
var PORT = process.env.PORT || 8080;

// *** Sets up the Express app to handle data parsing
// =============================================================
// Serve static content for the app from the "public" directory
app.use(express.static("public"));

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));

// parse application/json
app.use(bodyParser.json());

// *** Set Handlebars
// =============================================================
var exphbs = require("express-handlebars");
app.engine("handlebars", exphbs({ defaultLayout: "main" }));
app.set("view engine", "handlebars");

// *** Import routes and give server access
// =============================================================
var routes = require("./controllers/foodController.js");
app.use(routes);

// *** Start server to listen to client requests
// =============================================================
app.listen(PORT, function() {
  // Log (server-side) when our server has started
  console.log("Server listening on: http://localhost:" + PORT);
});