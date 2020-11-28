let canvas = document.getElementById("snake");
let context = canvas.getContext("2d");
let scoreScreen = document.querySelector(".current-score");

let box = 26;
let rule = 8;
let score = 0;
let direction = "left";

let snake = [];

snake[0] = {
  x: rule * box,
  y: rule * box,
};

function random() {
  return Math.floor(Math.random() * (rule * 2 - 1) + 1) * box;
}

let food = {
  x: random(),
  y: random(),
};

function createBG() {
  context.fillStyle = "#9bc405";
  context.fillRect(0, 0, rule * 2 * box, rule * 2 * box);
}

function createSnake() {
  for (let i = 0; i < snake.length; i++) {
    context.fillStyle = "#1D2B14";
    context.fillRect(snake[i].x, snake[i].y, box, box);
  }
}

function drawFood() {
  context.fillStyle = "red";
  context.fillRect(food.x, food.y, box, box);
}

function moveSnake(event) {
  if (event.keyCode == 37 && direction != "right") direction = "left";
  if (event.keyCode == 38 && direction != "down") direction = "up";
  if (event.keyCode == 39 && direction != "left") direction = "right";
  if (event.keyCode == 40 && direction != "up") direction = "down";
}

document.addEventListener("keydown", moveSnake);

function scoreCurrent() {
  score = (snake.length - 1) * 10;
  scoreScreen.innerText = score;
}

function gameOver() {
  clearInterval(game);
  updatePlayer();
  updateRecords();
  saveLocalStorage();
  screenEndGame();
}

function startGame() {
  for (let i = 1; i < snake.length; i++) {
    if (snake[0].x == snake[i].x && snake[0].y == snake[i].y) {
      gameOver();
    }
  }

  borderOFF();
  createBG();
  createSnake();
  drawFood();
  scoreCurrent();

  let snakeX = snake[0].x;
  let snakeY = snake[0].y;

  if (direction == "right") snakeX += box;
  if (direction == "left") snakeX -= box;
  if (direction == "up") snakeY -= box;
  if (direction == "down") snakeY += box;

  if (snakeX != food.x || snakeY != food.y) {
    snake.pop();
  } else {
    food.x = random();
    food.y = random();
  }

  let newHead = {
    x: snakeX,
    y: snakeY,
  };

  snake.unshift(newHead);
}

let game;

function playGame() {
  setTimeout(() => {
    game = setInterval(startGame, 150);
  }, 500);
}
