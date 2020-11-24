const homeGame = document.querySelector(".home-game");
const canvasGame = document.querySelector("canvas");
const endGame = document.querySelector(".end-game");

let playerName = document.querySelector("#player-name");
let buttonStart = document.querySelector(".home-game button");
let buttonRestart = document.querySelector(".end-game button");

let scoreEnd = document.querySelector(".score-endGame span");

playerName.addEventListener("input", (e) => {
  playerCurrent = e.target.value;
});

function clickStart() {
  if (!!playerCurrent) {
    homeGame.classList.remove("active");
    canvasGame.classList.add("active");
    setTimeout(playGame, 150);
  }
}

function clickRestart() {
  while (snake.length > 1) {
    snake.pop();
  }
  food = {
    x: randomFood(),
    y: randomFood(),
  };
  snake[0] = {
    x: rule * box,
    y: rule * box,
  };
  endGame.classList.remove("active");
  canvasGame.classList.add("active");
  setTimeout(() => {
    playGame();
  }, 500);
}

function screenEndGame() {
  scoreEnd.innerText = score;
  canvasGame.classList.remove("active");
  endGame.classList.add("active");
}

buttonStart.addEventListener("click", clickStart);

buttonRestart.addEventListener("click", clickRestart);
