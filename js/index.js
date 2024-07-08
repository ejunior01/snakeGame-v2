class Point {
  x = null
  y = null

  constructor(x, y) {
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

class Snake {
  body = []

  constructor() {
    let point = settingsGame.size * settingsGame.box
    this.body[0] = new Point().create(point, point)
  }

  new() {
    let point = settingsGame.size * settingsGame.box
    this.body = []

    this.body[0] = new Point().create(point, point)
  }

  getHeade() {
    return this.body[0]
  }

  setHeade(x, y) {
    return this.body.unshift(new Point().create(x, y))
  }

  size() {
    return this.body.length
  }

}

const settingsGame = {
  box: 26,
  size: 8,
  direction: "left",
};

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

const snake = new Snake()
const food = new Food()


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

    food.new()
    snake.new()

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
    for (let i = 0; i < snake.size(); i++) {
      context.fillStyle = "#1D2B14";
      context.fillRect(
        snake.body[i].getX(),
        snake.body[i].getY(),
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
    player.score = snake.size() > 0 ? (snake.size() - 1) * 10 : 0;
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
    snake.getHeade().getX() > (settingsGame.size * 2 - 1) * settingsGame.box &&
    settingsGame.direction == "right"
  )
    snake.setHeade(0, snake.getHeade().getY())

  if (
    (snake.getHeade().getX() > (settingsGame.size * 2 - 1) * settingsGame.box &&
      settingsGame.direction == "up") ||
    (snake.getHeade().getX() > (settingsGame.size * 2 - 1) * settingsGame.box &&
      settingsGame.direction == "down")
  )
    snake.setHeade(0, snake.getHeade().getY())

  if (snake.getHeade().getX() < 0 && settingsGame.direction == "left") {

    let headeX = settingsGame.size * 2 * settingsGame.box;
    snake.setHeade(headeX, snake.getHeade().getY())
  }

  if (
    (snake.getHeade().getX() < 0 && settingsGame.direction == "up") ||
    (snake.getHeade().getX() < 0 && settingsGame.direction == "down")
  ) {
    let headeX = (settingsGame.size * 2 - 1) * settingsGame.box;

    snake.setHeade(headeX, snake.getHeade().getY())

  }

  if (
    snake.getHeade().getY() > (settingsGame.size * 2 - 1) * settingsGame.box &&
    settingsGame.direction == "down"
  )
    snake.setHeade(snake.getHeade().getX(), 0)

  if (
    (snake.getHeade().getY() > (settingsGame.size * 2 - 1) * settingsGame.box &&
      settingsGame.direction == "right") ||
    (snake.getHeade().getY() > (settingsGame.size * 2 - 1) * settingsGame.box &&
      settingsGame.direction == "left")
  )
    snake.setHeade(snake.getHeade().getX(), 0)


  if (snake.getHeade().getY() < 0 && settingsGame.direction == "up")
  {

    let headeY = settingsGame.size * 2 * settingsGame.box;
    snake.setHeade(snake.getHeade().getX(),headeY)  
  }

  if (
    (snake.getHeade().getY() < 0 && settingsGame.direction == "right") ||
    (snake.getHeade().getY() < 0 && settingsGame.direction == "left")
  ) {

    let headeY = (settingsGame.size * 2 - 1) * settingsGame.box;
    snake.setHeade(snake.getHeade().getX(),headeY)  
  }
}

function ruleborderON() {
  if (
    snake.body[0].getX() > (settingsGame.size * 2 - 1) * settingsGame.box &&
    settingsGame.direction == "right"
  )
    gameOver();
  if (snake.body[0].getX() < 0 && settingsGame.direction == "left") gameOver();
  if (
    snake.body[0].getY() > (settingsGame.size * 2 - 1) * settingsGame.box &&
    settingsGame.direction == "down"
  )
    gameOver();
  if (snake.body[0].getY() < 0 && settingsGame.direction == "up") gameOver();
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

  for (let i = 1; i < snake.size(); i++) {
    if (snake.getHeade().getX() == snake.body[i].getX() && snake.getHeade().getY() == snake.body[i].getY()) {
      gameOver();
    }
  }
  createElements.createBG();
  createElements.createSnake();
  createElements.createFood();
  informationGame.informationScore();

  ruleBorder(0);

  let snakeX = snake.getHeade().getX();
  let snakeY = snake.getHeade().getY();

  if (settingsGame.direction == "right") snakeX += settingsGame.box;
  if (settingsGame.direction == "left") snakeX -= settingsGame.box;
  if (settingsGame.direction == "up") snakeY -= settingsGame.box;
  if (settingsGame.direction == "down") snakeY += settingsGame.box;


  if (snakeX != food.getX() || snakeY != food.getY()) {
    snake.body.pop();
  } else {
    food.new()
  }

  snake.setHeade(snakeX, snakeY)

}

let game;

function startGame() {
  setTimeout(() => {
    game = setInterval(playGame, choiceLevel());
  }, 500);
}

window.addEventListener("load", informationGame.updateRecords);
