class Point {
  x = null
  y = null

  constructor(x,y) {
    this.x = x
    this.y = y

  }
  create(x, y) {
    return new Point(x, y)
  }

  getY() {
    return this.y
  }
  getX() {
    return this.x
  }
}


class Food {
  point = null

  constructor() {
    this.point = new Point().create(random(), random())
  }

  new() {
    this.point = new Point().create(random(), random())
  }

  getY() {
    return this.point.getY()
  }
  getX() {
    return this.point.getX()
  }

}


/* Level do jogo */

const levelGame = {
  easy() {
    return 200;
  },
  medium() {
    return 150;
  },
  hard() {
    return 100;
  },
};

const player = {
  name: "",
  score: 0,
};

let choiceLevel = levelGame["medium"];


const body = document.querySelector("body");

/*===============================================================*/
/* Navegação entre telas do jogo                                 */
/*===============================================================*/

const screenHome = body.querySelector(".home-game");
const screenGame = body.querySelector("canvas");
const screenEnd = body.querySelector(".end-game");

let toast = body.querySelector(".toast");
let scoreEnd = body.querySelector(".score-endGame span");

let playerName = body.querySelector("#player-name");

let buttonStart = body.querySelector(".home-game button");
let buttonRestart = body.querySelector(".end-game button");

const screens = {
  clickStart() {
    if (!!player.name) {
      screenHome.classList.remove("active");
      screenGame.classList.add("active");
      setTimeout(startGame, 200);
    } else {
      toast.classList.add("active");
      toast.addEventListener("animationend", () => {
        toast.classList.remove("active");
      });
    }
  },
  clickRestart() {
    while (snake.length > 1) {
      snake.pop();
    }

    food.new()

    snake[0] = {
      x: settingsGame.size * settingsGame.box,
      y: settingsGame.size * settingsGame.box,
    };

    screenEnd.classList.remove("active");
    screenGame.classList.add("active");
    setTimeout(() => {
      startGame();
    }, 200);
  },
  EndGame() {
    scoreEnd.innerText = player.score;
    screenGame.classList.remove("active");
    screenEnd.classList.add("active");
  },
};

playerName.addEventListener("input", (e) => {
  player.name = e.target.value.trim();
});

buttonStart.addEventListener("click", screens.clickStart);
buttonRestart.addEventListener("click", screens.clickRestart);

/*===============================================================*/
/* Criando contexto do jogo e adicionado cobrinha e frutinha     */
/*===============================================================*/

const canvas = body.querySelector("#snake");
const context = canvas.getContext("2d");

const settingsGame = {
  box: 26,
  size: 8,
  direction: "left",
};

let snake = [];

snake[0] = {
  x: settingsGame.size * settingsGame.box,
  y: settingsGame.size * settingsGame.box,
};




const food = new Food()

const createElements = {
  createBG() {
    context.fillStyle = "#9bc405";
    context.fillRect(
      0,
      0,
      settingsGame.size * 2 * settingsGame.box,
      settingsGame.size * 2 * settingsGame.box
    );
  },
  createSnake() {
    for (let i = 0; i < snake.length; i++) {
      context.fillStyle = "#1D2B14";
      context.fillRect(
        snake[i].x,
        snake[i].y,
        settingsGame.box,
        settingsGame.box
      );
    }
  },
  createFood() {
    context.fillStyle = "red";
    context.fillRect(food.getX(), food.getY(), settingsGame.box, settingsGame.box);
  },
};

function random() {
  return (
    Math.floor(Math.random() * (settingsGame.size * 2 - 1) + 1) *
    settingsGame.box
  );
}

/*===============================================================*/
/* Armazenando informações sobre o jogador e os últimos 3 records*/
/*===============================================================*/


const currentScore = body.querySelector(".current-score");
const recordName = body.querySelectorAll(".record-name");
const recordScore = body.querySelectorAll(".record-score");

let records = [];

if (window.localStorage.getItem("recordsGame")) {
  records = JSON.parse(window.localStorage.getItem("recordsGame"));
}

let informationGame = {
  informationScore() {
    player.score = snake.length > 0 ? (snake.length - 1) * 10 : 0;
    currentScore.innerText = player.score;
  },
  updateRecords() {
    if (records.length > 0) {
      records.sort((a, b) => b.score - a.score);
      while (records.length > 3) {
        records.pop();
      }

      records.forEach((record, index) => {
        record.name !== ""
          ? (recordName[index].innerText = record.name)
          : (recordName[index].innerText = "-");
        record.score > 0
          ? (recordScore[index].innerText = record.score)
          : (recordScore[index].innerText = 0);
      });
    }
  },
  saveLocalStorage() {
    if (records.length > 0) {
      window.localStorage.setItem("recordsGame", JSON.stringify(records));
    }
  },
};

/*===============================================================*/
/* Regras do jogo                                                */
/*===============================================================*/

/* Movimentação */

function moveSnake(e) {
  if (e.keyCode == 37 && settingsGame.direction != "right")
    settingsGame.direction = "left";
  if (e.keyCode == 38 && settingsGame.direction != "down")
    settingsGame.direction = "up";
  if (e.keyCode == 39 && settingsGame.direction != "left")
    settingsGame.direction = "right";
  if (e.keyCode == 40 && settingsGame.direction != "up")
    settingsGame.direction = "down";
}

document.addEventListener("keydown", moveSnake);

/* Regra de bordas */

function ruleBorder(rule) {
  if (rule == 0) {
    return ruleBorderOFF();
  } else if (rule == 1) {
    return ruleborderON();
  }
}

function ruleBorderOFF() {
  if (
    snake[0].x > (settingsGame.size * 2 - 1) * settingsGame.box &&
    settingsGame.direction == "right"
  )
    snake[0].x = 0;

  if (
    (snake[0].x > (settingsGame.size * 2 - 1) * settingsGame.box &&
      settingsGame.direction == "up") ||
    (snake[0].x > (settingsGame.size * 2 - 1) * settingsGame.box &&
      settingsGame.direction == "down")
  )
    snake[0].x = 0;

  if (snake[0].x < 0 && settingsGame.direction == "left")
    snake[0].x = settingsGame.size * 2 * settingsGame.box;

  if (
    (snake[0].x < 0 && settingsGame.direction == "up") ||
    (snake[0].x < 0 && settingsGame.direction == "down")
  )
    snake[0].x = (settingsGame.size * 2 - 1) * settingsGame.box;

  if (
    snake[0].y > (settingsGame.size * 2 - 1) * settingsGame.box &&
    settingsGame.direction == "down"
  )
    snake[0].y = 0;

  if (
    (snake[0].y > (settingsGame.size * 2 - 1) * settingsGame.box &&
      settingsGame.direction == "right") ||
    (snake[0].y > (settingsGame.size * 2 - 1) * settingsGame.box &&
      settingsGame.direction == "left")
  )
    snake[0].y = 0;

  if (snake[0].y < 0 && settingsGame.direction == "up")
    snake[0].y = settingsGame.size * 2 * settingsGame.box;

  if (
    (snake[0].y < 0 && settingsGame.direction == "right") ||
    (snake[0].y < 0 && settingsGame.direction == "left")
  )
    snake[0].y = (settingsGame.size * 2 - 1) * settingsGame.box;
}

function ruleborderON() {
  if (
    snake[0].x > (settingsGame.size * 2 - 1) * settingsGame.box &&
    settingsGame.direction == "right"
  )
    gameOver();
  if (snake[0].x < 0 && settingsGame.direction == "left") gameOver();
  if (
    snake[0].y > (settingsGame.size * 2 - 1) * settingsGame.box &&
    settingsGame.direction == "down"
  )
    gameOver();
  if (snake[0].y < 0 && settingsGame.direction == "up") gameOver();
}




/*===============================================================*/
/* Função de início do jogo e fim do jogo                        */
/*===============================================================*/

function gameOver() {
  clearInterval(game);
  if (player.score > 0) records.push(player);
  informationGame.updateRecords();
  informationGame.saveLocalStorage();
  screens.EndGame();
}

function playGame() {
  for (let i = 1; i < snake.length; i++) {
    if (snake[0].x == snake[i].x && snake[0].y == snake[i].y) {
      gameOver();
    }
  }
  createElements.createBG();
  createElements.createSnake();
  createElements.createFood();
  informationGame.informationScore();

  ruleBorder(0);

  let snakeX = snake[0].x;
  let snakeY = snake[0].y;

  if (settingsGame.direction == "right") snakeX += settingsGame.box;
  if (settingsGame.direction == "left") snakeX -= settingsGame.box;
  if (settingsGame.direction == "up") snakeY -= settingsGame.box;
  if (settingsGame.direction == "down") snakeY += settingsGame.box;

  console.log(food.getY())

  if (snakeX != food.getX() || snakeY != food.getY()) {
    snake.pop();
  } else {
    food.new()
  }

  let newHead = {
    x: snakeX,
    y: snakeY,
  };

  snake.unshift(newHead);
}

let game;

function startGame() {
  setTimeout(() => {
    game = setInterval(playGame, choiceLevel());
  }, 500);
}

window.addEventListener("load", informationGame.updateRecords);
