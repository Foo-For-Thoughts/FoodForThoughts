$(document).ready(function() {

  getMeals;

  //submit a meal
  $(#submit).on("sumbit", handleMealDataSumbit)


  function handleMealDataSumbit(event){
    event.preventDefault();

    var mealData = {
      user: "FlyingUnicorn",
      meal: "Late night snack",
      protein: 0,
      fat: 1,
      carb: 2,
      vaggie: 0

    };

    $.ajax({
      method: "POST",
      url: "/api/meals",
      data: mealData
    })
    .done(function() {
      console.log("did I just add a meal?")
      getMeals;
    });

  } // closing handleMealDataSubmit

  function getMeals(){
    $.get("/api/meals", renderMealData)
  } // closing getMeals

  function renderMealData(){
    console.log("yay I'm in render meal data")
  } // closing renderMealData


} // closing ready function