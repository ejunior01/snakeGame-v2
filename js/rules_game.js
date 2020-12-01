function borderOFF() {
  if (snake[0].x > (rule * 2 - 1) * box && direction == "right") snake[0].x = 0;

  if (
    (snake[0].x > (rule * 2 - 1) * box && direction == "up") ||
    (snake[0].x > (rule * 2 - 1) * box && direction == "down")
  )
    snake[0].x = 0;


  if (snake[0].x < 0 && direction == "left") snake[0].x = rule * 2 * box;

  if (
    (snake[0].x < 0 && direction == "up") ||
    (snake[0].x < 0 && direction == "down")
  )
    snake[0].x = (rule * 2 - 1) * box;

  if (snake[0].y > (rule * 2 - 1) * box && direction == "down") snake[0].y = 0;

  if (
    (snake[0].y > (rule * 2 - 1) * box && direction == "right") ||
    (snake[0].y > (rule * 2 - 1) * box && direction == "left")
  )
    snake[0].y = 0;

  if (snake[0].y < 0 && direction == "up") snake[0].y = rule * 2 * box;

  if (
    (snake[0].y < 0 && direction == "right") ||
    (snake[0].y < 0 && direction == "left")
  )
    snake[0].y = (rule * 2 - 1) * box;
}

function borderON() {
  if (snake[0].x > (rule * 2 - 1) * box && direction == "right") gameOver();
  if (snake[0].x < 0 && direction == "left") gameOver();
  if (snake[0].y > (rule * 2 - 1) * box && direction == "down") gameOver();
  if (snake[0].y < 0 && direction == "up") gameOver();
}


