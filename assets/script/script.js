var score = 0;
var currentQuestionIndex = 0;

var countDown = document.querySelector("#countDown");
var timer = document.querySelector("#startTime");
var questionScreen = document.querySelector("#questionScreen");
var wrapper = document.querySelector("#wrapper");

var secondsLeft = 60;
var holdInterval = 0;
var penalty = 10;
var ulCreate = document.createElement("ul");

var myQuestions = [
  {
    text: "Commonly used data types DO NOT include:",
    choices: ["strings", "booleans", "alerts", "numbers"],
    correctAnswer: "alerts",
  },
  {
    text: "The condition in an if / else statement is enclosed within ____.",
    choices: ["quotes", "curly brackets", "parentheses", "square brackets"],
    correctAnswer: "parentheses",
  },
  {
    text: "Arrays in Javascript can be used to store ____.",
    choices: [
      "numbers and strings",
      "other arrays",
      "booleans",
      "all of the above",
    ],
    correctAnswer: "all of the above",
  },
  {
    text: "String values must be enclosed within ____ when being assigned to variables.",
    choices: ["commas", "curly brackets", "quotes", "parenthesis"],
    correctAnswer: "quotes",
  },
  {
    text: "A very useful tool for used during development and debugging for printing content to the debugger is:",
    choices: ["Javascript", "terminal / bash", "for loops", "console log"],
    correctAnswer: "console log",
  },
];

timer.addEventListener("click", function () {
  if (holdInterval === 0) {
    holdInterval = setInterval(function () {
      secondsLeft--;
      countDown.textContent = "Time: " + secondsLeft;

      if (secondsLeft <= 0) {
        clearInterval(holdInterval);
        allDone();
        countDown.textContent = "Time's up!";
      }
    }, 1000);
  }
  render(currentQuestionIndex);
});

// Renders questions and choices to page:
function render(currentQuestionIndex) {
  // Clears existing data
  questionScreen.innerHTML = "";
  ulCreate.innerHTML = "";
  // For loops to array
  for (var i = 0; i < myQuestions.length; i++) {
    // Appends (text) questions
    var userQuestion = myQuestions[currentQuestionIndex].text;
    var userChoices = myQuestions[currentQuestionIndex].choices;
    questionScreen.textContent = userQuestion;
  }
  // .forEach question choices
  userChoices.forEach(function (newItem) {
    var listItem = document.createElement("li");
    listItem.textContent = newItem;
    questionScreen.appendChild(ulCreate);
    ulCreate.appendChild(listItem);
    listItem.addEventListener("click", compare);
  });
}
// Compares answer choices
function compare(event) {
  var element = event.target;

  if (element.matches("li")) {
    var createDiv = document.createElement("div");
    createDiv.setAttribute("id", "createDiv");

    if (
      element.textContent == myQuestions[currentQuestionIndex].correctAnswer
    ) {
      score++;
      createDiv.textContent =
        "Correct! The answer is:  " +
        myQuestions[currentQuestionIndex].correctAnswer;
    } else {
      // -10 seconds for every wrong answers
      secondsLeft = secondsLeft - penalty;
      createDiv.textContent =
        "Wrong! The correct answer is:  " +
        myQuestions[currentQuestionIndex].correctAnswer;
    }
  }
  // Current questions
  currentQuestionIndex++;

  if (currentQuestionIndex >= myQuestions.length) {
    // Appends last page
    allDone();
    createDiv.textContent =
      "End of quiz!" +
      " " +
      "You got  " +
      score +
      "/" +
      myQuestions.length +
      " Correct!";
  } else {
    render(currentQuestionIndex);
  }
  questionScreen.appendChild(createDiv);
}
// Appends last page
function allDone() {
  questionScreen.innerHTML = "";
  countDown.innerHTML = "";

  // Heading:
  var createH1 = document.createElement("h1");
  createH1.setAttribute("id", "createH1");
  createH1.textContent = "You're Done!";

  questionScreen.appendChild(createH1);

  // Paragraph
  var createP = document.createElement("p");
  createP.setAttribute("id", "createP");

  questionScreen.appendChild(createP);

  // Calculates time remaining and replaces it with score
  if (secondsLeft >= 0) {
    var timeRemaining = secondsLeft;
    var createP2 = document.createElement("p");
    clearInterval(holdInterval);
    createP.textContent = "Your final score is: " + timeRemaining;

    questionScreen.appendChild(createP2);
  }

  // Label
  var createLabel = document.createElement("label");
  createLabel.setAttribute("id", "createLabel");
  createLabel.textContent = "Enter your initials: ";

  questionScreen.appendChild(createLabel);

  // input
  var createInput = document.createElement("input");
  createInput.setAttribute("type", "text");
  createInput.setAttribute("id", "initials");
  createInput.textContent = "";

  questionScreen.appendChild(createInput);

  // submit
  var createSubmit = document.createElement("button");
  createSubmit.setAttribute("type", "submit");
  createSubmit.setAttribute("id", "Submit");
  createSubmit.textContent = "Submit";

  questionScreen.appendChild(createSubmit);

  // Capture initials and local storage for initials and score
  createSubmit.addEventListener("click", function () {
    var initials = createInput.value;

    if (initials === null) {
      console.log("No value entered!");
    } else {
      var finalScore = {
        initials: initials,
        score: timeRemaining,
      };
      console.log(finalScore);
      var allScores = localStorage.getItem("allScores");
      if (allScores === null) {
        allScores = [];
      } else {
        allScores = JSON.parse(allScores);
      }
      allScores.push(finalScore);
      var newScore = JSON.stringify(allScores);
      localStorage.setItem("allScores", newScore);
      // Goes to final page
      window.location.replace("./highscores.html");
    }
  });
}
