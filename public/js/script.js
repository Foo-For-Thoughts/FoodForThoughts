$(document).ready(function() {
  //navigation control

  var navisOpen = 0;
  function openNav() {
    $("#html-body").animate({marginLeft: "250px"}, 150, function() {
      $("#slideSidenav").animate({width: "250px"}, 150);
    });
  }

  function closeNav() {
    $("#slideSidenav").animate({width: "50px"}, 50, function() {
      $("#html-body").animate({marginLeft: "50px"}, 300);
    });
  }
  
  $(document).on("mouseenter", "#slideSidenav", openNav);
  $(document).on("mouseleave", "#slideSidenav", closeNav);

//navigation from index html
  $(document).on("click", "input.go-btn", function(){
    var rout =  $(this).attr("rout") 
    var data = {redirectTo: rout}
    console.log(data)   
    window.location.href = data.redirectTo
  });

//navigation from nav bar 
  $(document).on("click", "i.a", function(){
    var rout =  $(this).attr("href") 
    var data = {redirectTo: href}
    console.log(data)   
    window.location.href = data.redirectTo
  });
  

}); // closing document ready