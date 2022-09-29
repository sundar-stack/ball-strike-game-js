const randomNumEle = document.querySelector(".random__number");
const currentAttemptEle = document.querySelector(".current_attempt");
const currentGuessEle = document.querySelector(".current_guess");
const gameDetailsText = document.querySelector(".gameDetails__text");
const newGameButton = document.querySelector(".newGame");

newGameButton.disabled = true

function generateRandomDigits(quantity, max) {
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

newGameButton.addEventListener('click', () => {
  resetGame()
  gameDetailsText.innerHTML = ''
})

const { random1, random2, random3, randKeysArr } = generateRandomDigits(3, 9);
let rand1 = random1;
let rand2 = random2;
let rand3 = random3;
let randomKeysArr = randKeysArr;

randomNumEle.innerHTML = `Random Number - ${rand1},${rand2},${rand3}`;
const gameDigitButtons = document.querySelectorAll(".number");


let gameWinObj;
let currentAttempt = 0;
let clickedItemsData = [];
let totalAttempts = 0;

currentAttemptEle.innerHTML = `Current Attempt - ${currentAttempt + 1}`;

gameDigitButtons.forEach((element) => {
  element.addEventListener("click", (e) => {
    e.stopPropagation();
    const clickedElement = e.target;
    const clickedId = parseInt(e.target.getAttribute("id"));

    if (!clickedItemsData[currentAttempt]) {
      clickedItemsData.push({
        clickedKeys: [],
        balls: 0,
        strike: 0,
      });
    }

    handleClickedKeysLogic(clickedElement, clickedId, currentAttempt);

    console.log("GAME DETAILS OBJECT????", clickedItemsData);
    console.log("CURRENT ATTEMPT ???", currentAttempt);

  });
});

function handleClickedKeysLogic(clickedElement, clickedId, currentAttemptIndex) {
  if (clickedItemsData[currentAttemptIndex].clickedKeys.length < 3) {
    clickedItemsData[currentAttemptIndex].clickedKeys.push(clickedId);
    clickedElement.setAttribute("disabled", true);
    const pushedKeys = clickedItemsData[currentAttemptIndex].clickedKeys;

    currentGuessEle.style.display = "inline";
    currentGuessEle.innerHTML = clickedItemsData[currentAttemptIndex].clickedKeys;

    if (clickedItemsData[currentAttemptIndex].clickedKeys.length === 3) {
      if (
        randomKeysArr[0] === pushedKeys[0] &&
        randomKeysArr[1] === pushedKeys[1] &&
        randomKeysArr[2] === pushedKeys[2]
      ) {
        clickedItemsData[currentAttemptIndex].strike = clickedItemsData[currentAttemptIndex].strike + 1;
        gameWinObj = {
          totalAttempts: currentAttempt + 1,
          clickedItemsData,
          randKeysArr
        };
        gameDetailsText.innerHTML = JSON.stringify(clickedItemsData);
        newGameButton.disabled = false;
        console.log("GAME OVER FINAL OBJECT???", gameWinObj);
      } else {
        clickedItemsData[currentAttemptIndex].clickedKeys.forEach((clickedKey, i) => {
          if (randomKeysArr.includes(clickedKey) && clickedKey === randKeysArr[i]) {
            clickedItemsData[currentAttemptIndex].strike = clickedItemsData[currentAttemptIndex].strike + 1;
          } else if (randomKeysArr.includes(clickedKey)) {
            clickedItemsData[currentAttemptIndex].balls = clickedItemsData[currentAttemptIndex].balls + 1;
          }
        })
        removeDisabledKeys();
        currentAttempt++;
        currentAttemptEle.innerHTML = `Current Attempt - ${currentAttempt + 1}`;
        currentGuessEle.style.display = "none";
        gameDetailsText.innerHTML = JSON.stringify(clickedItemsData);
      }
    }
  }
}

function removeDisabledKeys() {
  gameDigitButtons.forEach((element) => {
    const elementId = parseInt(element.getAttribute("id"));
    const validateElement = clickedItemsData[currentAttempt].clickedKeys.includes(elementId);
    if (validateElement) {
      element.removeAttribute("disabled");
    }
  });
}

function resetRandomNumbers() {
  const { random1, random2, random3, randKeysArr } = generateRandomDigits(3, 9);
  rand1 = random1;
  rand2 = random2;
  rand3 = random3;
  randomKeysArr = randKeysArr;
  randomNumEle.innerHTML = `Random Number - ${rand1},${rand2},${rand3}`;
}

function resetGame() {
  if (clickedItemsData[currentAttempt] && clickedItemsData[currentAttempt].clickedKeys.length !== 0) {
    removeDisabledKeys();
  }
  clickedItemsData = [];
  currentAttempt = 0;
  currentAttemptEle.innerHTML = `Current Attempt - ${currentAttempt}`;
  resetRandomNumbers();
  currentGuessEle.style.display = "none";
}
