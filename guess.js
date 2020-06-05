// import and initialize lib
const rl = require("readline").createInterface({
  input: process.stdin,
  output: process.stdout,
});
const chalk = require("chalk");
const figlet = require("figlet");

// set variables
const guessNumber = Math.floor(Math.random() * 100);
let attempts = 0;
let delta = "";
let isWin = false;

console.clear();

console.log(
  chalk.yellow(figlet.textSync("GuessMe", { horizontalLayout: "full" }))
);

console.log(chalk.green("Guess a number between 0 and 100\n\n"));

// prompt user for answer
rl.question("Make your guess ! \n", (guess) => {
  attempts++;
  if (parseInt(guess) === guessNumber) {
    isWin = true;
    rl.close();
  } else {
    delta = guess < guessNumber ? chalk.bgRed("low") : chalk.bgGreen("high");
    // set new prompt text
    rl.setPrompt(`Sorry your guess is too ${delta}. Try again\n`);
    rl.prompt();
    // set event listener for user input
    rl.on("line", (guess) => {
      attempts++;
      delta = guess < guessNumber ? chalk.bgRed("low") : chalk.bgGreen("high");

      if (parseInt(guess) === guessNumber) {
        isWin = true;
        rl.close();
      } else {
        // set new prompt text
        rl.setPrompt(`Sorry your guess is too ${delta}. Try again\n`);
        rl.prompt();
      }
    });
  }
});

rl.on("close", () => {
  const term = attempts > 1 ? "attempts" : "guess";
  if (isWin) {
    console.log(
      `Your guess is correct ! I took you ${attempts} ${term} to find the correct answer`
    );
  } else {
    console.log("Bye !");
  }
});

// TODO: extract question to function
// function should take string as input
// ask question
// check for correctness
// if correct close readline
// else ask new question
