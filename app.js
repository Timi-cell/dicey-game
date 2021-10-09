/*
GAME RULES:

- The game has 2 players, playing in rounds
- In each turn, a player rolls a dice as many times as he whishes. Each result get added to his ROUND score
- BUT, if the player rolls a 1, all his ROUND score gets lost. After that, it's the next player's turn
- The player can choose to 'Hold', which means that his ROUND score gets added to his GLOBAL score. After that, it's the next player's turn
- The first player to reach 100 points on GLOBAL score wins the game

*/

/*
THREE NEW CHALLENGES
Changing the game to follow these rules

1. A player looses his ENTIRE score when he rolls two 6 in a row. After that, it's the next player's turn. (Hint: Always save the previous dice roll in a seperate variable)

2. Add an input field to the HTML where players can set the winning score , so that they can change the predefined score of 100. (Hint: You can read that value with the .value property in JavaScript. This is a good opportunity to use google to figure this out.)

3. Add another dice to the game, so that there are two dices now. The player looses his current score when one of them is a 1. (Hint ; you will need CSS to position the second dice, so take a look at the CSS code for the first one.)
*/

let scores, roundScore, activePlayer, gamePlaying;

init();

// When a User clicks on the ROLL DICE button 👇
document.querySelector(".btn-roll").addEventListener("click", () => {
  if (gamePlaying) {
    // 1. Create Random Numbers
    let dice1 = Math.floor(Math.random() * 6) + 1;
    let dice2 = Math.floor(Math.random() * 6) + 1;
    console.log(dice1, dice2);
    // 2. Display the result
    let diceDOM = document.querySelectorAll(".dice");
    for (let i = 0; i < diceDOM.length; i++) {
      diceDOM[i].style.display = "block";
      diceDOM[0].src = `/images/dice-${dice1}.png`;
      diceDOM[1].src = `/images/dice-${dice2}.png`;
    }
    // diceDOM.style.display = "block";
    // diceDOM.src = `/images/dice-${dice}.png`;

    // 3. Update the round score if the rolled number was not a 1
    if (dice1 === 6 && dice2 === 6) {
      scores[activePlayer] = 0;
      document.getElementById(`score-${activePlayer}`).textContent = "0";
      nextPlayer();
    } else if (dice1 !== 1 && dice2 !== 1) {
      // Set first score to a variable
      let firstScore = dice1;
      // Add the second score to the created variable
      firstScore += dice2;
      // Add the total score to the roundscore
      roundScore += firstScore;
      // Show the current score
      document.querySelector(`#current-${activePlayer}`).textContent =
        roundScore;
    } else {
      // Next Player
      nextPlayer();
    }
  }
});

// When the User clicks on the HOLD button

document.querySelector(".btn-hold").addEventListener("click", () => {
  if (gamePlaying) {
    // Add current score to global score
    scores[activePlayer] += roundScore;
    // Update User interface
    document.querySelector(`#score-${activePlayer}`).textContent =
      scores[activePlayer];
    // Check which player won the game
    let inputValue = document.querySelector(".input").value;
    let winningScore;
    if (inputValue) {
      winningScore = inputValue;
    } else {
      winningScore = 100;
    }
    if (scores[activePlayer] >= winningScore) {
      document.querySelector(`#name-${activePlayer}`).textContent = "Winner!";
      const dices = document.querySelectorAll(".dice");
      for (let dice of dices) dice.style.display = "none";
      document
        .querySelector(`.player-${activePlayer}-panel`)
        .classList.add("winner");
      document
        .querySelector(`.player-${activePlayer}-panel`)
        .classList.remove("active");
      document.getElementById(`current-${activePlayer}`).textContent = "0";
      gamePlaying = false;
    } else {
      // Next Player
      nextPlayer();
    }
  }
});

// The DRY principle for NEXT PLAYER

function nextPlayer() {
  activePlayer === 0 ? (activePlayer = 1) : (activePlayer = 0);
  roundScore = 0;
  document.getElementById("current-0").textContent = "0";
  document.getElementById("current-1").textContent = "0";
  document.querySelector(".player-0-panel").classList.toggle("active");
  document.querySelector(".player-1-panel").classList.toggle("active");
  const dices = document.querySelectorAll(".dice");
  for (let dice of dices) dice.style.display = "none";
}

// When the user clicks on the NEW GAME  button
document.querySelector(".btn-new").addEventListener("click", init);

// The init function
function init() {
  scores = [0, 0];
  roundScore = 0;
  activePlayer = 0;
  gamePlaying = true;
  //document.querySelector(".dice").style.display = "none";
  const dices = document.querySelectorAll(".dice");
  for (let dice of dices) dice.style.display = "none";
  document.getElementById("score-0").textContent = "0";
  document.getElementById("score-1").textContent = "0";
  document.getElementById("current-0").textContent = "0";
  document.getElementById("current-1").textContent = "0";
  document.getElementById("name-0").textContent = "Player 1";
  document.getElementById("name-1").textContent = "Player 2";
  document.querySelector(".player-0-panel").classList.remove("winner");
  document.querySelector(".player-1-panel").classList.remove("winner");
  document.querySelector(".player-0-panel").classList.remove("active");
  document.querySelector(".player-1-panel").classList.remove("active");
  document.querySelector(".player-0-panel").classList.add("active");
}
