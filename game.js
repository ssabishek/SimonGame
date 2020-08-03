
var gamePattern = [];
var userClickedPattern = [];
var buttonColours = ["red", "blue", "green", "yellow"];

var started = false;
var level = 0;

$(document).keydown(function() {
  if (!started) {
    $("#level-title").text("Level " + level);
    nextSequence();
    started = true;
  }
});

function playMusic(color){
    var audio = new Audio("sounds/"+color+".mp3");
    audio.play();
  }

  function animatePress(currentColor){
    $("." + currentColor).addClass("pressed");
    setTimeout(function(){$("." + currentColor).removeClass("pressed");},200);
  }

  function checkAnswer(currentLevel){
    if (gamePattern[currentLevel] === userClickedPattern[currentLevel]){
      console.log("sucess");
      if (gamePattern.length === userClickedPattern.length) {
        setTimeout(function(){nextSequence();} , 1000);
      }
    }
    else {
      console.log("wrong");
      playMusic("wrong");
      $("body").addClass("game-over");
      setTimeout(function(){$("body").removeClass("game-over");},200);
      $("#level-title").text("Game Over, Press Any Key to Restart");
      startOver();
    }
  }



function nextSequence() {

  userClickedPattern = [];
  level++;
  var randomNumber = Math.round(Math.random() * 4);

  var randomChosenColour = buttonColours[randomNumber];
  gamePattern.push(randomChosenColour);
  $("#" + randomChosenColour).fadeOut(100).fadeIn(100);

  playMusic(randomChosenColour);
  $("#level-title").text("Level " + level);
  console.log(gamePattern);


}

function startOver() {
level = 0;
gamePattern = [];
started = false;

}



$(".btn").click(function() {

  var userChosenColour = $(this).attr("id");
  userClickedPattern.push(userChosenColour);

  playMusic(userChosenColour);
  animatePress(userChosenColour);

  checkAnswer(userClickedPattern.length-1);
  console.log(userClickedPattern);
});





// $(".btn").click(function(){
//   var userChosenColour = $(this).attr("id");
//   userClickedPattern.push(userChosenColour);
//   playMusic(userChosenColour);
//   animatePress(userChosenColour);
//   checkAnswer(userChosenColour.length - 1);
//   console.log(userClickedPattern);
// });
