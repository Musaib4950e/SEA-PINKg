let currentPlayer = "";
let players = {};
let board = ["", "", "", "", "", "", "", "", ""];
let gameActive = true;

function startGame() {
  const player1 = document.getElementById("player1").value.trim();
  const player2 = document.getElementById("player2").value.trim();

  if (!player1 || !player2) {
    alert("Please enter names for both players.");
    return;
  }

  players = { X: player1, O: player2 };
  currentPlayer = "X";

  document.getElementById("playerInputs").style.display = "none";
  document.getElementById("gameBoard").style.display = "block";
  document.getElementById("game-title").innerText = `${players[currentPlayer]}'s Turn`;

  drawBoard();
}

function drawBoard() {
  const boardContainer = document.getElementById("board");
  boardContainer.innerHTML = "";
  board.forEach((cell, index) => {
    const cellDiv = document.createElement("div");
    cellDiv.classList.add("cell");
    cellDiv.dataset.index = index;
    cellDiv.innerText = cell;
    cellDiv.addEventListener("click", handleCellClick);
    boardContainer.appendChild(cellDiv);
  });
}

function handleCellClick(e) {
  const index = e.target.dataset.index;
  if (board[index] !== "" || !gameActive) return;

  board[index] = currentPlayer;
  drawBoard();

  if (checkWinner()) {
    document.getElementById("winner-message").innerText = `${players[currentPlayer]} Wins!`;
    document.getElementById("game-title").innerText = "";
    gameActive = false;
  } else if (board.every(cell => cell !== "")) {
    document.getElementById("winner-message").innerText = "It's a Draw!";
    document.getElementById("game-title").innerText = "";
    gameActive = false;
  } else {
    currentPlayer = currentPlayer === "X" ? "O" : "X";
    document.getElementById("game-title").innerText = `${players[currentPlayer]}'s Turn`;
  }
}

function checkWinner() {
  const winPatterns = [
    [0,1,2], [3,4,5], [6,7,8],
    [0,3,6], [1,4,7], [2,5,8],
    [0,4,8], [2,4,6]
  ];

  return winPatterns.some(pattern => {
    const [a, b, c] = pattern;
    return board[a] && board[a] === board[b] && board[b] === board[c];
  });
}

function resetGame() {
  board = ["", "", "", "", "", "", "", "", ""];
  gameActive = true;
  currentPlayer = "X";
  document.getElementById("winner-message").innerText = "";
  document.getElementById("game-title").innerText = `${players[currentPlayer]}'s Turn`;
  drawBoard();
}
