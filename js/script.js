let canvas = document.getElementById("snake");
let context = canvas.getContext("2d");
let box = 32;
let snake = [];

snake[0] = {
  x: 6 * box,
  y: 6 * box,
};

function randomFood() {
  return Math.floor(Math.random() * 9 + 1) * box;
}

let food = {
  x: randomFood(),
  y: randomFood(),
};

let direction = "left";

function createBG() {
  context.fillStyle = "#9bc405";
  context.fillRect(0, 0, 12 * box, 12 * box);
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

function update(event) {
  if (event.keyCode == 37 && direction != "right") direction = "left";
  if (event.keyCode == 38 && direction != "down") direction = "up";
  if (event.keyCode == 39 && direction != "left") direction = "right";
  if (event.keyCode == 40 && direction != "up") direction = "down";
}

document.addEventListener("keydown", update);

function gameOver() {
  clearInterval(game);
  alert("ok");
  location.reload();
}

function startGame() {
  if (snake[0].x > 11 * box && direction == "right") snake[0].x = 0;
  if (snake[0].x < 0 && direction == "left") snake[0].x = 12 * box;
  if (snake[0].y > 11 * box && direction == "down") snake[0].y = 0;
  if (snake[0].y < 0 && direction == "up") snake[0].y = 12 * box;

  for (let i = 1; i < snake.length; i++) {
    if (snake[0].x == snake[i].x && snake[0].y == snake[i].y) {
      gameOver();
    }
  }

  createBG();
  createSnake();
  drawFood();

  let snakeX = snake[0].x;
  let snakeY = snake[0].y;

  if (direction == "right") snakeX += box;
  if (direction == "left") snakeX -= box;
  if (direction == "up") snakeY -= box;
  if (direction == "down") snakeY += box;

  if (snakeX != food.x || snakeY != food.y) {
    snake.pop();
  } else {
    food.x = randomFood();
    food.y = randomFood();
  }

  let newHead = {
    x: snakeX,
    y: snakeY,
  };
  console.log(snake);
  snake.unshift(newHead);
}

let game = setInterval(startGame, 200);
