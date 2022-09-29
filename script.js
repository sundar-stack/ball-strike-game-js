const randomNumEle = document.querySelector(".random__number");
const currentAttemptEle = document.querySelector(".current_attempt");
const currentGuessEle = document.querySelector(".current_guess");
const gameDetailsText = document.querySelector(".gameDetails__text");

function myRandomInts(quantity, max) {
  const arr = [];
  while (arr.length < quantity) {
    const candidateInt = Math.floor(Math.random() * max);
    if (arr.indexOf(candidateInt) === -1) arr.push(candidateInt);
  }
  return {
    random1: arr[0],
    random2: arr[1],
    random3: arr[2],
    randKeysArr: arr,
  };
}

const { random1, random2, random3, randKeysArr } = myRandomInts(3, 9);
let rand1 = random1;
let rand2 = random2;
let rand3 = random3;
let randomKeysArr = randKeysArr;

randomNumEle.innerHTML = `Random Number - ${rand1},${rand2},${rand3}`;
const allKeys = document.querySelectorAll(".number");

class ClickedItems {
  constructor() {
    this.currentAttempt = 1;
    this.firstAttempt = {
      clickedKeys: [],
      score: {
        balls: 0,
        strike: 0,
      },
    };
  }
}

let gameWinObj;
let currentAttempt = 1;
let clickedItems = {
  firstAttempt: {
    clickedKeys: [],
    balls: 0,
    strike: 0,
  },
  secondAttempt: {
    clickedKeys: [],
    balls: 0,
    strike: 0,
  },
  thirdAttempt: {
    clickedKeys: [],
    balls: 0,
    strike: 0,
  },
  fourthAttempt: {
    clickedKeys: [],
    balls: 0,
    strike: 0,
  },
  totalAttempts: 0,
};

currentAttemptEle.innerHTML = `Current Attempt - ${currentAttempt}`;

allKeys.forEach((element) => {
  element.addEventListener("click", (e) => {
    e.stopPropagation();
    const clickedElement = e.target;
    const clickedId = parseInt(e.target.getAttribute("id"));

    if (currentAttempt === 1) {
      handleClickedKeysLogic(clickedElement, clickedId, "firstAttempt");
    } else if (currentAttempt === 2) {
      handleClickedKeysLogic(clickedElement, clickedId, "secondAttempt");
    } else if (currentAttempt === 3) {
      handleClickedKeysLogic(clickedElement, clickedId, "thirdAttempt");
    } else if (currentAttempt === 4) {
      handleClickedKeysLogic(clickedElement, clickedId, "fourthAttempt");
    }
    console.log("DATA OBJECT????", clickedItems);
    console.log("currentAttempt???", currentAttempt);
    console.log("iff all correct ???", gameWinObj);
  });
});

function handleClickedKeysLogic(clickedElement, clickedId, currentAttemptName) {
  if (clickedItems[currentAttemptName].clickedKeys.length < 3) {
    clickedItems[currentAttemptName].clickedKeys.push(clickedId);
    clickedElement.setAttribute("disabled", true);

    currentGuessEle.style.display = 'inline'
    currentGuessEle.innerHTML = clickedItems[currentAttemptName].clickedKeys.join(",")

    const pushedKeys = clickedItems[currentAttemptName].clickedKeys;

    if (clickedItems[currentAttemptName].clickedKeys.length === 3) {
      if (
        randomKeysArr[0] === pushedKeys[0] &&
        randomKeysArr[1] === pushedKeys[1] &&
        randomKeysArr[2] === pushedKeys[2]
      ) {
        clickedItems[currentAttemptName].strike = clickedItems[currentAttemptName].strike + 1;
        clickedItems[currentAttemptName].randomNumbers = randomKeysArr;
        clickedItems.totalAttempts = currentAttempt - 1;
        gameWinObj = clickedItems;
        resetGame();
      } else {
        clickedItems[currentAttemptName].randomNumbers = randomKeysArr;
        randomKeysArr.forEach((key) => {
          clickedItems[currentAttemptName].clickedKeys.forEach((clickedKey) => {
            if (clickedKey === key) {
              clickedItems[currentAttemptName].balls = clickedItems[currentAttemptName].balls + 1;
            }
          });
        });
        if (currentAttemptName === "fourthAttempt") {
          removeDisabledKeys();
          alert("GAME OVER");
        } else {
          currentAttempt++;
          currentAttemptEle.innerHTML = `Current Attempt - ${currentAttempt}`;
          clickedItems.totalAttempts = currentAttempt - 1;
          removeDisabledKeys();
          currentGuessEle.style.display = 'none'
          gameDetailsText.innerHTML = JSON.stringify(clickedItems)
          // resetRandomNumbers();
        }
      }
    }
  }
}

function removeDisabledKeys() {
  allKeys.forEach((element) => {
    element.removeAttribute("disabled");
  });
}

function resetRandomNumbers() {
  const { random1, random2, random3, randKeysArr } = myRandomInts(3, 9);
  rand1 = random1;
  rand2 = random2;
  rand3 = random3;
  randomKeysArr = randKeysArr;
  randomNumEle.innerHTML = `Random Number - ${rand1},${rand2},${rand3}`;
}

function resetGame() {
  clickedItems = new ClickedItems();
  currentAttempt = 1;
  currentAttemptEle.innerHTML = `Current Attempt - ${currentAttempt}`;
  resetRandomNumbers();
  removeDisabledKeys();
  currentGuessEle.style.display = 'none'
}
