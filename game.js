const readline = require('readline');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

function roll() {
  const minValue = 1;
  const maxValue = 6;
  const roll = Math.floor(Math.random() * (maxValue - minValue + 1)) + minValue;
  return roll;
}

function getPlayersCount() {
  return new Promise((resolve) => {
    rl.question("Enter the number of players (2 - 4): ", (answer) => {
      const players = parseInt(answer);
      if (isNaN(players)) {
        console.log("Invalid, try again.");
        resolve(getPlayersCount());
      } else if (players >= 2 && players <= 4) {
        resolve(players);
      } else {
        console.log("Must be between 2 - 4 players.");
        resolve(getPlayersCount());
      }
    });
  });
}

async function playGame() {
  const maxScore = 50;
  const players = await getPlayersCount();
  const playerScores = new Array(players).fill(0);

  while (Math.max(...playerScores) < maxScore) {
    for (let playerIdx = 0; playerIdx < players; playerIdx++) {
      console.log(`\nPlayer number ${playerIdx + 1} turn has just started!`);
      console.log(`Your total score is: ${playerScores[playerIdx]}\n`);
      let currentScore = 0;

      while (true) {
        const shouldRoll = await new Promise((resolve) => {
          rl.question("Would you like to roll (y)? ", (answer) => {
            resolve(answer.toLowerCase() === 'y');
          });
        });

        if (!shouldRoll) {
          break;
        }

        const value = roll();
        if (value === 1) {
          console.log("You rolled a 1! , you are done for now!!");
          currentScore = 0;
          break;
        } else {
          currentScore += value;
          console.log(`You rolled a: ${value}`);
          console.log(`Your score is: ${currentScore}`);
        }
      }

      playerScores[playerIdx] += currentScore;
      console.log(`Your total score is: ${playerScores[playerIdx]}`);
    }
  }

  const maxPlayerScore = Math.max(...playerScores);
  const winningIdx = playerScores.indexOf(maxPlayerScore);
  console.log(`Player number ${winningIdx + 1} is the winner of the game with a score of: ${maxPlayerScore}`);

  rl.close();
}

playGame();