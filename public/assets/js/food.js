// Make sure we wait to attach our handlers until the DOM is fully loaded.
$(function() {
  $(".change-checkout").on("click", function(event) {
    var id = $(this).data("id");
    var newCheckout = $(this).data("newcheckout");

    var newCheckoutState = {
      checkout: newCheckout
    };

    // Send the PUT request
    $.ajax("/api/foods/" + id, {
      type: "PUT",
      data: newCheckoutState
    }).then(
      function() {
        console.log("changed check out to", newCheckout);
        // Reload the page to get the updated list
        location.reload();
      }
    );
  });

  $(".add-food").on("submit", function(event) {
    // Make sure to preventDefault on a submit event.
    event.preventDefault();

    var newFood = {
      food_name: $("#ca").val().trim(),
      checkout: $("[name=checkout]").val().trim()
    };

    // Send the POST request.
    $.ajax("/api/foods", {
      type: "POST",
      data: newFood
    }).then(
      function() {
        console.log("created new food");
        // Reload the page to get the updated list
        location.reload();
      }
    );
  });
});