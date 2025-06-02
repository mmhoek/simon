var buttonColors = ["red", "blue", "green", "yellow"];

var gamePattern = [];
var userClickedPattern = [];

var level = 0; // Initialize the game level
var started = false; // Flag to check if the game has started
$(document).ready(function() {
    $("h1").text("Press Any Key to Start"); // Set initial heading
}); 


$(document).keypress(function() {
    if (!started) { // Check if the game has not started
        $("h1").text("Level " + level); // Update heading with current level
        nextSequence(); // Start the game by generating the first sequence
        started = true; // Set the flag to true indicating the game has started
    }
}); // Start the game on keypress

$(".btn").click(function() {
    var userChosenColor = $(this).attr("id"); // Get the id of the clicked button
    userClickedPattern.push(userChosenColor); // Add the chosen color to the user's pattern
   
    playSound(userChosenColor); // Play sound for the chosen color
    animatePress(userChosenColor); // Animate the button press
   
    checkAnswer(userClickedPattern.length); // Check the user's answer
}); // Attach click event to all buttons

function checkAnswer(currentLevel) {
    for (var i = 0; i < currentLevel; i++) {
        if (gamePattern[i] !== userClickedPattern[i]) {
            playSound("wrong"); // Play wrong sound
            $("body").addClass("game-over"); // Add game-over class to body
            setTimeout(function() {
                $("body").removeClass("game-over"); // Remove game-over class after a delay
            }, 200);
            $("h1").text("Game Over, Press Any Key to Restart"); // Update heading for game over
            startOver(); // Call startOver function to reset the game
            return; // Exit the function if the answer is incorrect
        }
    
    }
    if (currentLevel === gamePattern.length) {
        $("h1").text("You passed level " + level); // Update heading with current level if the answer is correct
        userClickedPattern = []; // Reset the user's pattern
        setTimeout(nextSequence, 1000); // Wait for a second before starting the next sequence
    }
};

function nextSequence() {
    var randomNumber = Math.floor(Math.random() * 4); 
    
    var randomChosenColor = buttonColors[randomNumber];

    level++; // Increment the level 
    $("h1").text("Level " + level); // Update the heading with the current level
    
    gamePattern.push(randomChosenColor);

    playSound(randomChosenColor); // Play sound for the chosen color

    randomChosenColor = "#" + randomChosenColor; // Convert to class selector for jQuery
    $(randomChosenColor).fadeOut(100).fadeIn(100).fadeOut(100).fadeIn(100); // jQuery to animate the button
    // as both class and id have the same name, we can use either one i.e. . or # selector
}

function startOver() {
    level = 0; // Reset the level
    gamePattern = []; // Reset the game pattern
    clickedPattern = []; // Reset the user's clicked pattern
    started = false; // Reset the started flag
} // Function to reset the game

function playSound(name) {
    var audio = new Audio("./sounds/" + name + ".mp3");
    audio.play();
}

function animatePress(currentColor) {
    $("#" + currentColor).addClass("pressed");
    setTimeout(function() {
        $("#" + currentColor).removeClass("pressed");
    }, 100);
}