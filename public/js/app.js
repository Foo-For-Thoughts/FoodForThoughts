$(document).ready(function() {

var userID = undefined;
var maealData = [];
  //submit a meal
  $("#meal-form").on("submit", handleMealDataSumbit);

  function handleMealDataSumbit(event){
    event.preventDefault();
    $.ajax({
      method: "POST",
      url: "/postmeals",
      data: mealData
    })
    .done(function(data) {
      console.log(data);
    });

  }; // closing handleMealDataSubmit

// from chart html
//   $("#defaultOpen").on("click", getUserID);
//   function getUserID(){
//     console.log("haha")
//     $.get("/api/user_data", function(data){
//         userID = data.id
//         console.log("userID = " + userID)
//     })
//   };

// //THE GET REQUEST URL SHOULD BE /MEALS/DATEVARIABLE/USERID
//   $(".tablink").on("click", getMealData);
//   window.getMealData = getMealData;
//   function getMealData(){
//     var range = $(this).attr("num");
//     var path ="/meals/" + range + "/" + userID;
//     $.ajax({
//       url: path
//     }).done(function(data){
//       console.log(data)
//       mealData = data
//   })
//   }



})// closing ready function