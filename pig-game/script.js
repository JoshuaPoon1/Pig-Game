const player0 = document.querySelector(".player-0");
const player1 = document.querySelector(".player-1");

const rollDiceBtn = document.querySelector(".rollDiceBtn");
const holdBtn = document.querySelector(".holdBtn");
const newGame = document.querySelector(".newGameBtn");

const diceImg = document.querySelector(".dice-img");

let scores, currentScore, currentPlayer, isPlaying;
diceImg.classList.add("hidden");

const init = function () {
  scores = [0, 0];
  currentScore = 0;
  currentPlayer = 0;
  isPlaying = true;

  player1.classList.remove("active");
  player1.classList.remove("win");
  player0.classList.remove("win");
  player0.classList.add("active");

  document.querySelectorAll(".final-score").forEach((fs) => {
    fs.textContent = 0;
  });

  document.querySelectorAll(".current-score").forEach((cs) => {
    cs.textContent = 0;
  });
};

init();

const switchPlayer = function () {
  document.getElementById(`current-score-${currentPlayer}`).textContent = 0;
  currentScore = 0;

  currentPlayer = currentPlayer == 0 ? 1 : 0;

  player0.classList.toggle("active");
  player1.classList.toggle("active");
};

rollDiceBtn.addEventListener("click", function () {
  if (isPlaying) {
    //generate random number
    let number = Math.trunc(Math.random() * 6 + 1);

    console.log(number);

    diceImg.classList.remove("hidden");
    diceImg.src = `images/dice-${number}.png`;

    if (number !== 1) {
      currentScore += number;
      document.getElementById(`current-score-${currentPlayer}`).textContent =
        currentScore;
    } else {
      switchPlayer();
    }
  }
});

holdBtn.addEventListener("click", function () {
  if (isPlaying) {
    //add to array to keep track of score based on 0 or 1.
    scores[currentPlayer] += currentScore;
    //get final score and change the text content to the array.
    document.querySelector(`#fs${currentPlayer}`).textContent =
      scores[currentPlayer];

    if (scores[currentPlayer] >= 100) {
      isPlaying = false;
      diceImg.classList.add("hidden");
      document.querySelector(`.player-${currentPlayer}`).classList.add("win");
    } else {
      switchPlayer();
    }
  }
});

newGame.addEventListener("click", init);
