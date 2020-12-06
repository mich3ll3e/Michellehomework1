// Create a Start Button & Elements
var startbtn = document.querySelector(".start-btn");
var startEl = document.querySelector (".wrapper");
var questionContainer = document.getElementById("question-container");
var shuffledQuestions, currentQuestionIndex;
var questionsEl = document.getElementById('question');
var answerButton = document.getElementById('answer-btn');
var FeedbackEl = document.getElementById("feedback");
var endEl = document.getElementById("endgame");
var finalScoreEl = document.getElementById("final-score");
var initialsEl = document.getElementById("initials");
var submitBtn = document.getElementById("submit");
//Start button
startbtn.addEventListener("click",function(e) {
    e.preventDefault();
    startbtn.classList.add("hide");
    startEl.classList.add("hide");
    questionContainer.classList.remove("hide");
    shuffledQuestions = questions.sort(() => Math.random()-0.5);
    currentQuestionIndex = 0;
    StartTimer();
    SetQuestions();
});

// Start Timer
var timeLeft = 75;
var timeEl = document.getElementById("time");
function StartTimer() {


    var timeInterval = setInterval(function() {
      timeEl.textContent = "Time: " + timeLeft;
      timeLeft--;

      if (timeLeft === 0) {
        timeEl.textContent = "";
        clearInterval(timeInterval);
      }

    }, 1000);


};

function SetQuestions(){
  resetState()
 showQuestion(shuffledQuestions[currentQuestionIndex])
}

function showQuestion(question){
  questionsEl.innerText = question.question
  question.answer.forEach(answer => {
    const button = document.createElement('button')
    button.innerText = answer.text
    button.classList.add("button")
    if (answer.correct) {
      button.dataset.correct=answer.correct
    }
    button.addEventListener('click',selectAnswer)
    answerButton.appendChild(button)
  });
}

function resetState() {
  while(answerButton.firstChild) {
    answerButton.removeChild
    (answerButton.firstChild)
  }
}
// Select Answers
function selectAnswer(e) {
  var selectButton = e.target
  var correct = selectButton.dataset.correct
if (selectButton = correct) {
      FeedbackEl.textContent = "Correct!";
    } else {
      timeLeft -= 15;

      if (timeLeft < 0) {
        timeLeft = 0;
        quizEnd();
      }
      //Display time on the page
      timeEl.textContent = "Time:" + timeLeft;
      FeedbackEl.textContent = "Wrong!";
    } 
  
  FeedbackEl.setAttribute("class","feedback");
  setTimeout(function() {
    FeedbackEl.setAttribute("class", "feedback hide");
  },1000);
  
  // Move onto the next question;
  currentQuestionIndex++;

  // Check if running out of questions
  if (currentQuestionIndex === questions.length -1) {
    quizEnd ();
  } else {
    resetState();
    showQuestion(shuffledQuestions[currentQuestionIndex]);
  }
}

// Quiz End 
function quizEnd () {
  //Stop Timer
  clearInterval(timeEl);
  timeEl.classList.add("hide");
  questionContainer.classList.add("hide");
  FeedbackEl.classList.add("hide");
  endEl.classList.remove("hide");
  finalScoreEl.textContent = timeLeft;
}

//Storage Score
function saveScore() {
  var initials = initialsEl.value.trim();
  if (initials != "") {
    var highscores = 
    JSON.parse(window.localStorage.getItem("highscores")) || [];

    // Format score object for current user
    var newScore = {
      score: timeLeft,
      initials: initials
    };

    highscores.push(newScore);
    window.localStorage.setItem("highscores",JSON.stringify(highscores));
    
    // Direct to Score Page
    window.location.href = "scoreboard.html";
  }
}
function checkEnterValue (event) {
  if (event.key === "Enter") {
    saveScore();
  }
}
// Add functionality to Submit Button
submitBtn.onclick = saveScore;
initialsEl.onkeyup = checkEnterValue;

//Listed Questions of Coding Quiz
const questions = [
    {question: "Where is the JavaScript placed inside an HTML document or page?",
      answer: [
      {text: 'In the <footer> section.', correct:false },
      {text: 'In the <title> section.', correct:false },
      {text: 'In the <meta> section.', correct:false },
      {text:'In the <body> and <head> sections.', correct:true}
    ]
    },

    {question: "In JavaScript, what is used in conjunction with HTML to “react” to certain elements?",

    answer: [
    {text: 'Events', correct:true },
    {text: 'Boolean', correct:false },
    {text: 'RegExp', correct:false },
    {text:'Condition', correct:false }
  ]
},

    {question: "What is the name of the stylesheet that defines the presentation of an HTML or XML document?",

    answer:[
    {text: 'CSS',  correct:true },
    {text: 'Java',  correct:false },
    {text: 'PHP', correct:false },
    {text: 'jQuery', correct:false }
  ]
    },

    {question: "What is the box called in CSS that wraps around every HTML element?",

    answer: [
    {text: 'Box-model', correct:true },
    {text: 'Wrap', correct:false },
    {text: 'Boundary', correct:false },
    {text: 'Float', correct:false }
  ]
    },

    {question: "Cass can be used to greatly improve the ____ of an HTML form.",

    answer:[
    {text: 'Appearance', correct:true },
    {text: 'Colors', correct:false },
    {text: 'Performance', correct:false },
    {text: 'Layout', correct:false }
  ]
    }

];