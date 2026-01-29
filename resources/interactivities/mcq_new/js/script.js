// Function to generate HTML for questions
function renderQuestions() {
  const quizContainer = document.querySelector(".quiz_ques ol");
  quizContainer.innerHTML = questions
    .map(
      (question, qIndex) => `
        <li class="questions">
            <h3>${question.title}</h3>
            <ol type="i" class="flexwrap">
                ${question.options
                  .map(
                    (option, oIndex) => `
                    <li>
                        <span class="labelwrap checkbox">
                           <input type="checkbox" id="q${qIndex + 1}_${
                      oIndex + 1
                    }" name="q${qIndex + 1}">
                     <span class="checkbox-text">
                     ${option}
                     </span>
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

  // Update total marks
  document.getElementById("total-marks").textContent = questions.length;

  // Add event listeners to checkboxes
  addCheckboxListeners();
  try {
    document.getElementById("audio-intro").play();
  } catch (err) {}
}

// Function to check answers when submit button is clicked
function checkAnswers() {
  let score = 0;
  let totalQuestions = questions.length;

  // Remove previous feedback
  document.querySelectorAll(".quiz_ques > ol > li").forEach((question) => {
    question.classList.remove("submit-correct", "submit-incorrect");
  });

  // Check each question
  questions.forEach((question, index) => {
    const questionId = `q${index + 1}`;
    const selectedOption = document.querySelector(
      `input[name="${questionId}"]:checked`
    );
    const questionElement = selectedOption?.closest("li");

    if (selectedOption) {
      const selectedValue = parseInt(selectedOption.id.split("_")[1]) - 1;
      if (selectedValue === question.correct) {
        score++;
        questionElement.classList.add("submit-correct");
      } else {
        questionElement.classList.add("submit-incorrect");
      }
    }
  });

  // Update score display
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

  // Disable all checkboxes after submission
  document.querySelectorAll('input[type="checkbox"]').forEach((checkbox) => {
    checkbox.disabled = true;
  });

  // Change submit button to show answers
  const submitButton = document.getElementById("btn-submit");
  submitButton.textContent = "Show Answers";
  submitButton.onclick = showAnswers;
}

// Function to show correct answers
function showAnswers() {
  // Remove feedback classes
  document.querySelectorAll(".quiz_ques > ol > li").forEach((question) => {
    question.classList.remove("submit-correct", "submit-incorrect");
  });

  // Uncheck all checkboxes
  document.querySelectorAll('input[type="checkbox"]').forEach((checkbox) => {
    checkbox.checked = false;
  });

  // Check correct answers
  questions.forEach((question, index) => {
    const correctCheckbox = document.getElementById(
      `q${index + 1}_${question.correct + 1}`
    );
    if (correctCheckbox) {
      correctCheckbox.checked = true;
    }
  });

  // Hide score
  document.querySelector(".score").style.display = "none";
}

// Function to reset the quiz
function resetQuiz() {
  // Enable all checkboxes
  document.querySelectorAll('input[type="checkbox"]').forEach((checkbox) => {
    checkbox.disabled = false;
    checkbox.checked = false;
  });

  // Remove feedback classes
  document.querySelectorAll(".quiz_ques > ol > li").forEach((question) => {
    question.classList.remove("submit-correct", "submit-incorrect");
  });

  // Reset submit button
  const submitButton = document.getElementById("btn-submit");
  submitButton.textContent = "Submit";
  submitButton.onclick = checkAnswers;

  // Hide score
  document.querySelector(".feedback").style.display = "none";
  document.querySelector(".score").style.display = "none";
}

// Function to add checkbox event listeners
function addCheckboxListeners() {
  document.querySelectorAll('input[type="checkbox"]').forEach((checkbox) => {
    checkbox.addEventListener("change", function () {
      if (this.checked) {
        // Uncheck all other checkboxes in the same question
        const name = this.name;
        document.querySelectorAll(`input[name="${name}"]`).forEach((cb) => {
          if (cb !== this) cb.checked = false;
        });
      }
    });
  });
}

// Initialize the quiz when the DOM is loaded
document.addEventListener("DOMContentLoaded", () => {
  renderQuestions();
  document.getElementById("btn-submit").onclick = checkAnswers;
  document.getElementById("btn-reset").onclick = resetQuiz;
});
