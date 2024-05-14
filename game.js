var buttonColours = ["red", "blue", "green", "yellow"];
var gamePattern = [];
var userClickedPattern = [];
var level = 0;
var started = false;

$(document).on('keydown', function (event) {
    startGame();
});

$("h1").on('click', function (event) {
    startGame();
});

function startGame() {
    if (!started) {
        $("h1").text("Level " + level);
        nextSequence();
        started = true;
    }
}

$(".btn").click(function () {
    var chosenColor = $(this).attr("id");
    userClickedPattern.push(chosenColor);

    checkAnswer(userClickedPattern.length - 1);
});

function nextSequence() {
    userClickedPattern = [];
    level++;
    $('h1').text("Level " + level);
    var randomNumber = Math.floor(Math.random() * 4);

    var randomChosenColor = buttonColours[randomNumber];
    gamePattern.push(randomChosenColor);

    $("#" + randomChosenColor).fadeOut(100).fadeIn(100).fadeOut(100).fadeIn(100);
    animatePress(randomChosenColor);
    playSound(randomChosenColor);
}

function checkAnswer(currentLevel) {

    if (gamePattern[currentLevel] === userClickedPattern[currentLevel]) {

        console.log("success");

        if (userClickedPattern.length === gamePattern.length) {
            setTimeout(function () {
                nextSequence();
            }, 1000);
        }

    } else {
        console.log("failed");
        playSound("wrong");
        $("body").addClass("game-over");
        $("h1").text("Game Over, Press Any Key/Click on the text to Restart");

        setTimeout(function () {
            $("body").removeClass("game-over");
        }, 100);

        startOver();
    }

}

function playSound(name) {
    $("#" + name).click(function () {
        $("#" + name).fadeIn(100).fadeOut(100).fadeIn(100);
        var audio = new Audio("sounds/" + name + ".mp3");
        audio.play();
    })
}

function animatePress(name) {
    $("#" + name).click(function () {
        $('.' + name).addClass('.pressed');
        setTimeout(function () {
            $('.' + name).removeClass('.pressed');
        }, 1000);
    })
}

function startOver() {
    level = 0;
    gamePattern = [];
    started = false;
}
