// The code in add.js handles what happens when the user clicks the "Add a book" button.

// When user clicks add-btn

$("#add-btn").on("click", function(event) {
  event.preventDefault();

  // Make a newBook object
  var newMeal = {
    meal: $("#meal").val().trim(),
    protein: $("#protein").val().trim(),
    carb: $("#carb").val().trim(),
    veggieFruits: $("#veggieFruits").val().trim(),
    fat: $("#fat").val().trim()
  };

  // Send an AJAX POST-request with jQuery
  $.post("/api/new", newMeal)
    // On success, run the following code
    .done(function(data) {
      // Log the data we found
      console.log(data);
    });

  // Empty each input box by replacing the value with an empty string
  $("#meal").val("");
  $("#protein").val("");
  $("#carb").val("");
  $("#veggieFruits").val("");
  $("#fat").val("");
getData();
});


function getData () {
// Make a get request to our api route that will return every book
$.get("/api/all", function(data) {
  // For each book that our server sends us back
  for (var i = 0; i < data.length; i++) {
    // Create a parent div to hold book data
    var wellSection = $("<div>");
    // Add a class to this div: 'well'
    wellSection.addClass("well");
    // Add an id to the well to mark which well it is
    wellSection.attr("id", "book-well-" + i);
    // Append the well to the well section
    $("#well-section").append(wellSection);

    // Now  we add our book data to the well we just placed on the page
    $("#book-well-" + i).append("<h2>Meal" + (i + 1) + ". " + data[i].meal + "</h2>");
    $("#book-well-" + i).append("<h3>protein: " + data[i].protein + "</h4>");
    $("#book-well-" + i).append("<h3>carb: " + data[i].carb + "</h4>");
    $("#book-well-" + i).append("<h3>veggieFruits: " + data[i].veggieFruits + "</h4>");
    $("#book-well-" + i).append("<h3>fat: " + data[i].fat + "</h4>");

  }
});

}