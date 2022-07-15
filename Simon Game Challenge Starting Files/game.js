//arry of bottons
let buttonColors = [
  "red",
  "blue",
  "green",
  "yellow"
];
//the arry contining the order of the bottons the game has set fot the player
let gamePattern = [];
//the arry containing the order of the bottons the player has chosen
let userClickedPattern = [];
//the variable deciding whether or not the game has started
let started = false;
//the current level the player is on
let level = 0;

/*this detects when a user presses a key and then
1.checks if the started variable is not true
2.if the started variable is not true, query for the id of "level-title" and
  replace the text with the string "Level " concatinated with the value of the
  variable level.
4.then  call the function nextSequence().
5.set the variable started to true .


*/
$(document).keydown(function() {
  if (!started) {
    $("#level-title").text("Level " + level);
    nextSequence();
    started = true;
  }
});
/*
 this detects when a user clicks on a botton and then
1.creates a variable called userChosenColour and sets the value to the id(color)
  of the bottn that got clicked
2.push the value of userChosenColour onto the userClickedPattern array,
  this keeps track of the colors and the order of colors the player has clicked
3.call the playSound(name) function and pass in the arugument of userChosenColour
  this plays the sound of the botton the player clicks.
4.call the animatePress(currentColor) function and pass in the arugument of
  userChosenColour this animates the botton the player clicks
5.call the checkAnswer(currentLevel) function and pass in an argument of
  userClickedPattern.length -  1(the length of the userClickedPattern arry)
  this checks to see if you got the write answer or not.

*/
$(".btn").click(function() {

  let userChosenColour = $(this).attr("id");
  userClickedPattern.push(userChosenColour);

  playSound(userChosenColour);
  animatePress(userChosenColour);
  checkAnswer(userClickedPattern.length - 1);

});
/*
 this function startOver()
 1.resest the variables level, gamePattern, and started back to
   their defalt valuse.
*/
function startOver(){
  level = 0;
  gamePattern = [];
  started = false;

};
/*
this function checkAnswer()
1.checks if the current id(color) of the botton the game set for the player,
  matches with the id of the button the user clicked
2.then if 1. is true, it checks if the amount of bottons the game has set for the player,
  matches the amount of bottons the player has clicked.
3.then if both 1. and 2. are true it sets a delay(setTimeout) of
  1000 milliseconds then calls the nextSequence() function and sets the
  next sequence(color) for the player.
4.if 1 is not true then 5-9 happen, if it is we ignore 5-9.
                        |||||||||||
5.it calls the play sound function which plays the wrong.mp3 in the sounds folder.
6.querys for the body of the html file and adds a class of game-over. which
  makes the background red.
7.sets a delay of 200 milliseconds, querys for the body again,
  and removes the class of game-over. changing the color back to its defult
8.querys for the id of level-title and replaces the text with the string,
  "Game Over, Press Any Key to Restart"
9.then it calls the startover() function starting the game over.
*/
function checkAnswer(currentLevel) {
  if (gamePattern[currentLevel] === userClickedPattern[currentLevel]) {
    if (userClickedPattern.length === gamePattern.length) {
      setTimeout(function() {
        nextSequence();
      }, 1000);
    }
  } else {
    playSound("wrong");
    $("body").addClass("game-over");
    setTimeout(function(){
      $("body").removeClass("game-over")
    }, 200);
    $("#level-title").text("Game Over, Press Any Key to Restart");
    startOver()
  }
}

/*
this function nextSequence()
1.resets the userClickedPattern arry back to an empty arry, reseting it for
  the next round
2.incremnts the level variable by 1.
3.querys for the the id of level title, and replaces the text with the string
  "Level " and concatinate it with the current value of the variable level
4.creates variable called randomNumber and set it to the value of a random number
  between 0-3,
5.creates a another variable called randomChosenColor and set it to the value
  of 1 of 4 random colors contained in the buttonColors array
6.then we push randomChosenColor on to the gamePattern array
7.then it querys for the id of randomChosenColor, and animates it to fade in
  and out.
8.then we call the playSound function and pass in and argument of randomChosenColor
  playing a .mp3 of the asosiated color.
*/
function nextSequence() {
  userClickedPattern = [];

  level++;

  $("#level-title").text("Level " + level)

  let randomNumber = Math.floor(Math.random() * 4);
  let randomChosenColor = buttonColors[randomNumber];
  gamePattern.push(randomChosenColor);

  $("#" + randomChosenColor).fadeIn(100).fadeOut(100).fadeIn(100);
  playSound(randomChosenColor);
};
/*
this function - playSound(name)
1.creates a new variable called audio and sets it to the value of a new Audio
  function. the function take an argument of the string "sounds/" concatinated
  with the argument passed into the playSound(name) function, its also
  concatinated with the srting ".mp3". therefore making a sound asosiated with
  1 of 4  colors
2.then it plays the sound we created in 1.
*/
function playSound(name) {
  let audio = new Audio("sounds/" + name + ".mp3");
  audio.play();
};
/*
this function animatePress(currentColor)
1.querys for an id, concatinated with the value of the arugument passed into
  animatePress(currentColor) and adds a class called "pressed"
2.it then sets a dely of 100 milliseconds and removes the class we added to it
  in 1. therefore creating a animating effect.
*/
function animatePress(currentColor) {
  $("#" + currentColor).addClass("pressed");
  setTimeout(function() {
    $("#" + currentColor).removeClass("pressed");
  }, 100);

};
