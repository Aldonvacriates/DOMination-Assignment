// =====  DATA  =====
const quizData = [
  {
    question: "Which array method adds an element to the end of an array?",
    options: ["push()", "pop()", "shift()", "unshift()"],
    answer: 0,
  },
  {
    question: "What does === do in JavaScript?",
    options: [
      "Assigns a value",
      "Compares value and type",
      "Concatenates strings",
      "Checks only value",
    ],
    answer: 1,
  },
  {
    question:
      "Which declaration makes a block-scoped variable you can reassign?",
    options: ["var", "let", "const", "define"],
    answer: 1,
  },
  {
    question: "What does document.querySelector('h1') return?",
    options: [
      "All <h1> elements",
      "The first matching element",
      "An HTML string",
      "Undefined if found",
    ],
    answer: 1,
  },
  {
    question: "Which loop is best when you know how many times to repeat?",
    options: ["for", "while", "do...while", "for...in"],
    answer: 0,
  },
];

// =====  ELEMENTS  =====
const welcome = document.getElementById("welcome");
const startBtn = document.getElementById("start");

const quiz = document.getElementById("quiz");
const score = document.getElementById("score");

const qText = document.getElementById("question");
const optionsEl = document.getElementById("options");
const nextBtn = document.getElementById("next");

const qnumEl = document.getElementById("qnum");
const qtotalEl = document.getElementById("qtotal");

const scoreText = document.getElementById("scoreText");
const restartBtn = document.getElementById("restart");
const reviewList = document.getElementById("reviewList");

// =====  STATE  =====
let current = 0;
let points = 0;
let chosenIndex = null;
const history = [];

// =====  FLOW  =====
function startQuiz() {
  welcome.classList.add("hidden");
  quiz.classList.remove("hidden");

  current = 0;
  points = 0;
  history.length = 0;
  qtotalEl.textContent = quizData.length;

  loadQuestion();
}

function loadQuestion() {
  optionsEl.innerHTML = "";
  nextBtn.disabled = true;
  chosenIndex = null;

  const q = quizData[current];
  qText.textContent = q.question;
  qnumEl.textContent = current + 1;

  q.options.forEach((opt, i) => {
    const btn = document.createElement("button");
    btn.className = "option";
    btn.type = "button";
    btn.textContent = opt;
    btn.addEventListener("click", () => selectOption(i));
    optionsEl.appendChild(btn);
  });
}

function selectOption(index) {
  if (chosenIndex !== null) return;
  chosenIndex = index;

  const q = quizData[current];
  const buttons = [...optionsEl.querySelectorAll(".option")];
  buttons.forEach((b) => (b.disabled = true));

  if (index === q.answer) points++;
  buttons.forEach((btn, i) => {
    if (i === q.answer) btn.classList.add("correct");
    if (i === index && index !== q.answer) btn.classList.add("incorrect");
  });

  history.push({
    question: q.question,
    options: q.options,
    correct: q.answer,
    chosen: index,
  });
  nextBtn.disabled = false;
}

function nextQuestion() {
  if (current < quizData.length - 1) {
    current++;
    loadQuestion();
  } else {
    showScore();
  }
}

function showScore() {
  quiz.classList.add("hidden");
  score.classList.remove("hidden");
  scoreText.textContent = `You scored ${points}/${quizData.length}`;

  reviewList.innerHTML = "";
  history.forEach((h, i) => {
    const card = document.createElement("div");
    card.className = "qcard";
    const user = h.chosen === null ? "No answer" : h.options[h.chosen];
    const correct = h.options[h.correct];
    card.innerHTML = `
      <div style="font-weight:700">${i + 1}. ${h.question}</div>
      <div class="answer ${
        h.chosen === h.correct ? "correct" : "incorrect"
      }">Your answer: ${user}</div>
      <div class="answer correct">Correct: ${correct}</div>
    `;
    reviewList.appendChild(card);
  });
}

function restart() {
  score.classList.add("hidden");
  welcome.classList.remove("hidden");
}

// =====  EVENTS  =====
startBtn.addEventListener("click", startQuiz);
nextBtn.addEventListener("click", nextQuestion);
restartBtn.addEventListener("click", restart);
