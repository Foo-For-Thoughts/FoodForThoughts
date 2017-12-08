$(document).ready(function() {
  // console.log("I'm in app")

  getMeals();

  //submit a meal
  $("#meal-form").on("sumbit", handleMealDataSumbit);


  function handleMealDataSumbit(event){
    event.preventDefault();


    $.ajax({
      method: "POST",
      url: "/api/meals",
      data: mealData
    })
    .done(function() {
      console.log(mealData)
      getMeals;
    });

  }; // closing handleMealDataSubmit

  function getMeals(){
    console.log("I'm in get meals")
    $.get("/meals", renderMealData)
  }; // closing getMeals

  function getAllMeals(){
    console.log("I'm in get meals")
    $.get("/meals/all", renderAllMealData)
  }; // closing getMeals

  function renderMealData(){
    console.log("yay I'm in render meal data")
  }; // closing renderMealData



})// closing ready function