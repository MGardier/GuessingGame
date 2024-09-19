// @ts-nocheck
import { prompt } from "./prompt.js";

const MIN_NUMBER = 1;
const MAX_NUMBER = 100;

const RULES = `
Welcome to the Number Guessing Game! 🎮

Rules:
1. The system will generate a random number between ${MIN_NUMBER} and ${MAX_NUMBER}.
2. Your task is to guess this number.
3. Enter a number when prompted.
4. If your guess is too high or too low you'll be notified and you cand guess again.
5. The game continues until you guess the correct number.
    
Let's get started! 🚀`;

const INVALID_ANSWER_MESSAGE = `❌ Please choose a correct number between ${MIN_NUMBER} and ${MAX_NUMBER}.`;
const ASK_USER_MESSAGE = `\nEnter a number: `;
const USER_ANSWER_TOO_SHORT_MESSAGE = `📉 The entered number is **too short**.`;
const USER_ANSWER_TOO_BIG_MESSAGE = `📈 The entered number is **too big**.`;

const printRules = () => {
  console.log(RULES);
};

const validateAnswer = (answer) => {
  if (Number.isNaN(answer) || answer > MAX_NUMBER || answer < MIN_NUMBER) {
    console.log(INVALID_ANSWER_MESSAGE);
    return false;
  }
  return Number(answer);
};

const askUser = () => {
  let answer = null;
  do {
    answer = Number(prompt(ASK_USER_MESSAGE));
  } while (!validateAnswer(answer));

  return answer;
};

const compareAnswerWithTarget = (answerNumber, targetNumber) => {
  if (answerNumber === targetNumber) {
    console.log(`🟢 Well done! The random number was indeed ${targetNumber}`);
    return true;
  }
  const message =
    answerNumber > targetNumber
      ? USER_ANSWER_TOO_BIG_MESSAGE
      : USER_ANSWER_TOO_SHORT_MESSAGE;

  console.log(message);
  return false;
};

const guessingNumber = (attempts, targetNumber) => {
  let answer = null;
  do {
    answer = askUser();
    attempts++;
  } while (!compareAnswerWithTarget(answer, targetNumber));

  return attempts;
};

const getRandomInt = (min, max) => {
  return Math.floor(Math.random() * (max - min + 1) + min);
};

const main = () => {
  printRules();
  const targetNumber = getRandomInt(MIN_NUMBER, MAX_NUMBER);
  const attempts = guessingNumber(0, targetNumber);

  console.log(`You suceeded in ${attempts} attempts.`);
};

main();
