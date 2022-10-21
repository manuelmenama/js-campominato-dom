console.log('secondo campo loaded');

/**
 * GENERA CAMPO DA GIOCO
 * -genero dinamicamente delle celle in base al livello di difficoltà
 * -scrivo un numero su ogni cella in ordine crescente
 * -assegno ad ogni cella un custom id
 * -quando clicco su una casella questa si deve accendere
 * 
 * GENERARE BOMBE
 * -genero un array di 16 numeri casuali unici
 * 
 * 
 * FINE
 * -se l'utente clicca su una casella bomba con id uguale ad uno di array bombe
 *  -segno lo score fino a quel punto
 *  -messaggio negativo
 *  -mostro tutte le bombe
 *  -rendo il campo non cliccabile
 * -se l'utente non schiaccia nessuna casella bomba
 *  -messaggio affermativo
 */

const objectContainer = document.querySelector('.container');
const playButton = document.querySelectorAll('button');
const gameDifficulty = document.getElementById('game-changer');

score = 0;
maxBombNumber = 16;
bombPosition = [];

playButton.addEventListener('click', playFunction);

function playFunction() {
  resetPlayground();
  playgroundDimension();
  console.log(playgroundDimension());
}

function resetPlayground() {
  objectContainer.innerHTML = '';
}

function playgroundDimension() {
  return Math.pow(gameDifficulty.value, 2);
}