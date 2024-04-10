import { prompt, promptList } from "./prompt.js";

//set min and max for targetNumber
const minNumber = 0;
const maxNumber = 100;

//Generate random integer between min and max included
const getRandomInt = (min, max) => {
  const minCeiled = Math.ceil(min);
  const maxFloored = Math.floor(max);
  return Math.floor(Math.random() * (maxFloored - minCeiled + 1) + minCeiled);
};

//ask user for a number , if its valid return number else use recursive function to call him self
const askUserForAGuessNumber = () => {
  const guessNumber = Number(
    prompt(`\nEnter a number between ${minNumber} and ${maxNumber} :`)
  );
  if (
    guessNumber > maxNumber ||
    guessNumber < minNumber ||
    Number.isNaN(guessNumber)
  ) {
    console.log(
      `\nThe entered number is invalid. It must be between ${minNumber} and ${maxNumber}`
    );
    return askUserForAGuessNumber();
  }
  return guessNumber;
};

//compare guessNumber and targetNumber , if they are equals win message else  message for help user to guess targetNumber.
const checkIfGuessNumberIsTargetNumber = (targetNumber, guessNumber) => {
  if (guessNumber > targetNumber) {
    console.log(`\nThe entered number is **too big**.`);
    return false;
  }
  if (guessNumber < targetNumber) {
    console.log(`\nThe entered number is **too small**.`);
    return false;
  }
  console.log(`\nWell done! The random number was indeed ${targetNumber}.`);
  return true;
};

//increment attempts  by 1 for each guess number
const incrementAttempt = (attempts) => attempts + 1;

//
const countAttempt = (targetNumber, attempts) => {
  const userNumber = askUserForAGuessNumber();
  if (!checkIfGuessNumberIsTargetNumber(targetNumber, userNumber))
    return countAttempt(targetNumber, incrementAttempt(attempts));
  return attempts;
};

const startGame = () => {
  console.log(`Welcome to the Number Guessing Game !`);
  console.log(`\nRules:`);
  console.log(
    `1. The system will generate a random number between ${minNumber} and ${maxNumber}.`
  );
  console.log(`2. Your task is to guess this number.`);
  console.log(`3. Enter a number when prompted.`);
  console.log(
    `.If your guess is too high or too low, you'll be notified, and you can guess again.`
  );
  console.log(`5. The game continues until you guess the correct number.`);
  console.log(`\nLet's get started! `);

  const targetNumber = getRandomInt(minNumber, maxNumber);
  //compter le nombre d'essais.
  let attempts = 0;
  attempts = countAttempt(targetNumber, attempts);
  console.log(`\nYou succeeded in ${attempts} attempts.`);
};

const restartGame = () => {
  const replayChoice = ["Yes", "No"];
  const replayAnwser = promptList(
    replayChoice,
    "\nWould you like to play again ?"
  );
  if (replayAnwser === replayChoice[0]) {
    console.log("\n\n");
    startGame();
  } else if (replayAnwser === replayChoice[1])
    console.log("Thank you for playing! Goodbye.");
  else {
    console.log("Invalid choice. Please enter Y or N.");
    restartGame();
  }
};

startGame();
