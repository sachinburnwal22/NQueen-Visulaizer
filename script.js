let Module;
let isPlaying = false;
let animationSpeed = 500;
let animationIndex = 0;
let animationTimer = null;
let steps = [];
let board = [];
let boardSize = 0;

createModule().then((mod) => {
  Module = mod;
  console.log("WASM Module Loaded");
});

document.getElementById("startButton").addEventListener("click", startSolving);
document.getElementById("playBtn").addEventListener("click", playAnimation);
document.getElementById("pauseBtn").addEventListener("click", pauseAnimation);
document.getElementById("forwardBtn").addEventListener("click", stepForward);
document.getElementById("backBtn").addEventListener("click", stepBackward);
document.getElementById("speed").addEventListener("input", function () {
  animationSpeed = parseInt(this.value);
});

async function startSolving() {
  const n = parseInt(document.getElementById("boardSize").value);
  if (!Module) {
    console.error("WASM Module not loaded yet");
    return;
  }

  boardSize = n;
  board = new Array(n).fill(-1);
  const result = Module.solveNQueen(n);
  steps = [];

  for (let i = 0; i < result.size(); i++) {
    const step = result.get(i);
    steps.push([step.get(0), step.get(1), step.get(2)]);
  }

  animationIndex = 0;
  drawBoard();
}

function drawBoard() {
  const boardContainer = document.getElementById("board");
  boardContainer.innerHTML = "";

  for (let i = 0; i < boardSize; i++) {
    const row = document.createElement("div");
    row.style.display = "flex";

    for (let j = 0; j < boardSize; j++) {
      const cell = document.createElement("div");
      cell.className = "cell";
      cell.style.width = "40px";
      cell.style.height = "40px";
      cell.style.border = "1px solid black";
      cell.style.display = "flex";
      cell.style.alignItems = "center";
      cell.style.justifyContent = "center";
      cell.style.backgroundColor = (i + j) % 2 === 0 ? "#f0d9b5" : "#b58863";

      if (board[i] === j) {
        cell.textContent = "♛";
        cell.style.fontSize = "28px";
      }

      row.appendChild(cell);
    }

    boardContainer.appendChild(row);
  }
}

function runAnimation() {
  if (animationIndex >= steps.length) {
    isPlaying = false;
    return;
  }

  const [row, col, action] = steps[animationIndex];
  if (action === 1) {
    board[row] = col;
  } else {
    board[row] = -1;
  }

  drawBoard();
  animationIndex++;

  if (isPlaying) {
    animationTimer = setTimeout(runAnimation, animationSpeed);
  }
}

function playAnimation() {
  if (!isPlaying && animationIndex < steps.length) {
    isPlaying = true;
    runAnimation();
  }
}

function pauseAnimation() {
  isPlaying = false;
  clearTimeout(animationTimer);
}

function stepForward() {
  if (animationIndex < steps.length) {
    const [row, col, action] = steps[animationIndex];
    if (action === 1) {
      board[row] = col;
    } else {
      board[row] = -1;
    }
    drawBoard();
    animationIndex++;
  }
}

function stepBackward() {
  if (animationIndex > 0) {
    animationIndex--;
    const [row, col, action] = steps[animationIndex];
    if (action === 1) {
      board[row] = -1;
    } else {
      board[row] = col;
    }
    drawBoard();
  }
}
