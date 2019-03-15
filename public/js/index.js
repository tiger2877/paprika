// Get references to page elements
var $foodName = $("#food-name");
var $searchButton = $("#searchButton");
var $addToCart = $(".addToCart");
var $trackerButton = $("#trackerButton");

// The API object contains methods for each kind of request we'll make
var API = {
  saveExample: function(example) {
    return $.ajax({
      headers: {
        "Content-Type": "application/json"
      },
      type: "POST",
      url: "api/examples",
      data: JSON.stringify(example)
    });
  },
  getSearchView: function() {
    return $.ajax({
      url: "api/searchView",
      type: "GET"
    });
  },
  deleteExample: function(id) {
    return $.ajax({
      url: "api/examples/" + id,
      type: "DELETE"
    });
  },
  searchFood: function(name) {
    return $.get({
      url:
        "https://api.edamam.com/api/food-database/parser?ingr=" +
        name +
        "&app_id=bc5159a0&app_key=cc574421cb216827121d637a51284839"
    });
  }
};

// handleFormSubmit is called whenever we submit a new food item
var handleFormSubmit = function(event) {
  event.preventDefault();
  //only executes on invalid searches
  $("#test").empty();
  var name = $foodName.val();
  console.log(name);

  if (name === "") {
    alert("You must enter a Food to search for!");
    return;
  }

  API.searchFood(name).then(function(data) {
    if (data.hints.length <= 0) {
      // change this to be displayed on the page instead of an alert
      alert("Couldnt find any foods with the name: " + name);
      return;
    } else {
      console.log("called food api successfully. "); //+ JSON.stringify(data));
      //update frontend with results.
      renderSearch(data.hints);
    }
  });

  $foodName.val("");
};

var renderSearch = function(searchResults) {
  //console.log("renderSearch: \n" + JSON.stringify(searchResults));
  $.post({
    url: "/api/updateResults",
    data: { test: searchResults }
  }).then(function() {
    //alert("loading results...");
    location.reload();
    renderRecent();
  });
};

//show the most recent search results
var renderRecent = function() {
  $.post({
    url: "/api/addRecent"
  }).then(function() {
    location.reload();
  });
};

var handleCartClick = function(event) {
  var foodID = event.currentTarget.dataset.foodid;
  console.log("foodID: " + foodID);
  $.post({
    url: "/api/addTracker",
    data: { foodID: foodID }
  }).then(function(trackerResults) {
    alert("Added to Cart\n" + trackerResults);
  });
};

var handleTrackerButtonClick = function() {
  $.get({
    url: "/api/getTrackerView"
  }).then(function(data) {
    console.log("Update front end modal. \n" + JSON.stringify(data));
  });
};

// Add event listeners to the submit and delete buttons
$searchButton.on("click", handleFormSubmit);
$addToCart.on("click", handleCartClick);
$trackerButton.on("click", handleTrackerButtonClick);
