// Function to render Odd One Out questions as clickable 'circle' options
function renderOddOneOut(questions) {
  const quizContainer = document.querySelector(".quiz_ques ol");
  quizContainer.innerHTML = questions
    .map(
      (question, qIndex) => `
        <li class="questions">
           
            <ol type="a" class="flexwrap">
                ${question.options
                  .map(
                    (option, oIndex) => `
                    <li>
                        <span class="circle-option" data-qindex="${qIndex}" data-oidx="${oIndex}">
                          ${option}
                        </span>
                    </li>
                `
                  )
                  .join("")}
            </ol>
        </li>
    `
    )
    .join("");

  document.getElementById("total-marks").textContent = questions.length;
  addCircleOptionListeners();
}

// Add click listeners to circle options
function addCircleOptionListeners() {
  document.querySelectorAll(".circle-option").forEach((option) => {
    option.addEventListener("click", function () {
      const qIndex = this.getAttribute("data-qindex");
      // Remove circled from all options in this question
      document
        .querySelectorAll(`.circle-option[data-qindex='${qIndex}']`)
        .forEach((opt) => {
          opt.classList.remove("circled");
        });
      // Add circled to clicked option
      this.classList.add("circled");
    });
  });
}

// Function to check answers for Odd One Out
function checkOddOneOutAnswers(questions) {
  let score = 0;
  let totalQuestions = questions.length;

  document.querySelectorAll(".quiz_ques > ol > li").forEach((question) => {
    question.classList.remove("submit-correct", "submit-incorrect");
  });

  questions.forEach((question, index) => {
    const circledOption = document.querySelector(
      `.circle-option[data-qindex='${index}'].circled`
    );
    const questionElement = document.querySelectorAll(".quiz_ques > ol > li")[
      index
    ];
    if (circledOption) {
      const selectedValue = parseInt(circledOption.getAttribute("data-oidx"));
      if (selectedValue === question.odd) {
        score++;
        circledOption.classList.add("correct-circle");
        questionElement.classList.add("submit-correct");
      } else {
        circledOption.classList.add("incorrect-circle");
        questionElement.classList.add("submit-incorrect");
      }
    }
  });

  document.getElementById("total-score").textContent = score;
  document.getElementById("total-marks").textContent = totalQuestions;
  document.querySelector(".score").style.display = "block";
  const feedback = document.getElementById("feedback");
  feedback.style.display = "block";

  feedback.textContent =
    score === totalQuestions
      ? "Excellent! All answers are correct!"
      : "Some answers are incorrect. Try again!";
  feedback.className = `feedback ${
    score === totalQuestions ? "correct" : "incorrect"
  }`;

  score === totalQuestions
    ? document.getElementById("audio-clap").play()
    : document.getElementById("audio-try-again").play();

  // Disable all options after submission
  document.querySelectorAll(".circle-option").forEach((option) => {
    option.classList.add("disabled");
    option.style.pointerEvents = "none";
  });

  // Change submit button to show answers
  const submitButton = document.getElementById("btn-submit");
  submitButton.textContent = "Show Answers";
  submitButton.onclick = () => showOddOneOutAnswers(questions);
}

// Function to show correct answers
function showOddOneOutAnswers(questions) {
  document.querySelectorAll(".quiz_ques > ol > li").forEach((question) => {
    question.classList.remove("submit-correct", "submit-incorrect");
  });

  document.querySelectorAll(".circle-option").forEach((option) => {
    option.classList.remove("circled", "correct-circle", "incorrect-circle");
  });

  questions.forEach((question, index) => {
    const correctOption = document.querySelector(
      `.circle-option[data-qindex='${index}'][data-oidx='${question.odd}']`
    );
    if (correctOption) {
      correctOption.classList.add("circled", "correct-circle");
    }
  });

  document.querySelector(".score").style.display = "none";
}

// Function to reset the quiz
function resetOddOneOutQuiz(questions) {
  document.querySelectorAll(".circle-option").forEach((option) => {
    option.classList.remove(
      "circled",
      "correct-circle",
      "incorrect-circle",
      "disabled"
    );
    option.style.pointerEvents = "";
  });

  document.querySelectorAll(".quiz_ques > ol > li").forEach((question) => {
    question.classList.remove("submit-correct", "submit-incorrect");
  });

  const submitButton = document.getElementById("btn-submit");
  submitButton.textContent = "Submit";
  submitButton.onclick = () => checkOddOneOutAnswers(questions);

  document.querySelector(".feedback").style.display = "none";
  document.querySelector(".score").style.display = "none";
}

// Initialization function
function initOddOneOutQuiz(questions) {
  renderOddOneOut(questions);
  document.getElementById("btn-submit").onclick = () =>
    checkOddOneOutAnswers(questions);
  document.getElementById("btn-reset").onclick = () =>
    resetOddOneOutQuiz(questions);
  try {
    document.getElementById("audio-intro").play();
  } catch (err) {}
}
