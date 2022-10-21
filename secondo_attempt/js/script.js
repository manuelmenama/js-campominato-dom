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
const playButton = document.querySelector('button');
const gameDifficulty = document.getElementById('game-changer');

let score = 0;
const maxBombNumber = 16;
let bombPosition = [];

playButton.addEventListener('click', playFunction);

function playFunction() {

  resetPlayground();

  playgroundDimension();
  console.log(playgroundDimension());

  createCard(playgroundDimension());

  bombPosition = bombsGenerator(maxBombNumber);
  
  console.log(bombPosition);
}

function resetPlayground() {
  objectContainer.innerHTML = '';
}

function playgroundDimension() {
  return Math.pow(gameDifficulty.value, 2);
}

function createCard(maxCounter) {
  
  
  for(let counter = 0; counter < maxCounter; counter++){
    const cardCreated = document.createElement('div');
    objectContainer.append(cardCreated);
    cardCreated.classList.add("card");
    cardCreated.innerHTML = `<span>${counter + 1}</span>`;
    cardCreated.style.width = `calc(100% / ${gameDifficulty.value})`;
    cardCreated.style.height = `calc(100% / ${gameDifficulty.value})`;
    cardCreated.idCard = counter + 1;
    cardCreated.addEventListener('click', activeControl);
  }
}

function activeControl() {
  console.log(this);

  this.classList.add('active');
}

function generateRandomNumber(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function bombsGenerator(maxArrayLenght) {
  const bombsGenerated = [];
  let min = 1;
  let max = playgroundDimension();
  let i = 0;
  while(i < maxArrayLenght) {
    let randomNumber = generateRandomNumber(min, max);
    if(!bombsGenerated.includes(bombsGenerated[i])) {
      bombsGenerated.push(randomNumber);
      i++;
    }
  }
  return bombsGenerated;
}