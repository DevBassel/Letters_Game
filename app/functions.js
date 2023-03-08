// functions
// -------------------------------------------------------------------
function roundFun() {
  let container = document.querySelector(".round");
  document.querySelector(".r span").textContent = round;
  if (roundCount >= 500) {
    let txt = `Round: ${round}`;
    let count = 0;

    container.querySelector("h1").textContent = "";

    roundCount = 0;
    round += 1;
    rocets+=1;
    container.classList.add("active");
    let type = setInterval(() => {
      container.querySelector("h1").textContent += txt[count];
      count++;
      if (count >= txt.length) {
        clearInterval(type);
      }
    }, 150);
    let to = setTimeout(() => {
      container.classList.remove("active");
      clearTimeout(to);
    }, 3500);
  }
}
// -------------------------------------------------------------------
// Create a sound effect and play it
let soundEffect = async (src, close) => {
  if (!mute) {
    let sound = new Audio(src);
    await sound.play();
    setTimeout(() => sound.pause(), close || 1000);
  } else console.log("sound is mute");
};

// -------------------------------------------------------------------
function generat(arr) {
  clearInterval(gen);
  if (arr.length) {
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
  }
  gen = setInterval(() => generat(arr), genTime);
}
function render() {
  livesEl.textContent = lives;
  scoreArea.textContent = score;
document.querySelector(".data .rocets span").textContent= rocets;
  let html = "";
  current.forEach((item) => {
    html += `
    <div class="word" style=" top: ${item.top}px; left: ${item.left}px ">  
        <span class="ltr">${item.ltr} </span>
        </div>`;
  });
  borde.innerHTML = html;
}
function gameOver(A, D) {
  soundEffect("../assets/sound/gameOver.mp3");
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

  // console.log("gameOver");
}
function dropFun(Add) {
  clearInterval(dropInterval);

  if (current.length) {
    current = current.map((item) => {
      item.top += 1;
      return item;
    });
  }
  current.forEach((el) => {
    if (el.top === borde.parentElement.offsetHeight - 100) {
      lose();
    }
  });
  console.log("speed: ", speed, "count: ", speedCount, "genSpeed: ", genTime);

  if (speedCount >= 100) {
    speedCount = 0;

    if (speed > 10) {
      speed -= 5;
      genTime -= 20;
    }
  }
  if (lives === 0) {
    gameOver(Add, dropInterval);
  } else dropInterval = setInterval(dropFun, speed);

  render();
}
function lose() {
  lives -= 1;
  livesEl.textContent = lives;
  soundEffect("../assets/sound/lose.mp3");
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
  soundEffect("../assets/sound/bullt.mp3", 300);
  bullt.appendChild(span);
  cannon.classList.add("fire");

  setTimeout(() => {
    bullt.style.setProperty("height", `${35}px`);
    bullt.style.setProperty("left", `${50}%`);
    bullt.remove();
    cannon.classList.remove("fire");
  }, 300);

  // console.log(el.left);
}
function onKeyDown(key) {
  console.log(key);
  let don = false;
  let it = "";
  if (lives > 0) {
    current.forEach((item) => {
      if (item.ltr === key) {
        it = item;
        don = true;
        score += 10;
        speedCount += 10;
        roundCount += 20;
        scoreArea.textContent = score;
      }
    });
    if (it) {
      fire(it);
      setTimeout(
        () => (current = current.filter((el) => el.id !== it.id)),
        330
      );
    }
    if (key === "Enter") {
      don = true;
      if (rocets > 0) {
        clearAll();
      }
    }
    if (!don) {
      lose();
    }
  }
  roundFun();
}
// ------------------------------------------------------------------------
function clearAll() {
  rocets -= 1;
  console.log("rocet");
  current = [];
  soundEffect("../assets/sound/boom.mp3");
}
