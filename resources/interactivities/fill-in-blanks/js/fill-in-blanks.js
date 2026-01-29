// Initialize the quiz with provided questions
function initializeQuiz(quizData) {
  const container = document.getElementById("quiz-container");

  // Create questions
  quizData.questions.forEach((question, index) => {
    const questionDiv = createQuestion(question, index);
    container.appendChild(questionDiv);
  });
  try {
    document.getElementById("audio-intro").play();
  } catch (err) {}
}

// Create a question element
function createQuestion(question, index) {
  const div = document.createElement("div");
  div.className = "question";

  // Create question text with blanks
  const questionText = document.createElement("div");
  questionText.className = "question-text";

  const parts = question.text.split("___");
  parts.forEach((part, i) => {
    questionText.appendChild(document.createTextNode(part));
    if (i < parts.length - 1) {
      const blank = createBlank(index, i);
      questionText.appendChild(blank);
    }
  });
  div.appendChild(questionText);

  // Create options container for this question
  const optionsContainer = document.createElement("div");
  optionsContainer.className = "question-options";
  question.options.forEach((option) => {
    const optionElement = createDraggableOption(option);
    optionsContainer.appendChild(optionElement);
  });
  div.appendChild(optionsContainer);

  return div;
}

// Create a blank element
function createBlank(questionIndex, blankIndex) {
  const blank = document.createElement("div");
  blank.className = "blank";
  blank.dataset.questionIndex = questionIndex;
  blank.dataset.blankIndex = blankIndex;

  blank.addEventListener("dragover", handleDragOver);
  blank.addEventListener("drop", handleDrop);
  blank.addEventListener("dragenter", () => blank.classList.add("hover"));
  blank.addEventListener("dragleave", () => blank.classList.remove("hover"));

  return blank;
}

// Create a draggable option
function createDraggableOption(text) {
  const option = document.createElement("div");
  option.className = "option";
  option.textContent = text;
  option.draggable = true;

  option.addEventListener("dragstart", handleDragStart);
  option.addEventListener("dragend", handleDragEnd);

  return option;
}

// Drag and drop handlers
function handleDragStart(e) {
  e.target.classList.add("dragging");
  e.dataTransfer.setData("text/plain", e.target.textContent);
}

function handleDragEnd(e) {
  e.target.classList.remove("dragging");
}

function handleDragOver(e) {
  e.preventDefault();
}

function handleDrop(e) {
  e.preventDefault();
  const blank = e.target;
  const text = e.dataTransfer.getData("text/plain");

  if (blank.classList.contains("blank")) {
    blank.textContent = text;
    blank.classList.add("filled");
    blank.classList.remove("hover");
  }
}

// Check answers
function checkAnswers() {
  const blanks = document.querySelectorAll(".blank");
  let allCorrect = true;
  let correctCount = 0;
  let totalBlanks = 0;

  blanks.forEach((blank) => {
    const questionIndex = parseInt(blank.dataset.questionIndex);
    const blankIndex = parseInt(blank.dataset.blankIndex);
    const question = quizData.questions[questionIndex];
    totalBlanks++;

    const correct = Array.isArray(question.correct)
      ? question.correct[blankIndex]
      : question.correct;

    if (blank.textContent === correct) {
      blank.style.backgroundColor = "#e8f5e9";
      correctCount++;
    } else {
      blank.style.backgroundColor = "#ffebee";
      allCorrect = false;
    }
  });

  const feedback = document.getElementById("feedback");
  const scoreDisplay = document.getElementById("score-display");

  feedback.style.display = "block";
  feedback.textContent = allCorrect
    ? "Congratulations! All answers are correct!"
    : "Some answers are incorrect. Try again!";
  feedback.className = `feedback ${allCorrect ? "correct" : "incorrect"}`;

  if (allCorrect) {
    document.getElementById("audio-clap").play();
  } else {
    document.getElementById("audio-try-again").play();
    const showbtn = document.getElementById("showAns");
    document.getElementById("btn-submit").classList.add("hide");
    showbtn.classList.remove("hide");
  }

  // Display score
  scoreDisplay.innerHTML = `Score: <span class="score-correct">${correctCount}</span> / <span class="score-total">${totalBlanks}</span>`;
  scoreDisplay.style.display = "block";
}

// Reset quiz
function resetQuiz() {
  const blanks = document.querySelectorAll(".blank");
  blanks.forEach((blank) => {
    blank.textContent = "";
    blank.style.backgroundColor = "";
    blank.classList.remove("filled");
  });
  document.getElementById("btn-submit").classList.remove("hide");
  document.getElementById("showAns").classList.add("hide");
  const feedback = document.getElementById("feedback");
  const scoreDisplay = document.getElementById("score-display");
  feedback.style.display = "none";
  scoreDisplay.style.display = "none";
}

// Show correct answers
function showAns() {
  const blanks = document.querySelectorAll(".blank");

  blanks.forEach((blank) => {
    const questionIndex = parseInt(blank.dataset.questionIndex);
    const blankIndex = parseInt(blank.dataset.blankIndex);
    const question = quizData.questions[questionIndex];

    const correct = Array.isArray(question.correct)
      ? question.correct[blankIndex]
      : question.correct;

    blank.textContent = correct;
    blank.style.backgroundColor = "#e8f5e9";
    blank.classList.add("filled");
  });
}
