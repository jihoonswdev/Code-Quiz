var score = 0;
var currentQuestion = 0;
var countDown = document.querySelector("#countDown");
var timer = document.querySelector("#startTime");
var questionScreen = document.querySelector("#questionScreen");
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
        final();
        countDown.textContent = "Time's up!";
      }
    }, 1000);
  }
  render(currentQuestion);
});

function render(currentQuestion) {
  questionScreen.innerHTML = "";
  ulCreate.innerHTML = "";

  for (var i = 0; i < myQuestions.length; i++) {
    var userQuestion = myQuestions[currentQuestion].text;
    var userChoices = myQuestions[currentQuestion].choices;
    questionScreen.textContent = userQuestion;
  }

  userChoices.forEach(function (newItem) {
    var listItem = document.createElement("li");
    listItem.textContent = newItem;
    questionScreen.appendChild(ulCreate);
    ulCreate.appendChild(listItem);
    listItem.addEventListener("click", compare);
  });
}

function compare(event) {
  var element = event.target;

  if (element.matches("li")) {
    var createDiv = document.createElement("div");
    createDiv.setAttribute("id", "createDiv");

    if (element.textContent == myQuestions[currentQuestion].correctAnswer) {
      score++;
      createDiv.textContent =
        "Correct! The answer is:  " +
        myQuestions[currentQuestion].correctAnswer;
    } else {
      secondsLeft = secondsLeft - penalty;
      createDiv.textContent =
        "Wrong! The correct answer is:  " +
        myQuestions[currentQuestion].correctAnswer;
    }
  }
  currentQuestion++;

  if (currentQuestion >= myQuestions.length) {
    final();
    createDiv.textContent =
      "End of quiz!" +
      " " +
      "You got  " +
      score +
      "/" +
      myQuestions.length +
      " Correct!";
  } else {
    render(currentQuestion);
  }
  questionScreen.appendChild(createDiv);
}

function final() {
  questionScreen.innerHTML = "";
  countDown.innerHTML = "";

  var createH1 = document.createElement("h1");
  createH1.setAttribute("id", "createH1");
  createH1.textContent = "You're Done!";

  questionScreen.appendChild(createH1);

  var createP = document.createElement("p");
  createP.setAttribute("id", "createP");

  questionScreen.appendChild(createP);

  if (secondsLeft >= 0) {
    var timeRemaining = secondsLeft;
    var createP2 = document.createElement("p");
    clearInterval(holdInterval);
    createP.textContent = "Your final score is: " + timeRemaining;

    questionScreen.appendChild(createP2);
  }

  var createLabel = document.createElement("label");
  createLabel.setAttribute("id", "createLabel");
  createLabel.textContent = "Enter your initials: ";

  questionScreen.appendChild(createLabel);

  var createInput = document.createElement("input");
  createInput.setAttribute("type", "text");
  createInput.setAttribute("id", "initials");
  createInput.textContent = "";

  questionScreen.appendChild(createInput);

  var createSubmit = document.createElement("button");
  createSubmit.setAttribute("type", "submit");
  createSubmit.setAttribute("id", "Submit");
  createSubmit.textContent = "Submit";

  questionScreen.appendChild(createSubmit);
}