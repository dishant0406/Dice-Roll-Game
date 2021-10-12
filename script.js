'use strict';
// VARIABLE DECLARATION
let score0El = document.querySelector('#score--0');
let score1El = document.querySelector('#score--1');
let dicenum = document.querySelector('.dice');
let dicenew = document.querySelector('.btn--new');
let diceroll = document.querySelector('.btn--roll');
let dicehold = document.querySelector('.btn--hold');
const currentscore0 = document.querySelector('#current--0');
const currentscore1 = document.querySelector('#current--1');

let scoreplayer, currentscore, activeplayer, playing;

const iniCond = function () {
  scoreplayer = [0, 0];
  currentscore = 0;
  activeplayer = 0;
  playing = true;

  dicenum.classList.add('hidden');
  score0El.textContent = 0;
  score1El.textContent = 0;
  currentscore0.textContent = 0;
  currentscore1.textContent = 0;

  //setting background
  document.querySelector('.player--1').classList.remove('player--active');

  document.querySelector('.player--0').classList.add('player--active');
  document.querySelector(`.player--1`).classList.remove('player--winner');
  document.querySelector(`.player--0`).classList.remove('player--winner');
};

iniCond();

//functions
const switchplayer = function () {
  document.querySelector(`#current--${activeplayer}`).textContent = 0;
  if (activeplayer == 0) {
    activeplayer = 1;
  } else if (activeplayer == 1) {
    activeplayer = 0;
  }
  currentscore = 0;

  if (activeplayer == 1) {
    document.querySelector('.player--0').classList.remove('player--active');
    document.querySelector('.player--1').classList.add('player--active');
  } else if (activeplayer == 0) {
    document.querySelector('.player--1').classList.remove('player--active');
    document.querySelector('.player--0').classList.add('player--active');
  }
};

//DISPLAYING DICE AND CHECKING 1
diceroll.addEventListener('click', function () {
  if (playing) {
    //GENERATE A RANDOM DICE ROLL
    let dicerollnum = Math.trunc(Math.random() * 6 + 1);

    //DISPLAY DICE
    dicenum.classList.remove('hidden');
    document.querySelector('.dice').src = `dice-${dicerollnum}.png`;
    console.log(dicerollnum);

    //CHECK 1
    if (dicerollnum !== 1) {
      currentscore = currentscore + dicerollnum;
      document.querySelector(`#current--${activeplayer}`).textContent =
        currentscore;
    } else {
      switchplayer();
    }
  }
});

dicehold.addEventListener('click', function () {
  if (playing) {
    scoreplayer[activeplayer] = scoreplayer[activeplayer] + currentscore;

    if (activeplayer == 0) {
      score0El.textContent = scoreplayer[activeplayer];
    } else if (activeplayer == 1) {
      score1El.textContent = scoreplayer[activeplayer];
    }

    if (scoreplayer[activeplayer] > 100) {
      playing = false;
      dicenum.classList.add('hidden');
      document
        .querySelector(`.player--${activeplayer}`)
        .classList.add('player--winner');
      document
        .querySelector(`.player--${activeplayer}`)
        .classList.remove('player--active');
    } else {
      switchplayer();
    }
  }
});

dicenew.addEventListener('click', iniCond);
