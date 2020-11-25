let recordGame = document.querySelectorAll(".record-game");
let playerCurrent;

let player = {
  name: "",
  score: 0,
};

let records = [];

if (window.localStorage.getItem("firstRecords")) {
  records = JSON.parse(window.localStorage.getItem("firstRecords"));
  records = records.sort((a, b) => b.score - a.score);
}

function updatePlayer() {
  player.name = playerCurrent;
  player.score = score;
  if (player.score > 0) records.push(player);
}

function updateRecords() {
  /* Inserindo valores do player atual no array de records*/
  if (records.length > 0) {
    records = records.sort((a, b) => b.score - a.score);
    while (records.length > 3) {
      records.pop();
    }

    /* Passar os 3 maiores valores de recorde para a tela*/
    records.forEach((record, index) => {
      if (!record.score <= 0) {
        recordGame[index].querySelector(".record-name").innerText = record.name;
        recordGame[index].querySelector(".record-score").innerText =
          record.score;
      } else {
        recordGame[index].querySelector(".record-name").innerText = "-";
        recordGame[index].querySelector(".record-score").innerText = 0;
      }
    });
  }
}

function saveLocalStorage() {
  if (window.localStorage.getItem("firstRecords")) {
    window.localStorage.removeItem("firstRecords");
  }
  records = records.sort((a, b) => b.score - a.score);
  while (records.length > 3) {
    records.pop();
  }
  if (records.length > 0)
    window.localStorage.setItem("firstRecords", JSON.stringify(records));
}

window.addEventListener("load", updateRecords);
