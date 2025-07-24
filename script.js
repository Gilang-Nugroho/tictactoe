let startGame = document.getElementById("containerStartGame");
let playingGame = document.getElementById("containerPlaying");
let gameRules = document.getElementById("gameRules");

let cells = document.querySelectorAll(".cell");
let turnTitle = document.getElementById("titleOfTurn");
let restartBtn = document.getElementById("restartGame");

// counter Score
const playerCounterScore = document.getElementById("playerCounterScore");
let playerScore = 0; // mulai dari 0

const botCounterScore = document.getElementById("botCounterScore");
let botScore = 0;

// variable for the game
let currentPlayer = "X";
let isGameStart = false;
let isPauseGame = false;

// array for the cells and win condicition
let gameBoard = ["", "", "", "", "", "", "", "", ""];
const winCondition = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
];

// play game button click
function playGame() {
  startGame.style.display = "none";
  playingGame.style.display = "flex";
  turnTitle.textContent = "Your Turn";
}

// membuat cell bisa ditekan dan membuat function clickCell
cells.forEach((cell, index) => {
  cell.addEventListener("click", () => clickCell(cell, index));
});

// ketika cell ditekan
function clickCell(cell, index) {
  if (cell.textContent == "" && !isPauseGame) {
    isGameStart = true;

    updateCell(cell, index);

    // computer akan pick secara random
    if (!checkWinner()) {
      switchPlayer();
      computerPick();
    }
  }
}

function isPlayerTurn() {
  return currentPlayer === "X";
}

function updateCell(cell, index) {
  cell.textContent = currentPlayer;
  cell.style.color = isPlayerTurn() ? "#ffbc4c" : "#ff0000ff";
  gameBoard[index] = currentPlayer;
}

function switchPlayer() {
  currentPlayer = isPlayerTurn() ? "O" : "X";
  updateTurnTitle();
}

function updateTurnTitle() {
  if (isPlayerTurn()) {
    turnTitle.textContent = "Your Turn";
  } else {
    turnTitle.textContent = "Computer Turn";
  }
}

function computerPick() {
  isPauseGame = true;

  setTimeout(() => {
    let randomIndex;
    do {
      randomIndex = Math.floor(Math.random() * gameBoard.length);
    } while (gameBoard[randomIndex] !== "");

    updateCell(cells[randomIndex], randomIndex);

    if (!checkWinner()) {
      switchPlayer();
      isPauseGame = false;
      return;
    }

    currentPlayer = isPlayerTurn() ? "O" : "X";
  }, 1000);
}

function checkWinner() {
  // a,b,c mewakili win condition array,ex: [0,1,2]
  for (const [a, b, c] of winCondition) {
    if (
      gameBoard[a] === currentPlayer &&
      gameBoard[b] === currentPlayer &&
      gameBoard[c] === currentPlayer
    ) {
      counterScore();
      winnerTheGame([a, b, c]);
      return true;
    }
  }

  // draw
  if (gameBoard.every((cell) => cell != "")) {
    gameDraw();
    return true;
  }
  return false;
}

function winnerTheGame() {
  if (isPlayerTurn()) {
    turnTitle.textContent = "You Win!";
  } else {
    turnTitle.textContent = "You Lose!";
  }
  isPauseGame = true;
  restartBtn.style.visibility = "visible";
}

function gameDraw() {
  turnTitle.textContent = "Draw";
  restartBtn.style.visibility = "visible";
}

function counterScore() {
  if (isPlayerTurn()) {
    playerScore++;
    playerCounterScore.textContent = `You: ${playerScore}`;
  } else {
    botScore++;
    botCounterScore.textContent = `Bot: ${botScore}`;
  }
}

function defaultScore() {
  playerScore = 0;
  botScore = 0;
  playerCounterScore.textContent = "You: 0";
  botCounterScore.textContent = "Bot: 0";
}

function restartDisplayGame() {
  restartBtn.style.visibility = "hidden";
  gameBoard.fill("");
  cells.forEach((cell) => {
    cell.textContent = "";
  });

  isPauseGame = false;
  isGameStart = false;

  isPlayerTurn();
  updateTurnTitle();
}

// return to home
function returnToHome() {
  playingGame.style.display = "none";
  startGame.style.display = "flex";

  restartDisplayGame();
  defaultScore();
}

// game rules
function displayRules() {
  gameRules.style.display = "flex";
  startGame.style.display = "none";
}

function exitGameRules() {
  gameRules.style.display = "none";
  startGame.style.display = "flex";
}
