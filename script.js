/****************************Game Rules
************ Each turn, a player repeatedly rolls a die until either a 1 is rolled or the player holds and scores the sum of the rolls (i.e. the turn total). At any time during a player's turn, the player is faced with two decisions:

roll - If the player rolls a
1: the player scores nothing and it becomes the opponent's turn.
2 - 6: the number is added to the player's turn total and the player's turn continues.
hold - The turn total is added to the player's score and it becomes the opponent's turn. 
extra 
1. A player looses his Entire score when he rolls two 6 in a row.After that, it's the next player's turn.(save the previousdice roll in a separate variable)
2.Add an input field to the HTML where players can set the winning score , so that they can change the predefined score of 100.
3. Add anther dice to the game, so that there are two dices now. the player looses his current scorewhen one of them is a !.(hint: you will need CSS t position the second dice)

****************************************************/

var dice, scores, roundScore, activePlayer, gamePlaying;
var lastDice;
init();

document.querySelector('.btn-roll').addEventListener('click', function () {
  if (gamePlaying) {
    //random number
    var dice1 = Math.floor(Math.random() * 6) + 1;
    var dice2 = Math.floor(Math.random() * 6) + 1;
    //display the result
    var diceDom1 = document.getElementById('dice-1');
    var diceDom2 = document.getElementById('dice-2');
    diceDom1.style.display = 'block';
    diceDom2.style.display = 'block';
    diceDom1.src = 'resources/dice-' + dice1 + '.png';
    diceDom2.src = 'resources/dice-' + dice2 + '.png';
    //update the round score if the rolled number was NOT a 1
    if (dice === 6 && lastDice === 6) {
      //player looses score
      scores[activePlayer] = 0;
      document.querySelector('#score-' + activePlayer).textContent = '0';
      nextPlayer();
    } else if (dice1 !== 1 && dice2 !== 1) {
      // add score
      roundScore += dice1 + dice2;
      document.querySelector(
        '#current-' + activePlayer
      ).textContent = roundScore;
    } else {
      // next player
      nextPlayer();
    }
    lastDice = dice;
  }
});

document.querySelector('.btn-hold').addEventListener('click', function () {
  if (gamePlaying) {
    //add current score to our global
    scores[activePlayer] += roundScore;
    //display in the UI
    document.querySelector('#score-' + activePlayer).textContent =
      scores[activePlayer];
    var input = document.querySelector('.final-score').value;
    console.log(input);
    var winningScore;
    //Check if the player won the game
    if (input) {
      winningScore = input;
    } else {
      winningScore = 100;
    }
    if (scores[activePlayer] >= winningScore) {
      document.querySelector('#name-' + activePlayer).textContent = 'Winner!';
      document.querySelector('.dice').style.display = 'none';
      document
        .querySelector('.player-' + activePlayer + '-panel')
        .classList.add('winner');
      document
        .querySelector('.player-' + activePlayer + '-panel')
        .classList.remove('active');
      gamePlaying = false;
    } else {
      // next player
      nextPlayer();
    }
  }
});
document.querySelector('.btn-new').addEventListener('click', init);
function init() {
  scores = [0, 0];
  activePlayer = 0;
  roundScore = 0;
  gamePlaying = true;
  document.getElementById('dice-1').style.display = 'none';
  document.getElementById('dice-2').style.display = 'none';
  document.getElementById('score-0').textContent = '0';
  document.getElementById('score-1').textContent = '0';
  document.getElementById('current-0').textContent = '0';
  document.getElementById('current-1').textContent = '0';
  document.getElementById('name-0').textContent = 'Player 1';
  document.getElementById('name-1').textContent = 'Player 2';
  document.querySelector('.player-0-panel').classList.remove('winner');
  document.querySelector('.player-1-panel').classList.remove('winner');
  document.querySelector('.player-0-panel').classList.remove('active');
  document.querySelector('.player-1-panel').classList.remove('active');
  document.querySelector('.player-0-panel').classList.add('active');
}

function nextPlayer() {
  //next player
  activePlayer === 0 ? (activePlayer = 1) : (activePlayer = 0);
  roundScore = 0;
  document.getElementById('current-0').textContent = '0';
  document.getElementById('current-1').textContent = '0';
  document.querySelector('.player-0-panel').classList.toggle('active');
  document.querySelector('.player-1-panel').classList.toggle('active');
  document.querySelector('.dice').style.display = 'none';
}
