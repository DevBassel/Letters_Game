let startBtns = document.querySelectorAll(".control button");
let borde = document.querySelector(".game-borde");
let ltrs_en = "abcdefghijklmnopqrstuvwxyz".split("");
let ltrs_ar = [
  "ا",
  "ب",
  "ت",
  "ث",
  "ج",
  "ح",
  "خ",
  "د",
  "ذ",
  "ر",
  "ص",
  "ض",
  "ط",
  "ظ",
  "ع",
  "غ",
  "ف",
  "ق",
  "ل",
  "م",
  "ن",
  "و",
  "ه",
  "ي",
];
let livesEl = document.querySelector(".lives");
let scoreArea = document.querySelector(".score span");
let current = [];
let lives = 3;
let genTime = 1300;
let score = 0;
let speed = 110;
let speedCount = 0;
let dropInterval;
let gen;

startBtns.forEach((btn) => {
  btn.addEventListener("click", () => {
    let Add;
    document.querySelector(".control").remove();
    console.log(btn.className);
    if (btn.className === "start_En") {
      Add = setInterval(() => generat(ltrs_en), genTime);
    } else {
      Add = setInterval(() => generat(ltrs_ar), genTime);
    }
    dropFun(Add);
  });
});

window.addEventListener("keydown", ({ key }) => {
  let don = false;
  let it = "";
  current.forEach((item) => {
    if (item.ltr === key) {
      it = item;
      don = true;
      score += 10;
      speedCount += 10;
      scoreArea.textContent = score;
      render();
    }
  });
  if (it) {
    fire(it);
    setTimeout(() => (current = current.filter((el) => el.id !== it.id)), 330);
  }
  if (!don) {
    lives -= 1;
  }
});

document.querySelector(".restart").addEventListener("click", () => {
  window.location.reload();
});

// function randLtr(arr) {}
function generat(arr) {
  clearInterval(gen);
  let l = arr[Math.floor(Math.random() * arr.length)];

  current = [
    ...current,
    {
      id: Date.now().toString(32),
      ltr: l,
      left: Math.floor(Math.random() * (borde.offsetWidth - 80)),
      top: 0,
    },
  ];

  gen = setInterval(() => generat(), genTime);
}
function render() {
  livesEl.textContent = lives;
  scoreArea.textContent = score;

  let html = "";
  current.forEach((item) => {
    html += `
    <div class="word" style="top: ${item.top}px; left: ${item.left}px">  
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
    if (el.top === borde.parentElement.offsetHeight - 100) {
      lives -= 1;
      livesEl.textContent = lives;
    }
  });
  console.log("speed", speed, "count", speedCount);

  if (speedCount >= 50) {
    speedCount = 0;

    if (speed > 10) {
      speed -= 5;
      genTime -= 100;
    }
  }
  if (lives === 0) {
    gameOver(Add, dropInterval);
  } else dropInterval = setInterval(dropFun, speed);
}

function fire(el) {
  let cannon = document.querySelector(".cannon-body");

  let bullt = document.createElement("span");
  bullt.className = "bullt-area";
  document.querySelector(".area").prepend(bullt);
  let height = borde.parentElement.offsetHeight - el.top - 50;
  bullt.style.setProperty("height", `${height}px`);
  bullt.style.setProperty("left", `${el.left + 40}px`);
  let span = document.createElement("span");
  span.className = "bullt";

  bullt.appendChild(span);
  cannon.classList.add("fire");
  setTimeout(() => {
    bullt.style.setProperty("height", `${35}px`);
    bullt.style.setProperty("left", `${50}%`);
    bullt.remove();
    cannon.classList.remove("fire");
  }, 300);

  console.log(el.left);
}
