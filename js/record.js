let recordGame = document.querySelectorAll(".record-game");
let playerCurrent = "aaaaaaaa";
let records = [];

if (window.localStorage.getItem("firstRecords")) {
  records = JSON.parse(window.localStorage.getItem("firstRecords"));
}

let player = {
  name: "",
  score: 0,
};

player.name = playerCurrent;
player.score = score;

/* Inserindo valores do player atual no array de records*/
records.push(player);

/* Passar os 3 maiores valores de recorde para a tela*/

if ((player.name !== "" && player.score > 0) || !records.length <= 0) {
  for (let i = 0; i < recordGame.length; i++) {
    recordGame[i].querySelector(".record-name").innerText = records[i].name;
    recordGame[i].querySelector(".record-score").innerText = records[i].score;
  }
}
