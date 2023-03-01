let startBtn = document.querySelector(".start");
let borde = document.querySelector(".game-borde");
let ltrs = "abcdefghijklmnopqrstuvwxyz".split("");
let livesEl = document.querySelector(".lives");
let scoreArea = document.querySelector(".score span");
let current = [];
let lives = 3;
let score = 0;
let speed = 100;
let speedCount = 0;
let dropInterval;
livesEl.textContent = lives;
scoreArea.textContent = score;
startBtn.addEventListener("click", () => {
  document.querySelector(".control").remove();

  let Add = setInterval(() => randLtr(ltrs), 1200);

  dropFun(Add);
});

function randLtr(arr) {
  current = [
    ...current,
    {
      ltr: arr[Math.floor(Math.random() * ltrs.length)],
      left: Math.floor(Math.random() * (borde.offsetWidth - 85)),
      top: 0,
    },
  ];
}
function render() {
  let html = "";

  current.forEach((item) => {
    html += `
    <div class="word" style="top: ${item.top}px; left: ${item.left}px">  
      <img src="../assets/icon.png" alt="icon"/>  
      <span class="ltr">${item.ltr} </span>
      </div>`;
  });
  borde.innerHTML = html;
}
function gameOver(A, D) {
  if (window.localStorage.HeightScore) {
    if (score > window.localStorage.HeightScore) {
      window.localStorage.HeightScore = score;
    }
  } else window.localStorage.HeightScore = score;

  document.querySelector(".gameOver").style.display = "block";
  document.querySelector(".content .Score span").textContent = score;
  document.querySelector(".content .hScore span").textContent =
    window.localStorage.HeightScore;

  clearInterval(A);
  clearInterval(D);

  console.log("gameOver");
}
function dropFun(Add) {
  clearInterval(dropInterval);

  if (current.length) {
    current = current.map((item) => {
      item.top += 1;
      return item;
    });
  }

  render();

  current.forEach((el) => {
    if (el.top === 500) {
      lives -= 1;
      livesEl.textContent = lives;
    }
  });
  console.log("speed", speed, "count", speedCount);

  if (speedCount >= 50) {
    speedCount = 0;

    if (speed > 10) {
      speed -= 5;
    }
  }
  if (lives === 0) {
    gameOver(Add, dropInterval);
  } else dropInterval = setInterval(dropFun, speed);
}

window.addEventListener("keydown", ({ key }) => {
  current.forEach((item) => {
    if (item.ltr === key) {
      let index = current.indexOf(item);
      current.splice(index, 1);
      score += 10;
      speedCount += 10;
      scoreArea.textContent = score;
      render();
    }
  });
});

document.querySelector(".restart").addEventListener("click", () => {
  window.location.reload();
});
