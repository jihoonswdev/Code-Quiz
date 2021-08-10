var userNmae = document.getElementById('userName');
var userScore = document.getElementById('userScore');
var ClearButton = document.getElementById('clearButton');
var startOver = document.getElementById('startOver');

function loadUserScores() {
    var finalScore = localStorage.getItem("PlayerScore");
    var finalName = localStorage.getItem("userName");
        userName.textContent = finalName;
        userScore.textContent = finalScore;
}

loadUserScores();

ClearButton.addEventListener("click", function () {
    localStorage.clear();
    window.location.reload();
});

startOver.addEventListener("click", function () {
    window.location.replace ("./index.html");

});

var question1 = questions[count].choices[1];
var question2 = questions[count].choices[2];
var question3 = questions[count].choices[3];
var submitButton = document.getElementsByClassName("SubmitBtn");
var PlayerFinalScore = document.getElementById("playerFinalScore");

startQuiz.addEventListener("click", function() {
    ScoreEl.textContent = score;
    TimeEl.textContent = time;
});

submitButton.addEventListener("click", function () {

});