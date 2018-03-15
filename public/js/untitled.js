<!DOCTYPE html>
<html lang="en" ng-app>
<head>
  <meta charset="UTF-8">
  <title>Food for Thoughts - charts</title>
  <!-- Latest compiled and minified CSS -->
  <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.2.1/jquery.min.js"></script>
  <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap.min.css" integrity="sha384-BVYiiSIFeK1dGmJRAkycuHAHRg32OmUcww7on3RYdg4Va+PmSTsz/K68vbdEjh4u" crossorigin="anonymous">
  <link rel="stylesheet" href="../bootstrap-3.3.7-dist/css/bootstrap.min.css">
  <script src="https://ajax.googleapis.com/ajax/libs/angularjs/1.6.6/angular.min.js"></script>
  <script type="text/javascript" src="https://cdnjs.cloudflare.com/ajax/libs/Chart.js/2.7.1/Chart.bundle.min.js"></script>
  <link rel="stylesheet" href="css/style.css"> 
  <!-- <script src="./js/app.js"></script> -->
  <link href="https://fonts.googleapis.com/css?family=Patrick+Hand|Source+Code+Pro" rel="stylesheet">
</head>
<body id="html-body">
  <div class="container">
    <div class="row">
        <div class="big-header">
          <p class="text-right">Analysis</p>
        </div> <!-- today's date -->
    </div> <!-- first row -->
    <div class="row">
      <div id="Today" class="tabcontent">
        <h3>Today</h3>
        <p>How are you today?</p>
      </div>

      <div id="This-Week" class="tabcontent">
        <h3>This Week</h3>
        <p>This Week is looking great!</p> 
      </div>

      <div id="This-Month" class="tabcontent">
        <h3>This Month</h3>
        <p>How did you do this Month?</p>
      </div>

      <div id="This-Year" class="tabcontent">
        <h3>This Year</h3>
        <p>This Year's progress</p>
      </div>

    <button class="tablink" onclick="openTabs('Today', this, 'red')" id="defaultOpen">Today</button>
    <button class="tablink" onclick="openTabs('This-Week', this, 'green')">This Week</button>
    <button class="tablink" onclick="openTabs('This-Month', this, 'blue')">This Month</button>
    <button class="tablink" onclick="openTabs('This-Year', this, 'orange')">This Year</button>

    </div>
    <div class="row">
      <canvas id="progress-chart"></canvas>
    </div> <!-- range select  -->
  </div><!-- closing container -->
<!--   <footer class="footer">
  <p>cool things like github and main page pr presentation etc</p>
  <p>hello I'm {{ 5 + 5 }} testing anguler</p>
  </footer> -->
<!--   put JS links in here -->
<script>

  var userID = undefined;
  getUserID()

//test data

// var mealData = [
//       {
//         "user": "Yoko",
//         "meal": "breakfast",
//         "protein": 0,
//         "carb": 5,
//         "fat": 0,
//         "veggies": 1,
//         "time_created": "2017-11-28T23:16:13.000Z"
//       },
//       {
//         "user": "Yoko",
//         "meal": "lunch",
//         "protein": 0,
//         "carb": 5,
//         "fat": 0,
//         "veggies": 1,
//         "time_created": '2017-11-28T23:16:13.000Z'
//       },
//       {
//         "user": "Yoko",
//         "meal": "snack",
//         "protein": 0,
//         "carb": 5,
//         "fat": 0,
//         "veggies": 1,
//         "time_created": '2017-11-28T23:16:13.000Z'
//       },
//       {
//         "user": "Yoko",
//         "meal": "breakfast",
//         "protein": 0,
//         "carb": 5,
//         "fat": 0,
//         "veggies": 1,
//         "time_created": '2017-11-29T23:16:13.000Z'
//       },
//       {
//         "user": "Yoko",
//         "meal": "breakfast",
//         "protein": 2,
//         "carb": 3,
//         "fat": 1,
//         "veggies": 2,
//         "time_created": '2017-11-29T23:16:13.000Z'
//       },
//       {
//         "user": "Yoko",
//         "meal": "breakfast",
//         "protein": 2,
//         "carb": 3,
//         "fat": 1,
//         "veggies": 0,
//         "time_created": '2017-11-30T23:16:13.000Z'
//       },
//       {
//         "user": "Yoko",
//         "meal": "breakfast",
//         "protein": 2,
//         "carb": 3,
//         "fat": 1,
//         "veggies": 0,
//         "time_created": '2017-12-01T23:16:13.000Z'
//       },
//       {
//         "user": "Yoko",
//         "meal": "dinner",
//         "protein": 1,
//         "carb": 6,
//         "fat": 0,
//         "veggies": 4,
//         "time_created": '2017-12-02T23:16:13.000Z'
//       },
//       {
//         "user": "Yoko",
//         "meal": "snack",
//         "protein": 0,
//         "carb": 3,
//         "fat": 1,
//         "veggies": 0,
//         "time_created": '2017-12-03T23:16:13.000Z'
//       },
//       {
//         "user": "Yoko",
//         "meal": "breakfast",
//         "protein": 0,
//         "carb": 3,
//         "fat": 2,
//         "veggies": 0,
//         "time_created": '2017-12-04T23:16:13.000Z'
//       },
//       {
//         "user": "Yoko",
//         "meal": "Dinner",
//         "protein": 2,
//         "carb": 3,
//         "fat": 1,
//         "veggies": 0,
//         "time_created": '2017-12-04T23:16:13.000Z'
//       },
//       {
//         "user": "Yoko",
//         "meal": "breakfast",
//         "protein": 3,
//         "carb": 3,
//         "fat": 1,
//         "veggies": 6,
//         "time_created": '2017-12-06T23:16:13.000Z'
//       },
//       {
//         "user": "Yoko",
//         "meal": "Lunch",
//         "protein": 5,
//         "carb": 5,
//         "fat": 1,
//         "veggies": 6,
//         "time_created": '2017-12-06T23:16:13.000Z'
//       },
//       {
//         "user": "Yoko",
//         "meal": "Dinner",
//         "protein": 4,
//         "carb": 3,
//         "fat": 1,
//         "veggies": 1,
//         "time_created": '2017-12-06T23:16:13.000Z'
//       },
//       {
//         "user": "Yoko",
//         "meal": "late night snack",
//         "protein": 2,
//         "carb": 1,
//         "fat": 0,
//         "veggies": 0,
//         "time_created": '2017-12-06T23:16:13.000Z'
//       }
//     ]//sample meal data


function openTabs(range,elmnt,color) {

    var i, tabcontent, tablinks;
    tabcontent = document.getElementsByClassName("tabcontent");
    for (i = 0; i < tabcontent.length; i++) {
        tabcontent[i].style.display = "none";
    }
    tablinks = document.getElementsByClassName("tablink");
    for (i = 0; i < tablinks.length; i++) {
        tablinks[i].style.backgroundColor = "";
    }
    document.getElementById(range).style.display = "block";
    elmnt.style.backgroundColor = color;

    // buildChart(range);

//THE GET REQUEST URL SHOULD BE /MEALS/DATEVARIABLE/USERID

    $.ajax({
      url: "/meals/365/"+userID
    }).done(function(data){
      console.log(data)
    })


}

  function getUserID(){
    $.get("/api/user_data", function(data){
        userID = data.id
        console.log("userID = " + userID)
        openTabs('Today', document.getElementById("defaultOpen"), 'red')
        
    })
  }


</script>

</body>
</html>