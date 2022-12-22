'use strict';

const score0El = document.getElementById('score--0');
const score1El = document.getElementById('score--1');
const current0El = document.getElementById('current--0');
const current1El = document.getElementById('current--1');
const player0El = document.querySelector('.player--0');
const player1El = document.querySelector('.player--1');
const diceEl = document.querySelector('.dice');
const btnNew = document.querySelector('.btn--new')
const btnRoll = document.querySelector('.btn--roll')
const btnHold = document.querySelector('.btn--hold')

score0El.textContent = 0;
score1El.textContent = 0;
diceEl.classList.add('hidden');

let scores, currentScore, activePlayer, playing;

function init() {
  scores = [0, 0]
  currentScore = 0;
  activePlayer = 0;
  playing = true;

  score0El.textContent = 0;
  score1El.textContent = 0;
  current1El.textContent = 0;
  current0El.textContent = 0;
  
  player0El.classList.remove('player--winner');
  player0El.classList.add('player--active');
  player1El.classList.remove('player--winner','player--active');
  diceEl.classList.add('hidden');
}

init();

function switchPlayer() {
  document.getElementById(`current--${activePlayer}`).textContent = 0;
  currentScore = 0
  activePlayer = activePlayer === 0 ? 1 : 0;
  player0El.classList.toggle('player--active')
  player1El.classList.toggle('player--active')
}

function rollDice() {
  if (!playing) return;

  const randomDice = Math.trunc(Math.random()  * 6) + 1

  diceEl.classList.remove('hidden');
  diceEl.src = `/images/dice-${randomDice}.png`

  checkRollDice(randomDice);
};

function checkRollDice(dice) {
  if(dice !== 1) {
    currentScore += dice;
    document.getElementById(`current--${activePlayer}`).textContent = currentScore;
    return 
  }

  switchPlayer()
}

function holdDice() {
  if (!playing) return;

  scores[activePlayer] += currentScore;
  document.getElementById(`score--${activePlayer}`).textContent = scores[activePlayer];

  checkPlayerWinner();

  switchPlayer();
}

function checkPlayerWinner() {
  if (scores[activePlayer] >= 100) {
    playing = false;
    document.querySelector(`.player--${activePlayer}`).classList.add('player--winner');
    document.querySelector(`.player--${activePlayer}`).classList.remove('player--active');
    return;
  }
}

function newGame() {
  init();
}

btnRoll.addEventListener('click', rollDice);
btnHold.addEventListener('click', holdDice);
btnNew.addEventListener('click', newGame);

