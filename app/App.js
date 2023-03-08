// -----------------------------------------------------------
// DOM elements
// -----------------------------------------------------------
let startBtns = document.querySelectorAll(".control button");
let borde = document.querySelector(".game-borde");
let livesEl = document.querySelector(".lives span");
let scoreArea = document.querySelector(".score span");
let muteEl = document.querySelector(".mute");
let loading = document.querySelector(".loading");
// -----------------------------------------------------------
// Array of leeters
// -----------------------------------------------------------
let ltrs_en = "abcdefghijklmnopqrstuvwxyz".split("");
let ltrs_ar = "ابتثجحخدذرصضطظعغفقلمنوهي".split("");
// -----------------------------------------------------------
// Global vars
// -----------------------------------------------------------
let current = [];
let lives = 3;
let score = 0;
let speedCount = 0;
let genTime = 1300;
let speed = 110;
let round = 1;
let rocets = 3;
let roundCount = 0;
let dropInterval;
let gen;
let mute = false;
// -----------------------------------------------------------
// mute All sounds
muteEl.addEventListener("click", () => {
  mute = !mute;
  if (mute) {
    muteEl.className = "mute disable";
  } else muteEl.className = "mute enable";
  // console.log(mute);
});
// -----------------------------------------------------------


document.onreadystatechange = function () {
  if (document.readyState === "complete") {
    loading.classList.remove("active");
  } else {
    loading.classList.add("active");
    // console.log("done");
  }
};

// -----------------------------------------------------------
// statr Btn an select lang
startBtns.forEach((btn) => {
  btn.addEventListener("click", () => {
    document.querySelector(".control").remove();
    // console.log(btn.className);
    roundFun();
    if (btn.className === "start_En") {
      generat(ltrs_en);
    } else {
      generat(ltrs_ar);
    }
    dropFun(gen);
  });
});
// -----------------------------------------------------------
// keyborde event and check key
window.addEventListener("keydown", ({ key }) => onKeyDown(key));
// -----------------------------------------------------------
// reload page to reset all
document.querySelector(".restart").addEventListener("click", () => {
  window.location.reload();
});

