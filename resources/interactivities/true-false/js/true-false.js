// Initialize the quiz with provided statements
function initializeQuiz(statements) {
  const container = document.getElementById("statements-container");
  statements.forEach((statement, index) => {
    const div = document.createElement("div");
    div.className = "statement-container";

    const statementText = document.createElement("div");
    statementText.className = "statement";
    statementText.innerHTML = `<span class="statement-number">(${String.fromCharCode(
      97 + index
    )})</span> ${statement.text}`;

    const options = document.createElement("div");
    options.className = "options";

    const trueBtn = createOptionButton("True", index);
    const falseBtn = createOptionButton("False", index);

    options.appendChild(trueBtn);
    options.appendChild(falseBtn);

    div.appendChild(statementText);
    div.appendChild(options);
    container.appendChild(div);
  });
  try {
    document.getElementById("audio-intro").play();
  } catch (err) {}
}

// Create an option button
function createOptionButton(value, questionIndex) {
  const button = document.createElement("button");
  button.className = "option-btn";
  button.textContent = value;
  button.onclick = () => selectOption(button, questionIndex);
  return button;
}

// Handle option selection
function selectOption(button, questionIndex) {
  // Remove selected class from all buttons in the same question
  const parentOptions = button.parentElement;
  parentOptions.querySelectorAll(".option-btn").forEach((btn) => {
    btn.classList.remove("selected");
  });

  // Add selected class to clicked button
  button.classList.add("selected");
}

// Check answers
function checkAnswers() {
  let correctCount = 0;
  const selectedButtons = document.querySelectorAll(".option-btn.selected");

  selectedButtons.forEach((button) => {
    const questionIndex = Array.from(
      document.querySelectorAll(".statement-container")
    ).indexOf(button.closest(".statement-container"));
    const isCorrect = button.textContent === statements[questionIndex].answer;

    button.classList.remove("correct", "incorrect");
    button.classList.add(isCorrect ? "correct" : "incorrect");

    if (isCorrect) correctCount++;
  });

  // Show feedback
  const feedback = document.getElementById("feedback");
  const scoreDisplay = document.getElementById("score-display");

  feedback.style.display = "block";
  feedback.textContent =
    correctCount === statements.length
      ? "Excellent! All answers are correct!"
      : "Some answers are incorrect. Try again!";
  feedback.className = `feedback ${
    correctCount === statements.length ? "correct" : "incorrect"
  }`;
  if (correctCount === statements.length) {
    document.getElementById("audio-clap").play();
  } else {
    document.getElementById("audio-try-again").play();
    const showbtn = document.getElementById("showAns");
    document.getElementById("btn-submit").classList.add("hide");
    showbtn.classList.remove("hide");
    // showbtn.style.display = "block";
  }

  scoreDisplay.innerHTML = `Score: <span class="score-correct">${correctCount}</span> / <span class="score-total">${statements.length}</span>`;
  scoreDisplay.style.display = "block";
}

function showAns() {
  const ans = document.querySelectorAll(".option-btn");
  ans.forEach((button) => {
    const questionIndex = Array.from(
      document.querySelectorAll(".statement-container")
    ).indexOf(button.closest(".statement-container"));
    if (button.textContent === statements[questionIndex].answer) {
      button.classList.remove("correct", "incorrect");
      button.classList.add("correct");
    }
  });
}

// Reset quiz
function resetQuiz() {
  document.querySelectorAll(".option-btn").forEach((button) => {
    button.classList.remove("selected", "correct", "incorrect","hide");
  });
  document.getElementById("btn-submit").classList.remove("hide");
  document.getElementById("showAns").classList.add("hide");

  document.getElementById("feedback").style.display = "none";
  document.getElementById("score-display").style.display = "none";
}
