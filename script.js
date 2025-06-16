let Module;

createModule().then((mod) => {
  Module = mod;
  console.log("WASM Module Loaded");
});

async function startSolving() {
  const n = parseInt(document.getElementById("boardSize").value);
  if (!Module) {
    console.error("WASM Module not loaded yet");
    return;
  }

  const result = Module.solveNQueen(n); // result is VectorVectorInt
  visualizeSteps(result, n);
}
function visualizeSteps(steps, n) {
  const boardContainer = document.getElementById("board");
  boardContainer.innerHTML = "";

  let index = 0;
  let board = new Array(n).fill(-1); // -1 means no queen placed

  function drawBoard() {
    boardContainer.innerHTML = ""; // Clear board

    for (let i = 0; i < n; i++) {
      const row = document.createElement("div");
      row.style.display = "flex";
      for (let j = 0; j < n; j++) {
        const cell = document.createElement("div");
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

  function playSteps() {
    if (index < steps.size()) {
      const step = steps.get(index); // [row, col, action]
      const row = step.get(0);
      const col = step.get(1);
      const action = step.get(2);

      if (action === 1) {
        board[row] = col; // Place queen
      } else {
        board[row] = -1; // Remove queen
      }

      drawBoard();
      index++;
      setTimeout(playSteps, 600);
    }
  }

  playSteps();
}
