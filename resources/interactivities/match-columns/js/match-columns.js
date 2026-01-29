// --- SVG Line Drawing Helpers ---
function drawMatchLines(questions) {
  const svg = document.getElementById("match-lines-svg");
  svg.innerHTML = "";
  const leftItems = document.querySelectorAll(".match-item.left");
  const rightItems = document.querySelectorAll(".match-item.right");
  userMatches.forEach((rightIdx, leftIdx) => {
    if (typeof rightIdx === "number" && rightIdx >= 0) {
      const leftEl = leftItems[leftIdx];
      const rightEl = rightItems[rightIdx];
      if (leftEl && rightEl) {
        const leftRect = leftEl.getBoundingClientRect();
        const rightRect = rightEl.getBoundingClientRect();
        const svgRect = svg.getBoundingClientRect();
        // Calculate center points relative to SVG
        const x1 = leftRect.right - svgRect.left;
        const y1 = leftRect.top + leftRect.height / 2 - svgRect.top;
        const x2 = rightRect.left - svgRect.left;
        const y2 = rightRect.top + rightRect.height / 2 - svgRect.top;
        const line = document.createElementNS(
          "http://www.w3.org/2000/svg",
          "line"
        );
        line.setAttribute("x1", x1);
        line.setAttribute("y1", y1);
        line.setAttribute("x2", x2);
        line.setAttribute("y2", y2);
        line.setAttribute("stroke", "#1976d2");
        line.setAttribute("stroke-width", "3");
        line.setAttribute("stroke-linecap", "round");
        svg.appendChild(line);
      }
    }
  });
}

function clearMatchLines() {
  const svg = document.getElementById("match-lines-svg");
  if (svg) svg.innerHTML = "";
}

// --- Render and Logic ---
function renderMatchColumns(questions) {
  const colA = document.querySelector(".column-a");
  const colB = document.querySelector(".column-b");
  colA.innerHTML = "";
  colB.innerHTML = "";

  questions.left.forEach((item, idx) => {
    colA.innerHTML += `<li class="match-item left" data-index="${idx}"><span class="label">${String.fromCharCode(
      97 + idx
    )})</span> ${item}</li>`;
  });
  questions.right.forEach((item, idx) => {
    colB.innerHTML += `<li class="match-item right" data-index="${idx}"><span class="label">${
      idx + 1
    }</span> ${item}</li>`;
  });

  addMatchListeners();
  setTimeout(() => {
    drawMatchLines(questions);
  }, 100); // Draw lines and set height after DOM update
}

let selectedLeft = null;
let userMatches = [];

function addMatchListeners() {
  document.querySelectorAll(".match-item.left").forEach((item) => {
    item.onclick = function () {
      document
        .querySelectorAll(".match-item.left")
        .forEach((i) => i.classList.remove("selected"));
      this.classList.add("selected");
      selectedLeft = this.getAttribute("data-index");
    };
  });
  document.querySelectorAll(".match-item.right").forEach((item) => {
    item.onclick = function () {
      if (selectedLeft !== null) {
        userMatches[selectedLeft] = parseInt(this.getAttribute("data-index"));
        document
          .querySelectorAll(".match-item.right")
          .forEach((i) => i.classList.remove("selected"));
        this.classList.add("selected");
        document
          .querySelector(`.match-item.left[data-index='${selectedLeft}']`)
          .classList.add("matched");
        selectedLeft = null;
        drawMatchLines(matchColumnsQuestions);
      }
    };
  });
}

function checkMatchColumnsAnswers(questions) {
  let score = 0;
  let total = questions.left.length;
  document.querySelectorAll(".match-item.left").forEach((item, idx) => {
    item.classList.remove("correct-match", "incorrect-match");
    if (userMatches[idx] === questions.matches[idx]) {
      item.classList.add("correct-match");
      score++;
    } else {
      item.classList.add("incorrect-match");
    }
  });
  document.getElementById("total-score").textContent = score;
  document.getElementById("total-marks").textContent = total;
  document.querySelector(".score").style.display = "block";
  const feedback = document.getElementById("feedback");
  feedback.style.display = "block";
  feedback.textContent =
    score === total
      ? "Excellent! All answers are correct!"
      : "Some answers are incorrect. Try again!";
  feedback.className = `feedback ${score === total ? "correct" : "incorrect"}`;
  score === total
    ? document.getElementById("audio-clap").play()
    : document.getElementById("audio-try-again").play();
  document
    .querySelectorAll(".match-item")
    .forEach((i) => (i.style.pointerEvents = "none"));
  document.getElementById("btn-submit").textContent = "Show Answers";
  document.getElementById("btn-submit").onclick = () =>
    showMatchColumnsAnswers(questions);
}

function showMatchColumnsAnswers(questions) {
  document.querySelectorAll(".match-item.left").forEach((item, idx) => {
    item.classList.remove(
      "correct-match",
      "incorrect-match",
      "matched",
      "selected"
    );
    const rightIdx = questions.matches[idx];
    const rightItem = document.querySelector(
      `.match-item.right[data-index='${rightIdx}']`
    );
    if (rightItem) rightItem.classList.add("selected");
    item.classList.add("correct-match");
    userMatches[idx] = rightIdx;
  });
  drawMatchLines(questions);
  document.querySelector(".score").style.display = "none";
}

function resetMatchColumnsQuiz(questions) {
  userMatches = [];
  selectedLeft = null;
  document.querySelectorAll(".match-item").forEach((i) => {
    i.classList.remove(
      "selected",
      "matched",
      "correct-match",
      "incorrect-match"
    );
    i.style.pointerEvents = "";
  });
  clearMatchLines();
  document.getElementById("btn-submit").textContent = "Submit";
  document.getElementById("btn-submit").onclick = () =>
    checkMatchColumnsAnswers(questions);
  document.querySelector(".feedback").style.display = "none";
  document.querySelector(".score").style.display = "none";
}



function initMatchColumnsQuiz(questions) {
  renderMatchColumns(questions);
  userMatches = [];
  selectedLeft = null;
  document.getElementById("btn-submit").onclick = () =>
    checkMatchColumnsAnswers(questions);
  document.getElementById("btn-reset").onclick = () =>
    resetMatchColumnsQuiz(questions);
  window.addEventListener("resize", () => {
    drawMatchLines(questions);
  });
  try {
    document.getElementById("audio-intro").play();
  } catch (err) {}
}
