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

//collego gli elementi del dom a delle variabili
const objectContainer = document.querySelector('.container');
const playButton = document.querySelector('button');
const gameDifficulty = document.getElementById('game-changer');

//assegno variabili globali
let score = 0;
const maxBombNumber = 16;
let bombPosition = [];

//la pressione del bottone play genera le caselle
playButton.addEventListener('click', playFunction);

function playFunction() {

  resetPlayground();

  playgroundDimension();
  console.log(playgroundDimension());

  createCard(playgroundDimension());

  //le bombe le inserisco in una variabile globale
  bombPosition = bombsGenerator(maxBombNumber);
  
  console.log(bombPosition);
}

//funzione che resetta gli elementi globali ad ogni pressione del playbutton
function resetPlayground() {
  objectContainer.innerHTML = '';
  score = 0;
}

//funzione per restituire il valeore della dimensione totale del campo da gioco
//ovvero del numero delle caselle
function playgroundDimension() {
  return Math.pow(gameDifficulty.value, 2);
}

//funzione che crea la card e la rende anche cliccabile
function createCard(maxCounter) {  
  
  for(let counter = 0; counter < maxCounter; counter++){
    const cardCreated = document.createElement('div');
    //objectContainer.style.border = `1px solid black`;
    objectContainer.append(cardCreated);
    cardCreated.classList.add("card");
    cardCreated.innerHTML = `<span>${counter + 1}</span>`;
    cardCreated.style.width = `calc(100% / ${gameDifficulty.value})`;
    cardCreated.style.height = `calc(100% / ${gameDifficulty.value})`;
    cardCreated.idCard = counter + 1;
    cardCreated.addEventListener('click', activeControl);
  }
}

//funzione dei controlli al click dellla card
function activeControl() {
  // console.log(this.idCard);
  if(!(bombPosition.includes(this.idCard))) {
    
    this.classList.add('active');
    this.removeEventListener('click', activeControl);
    score++;
    if(score === (playgroundDimension() - maxBombNumber)){
    console.log(playgroundDimension());
    console.log('hai vinto con tutte le caselle');
    winCondition(true);
    }
  }else{
    console.log('hai preso una bomba', score);
    winCondition(false);
  }
}

//funzione di controllo dello stato di gioco
function winCondition(isWin) {

  let resultMessage = "";
  
  if(isWin) {
    resultMessage = `Hai vinto scoprendo tutte le caselle senza una bomba!`
  }else{
    resultMessage = `Hai perso... Hai totalizzato ${score} caselle.`
  }
  //alla fine del game aggiungo un layer semitrasparente che blocca il click sulle caselle
  const endGameLayer = document.createElement('div');
  objectContainer.append(endGameLayer);
  endGameLayer.classList.add('end-game');
  endGameLayer.innerHTML = `<h3>${resultMessage}</h3>`;
  showBombs();
}

//funzione di end game che accende tutte le caselle bomba
function showBombs() {
  const cardControl = document.getElementsByClassName('card');
  for(let i = 0; i < playgroundDimension(); i++) {
    const card = cardControl[i];
    if(bombPosition.includes(card.idCard)) {
      card.classList.add('bomb');
    }
  }
}

//famigerata funzione per generare un numero casuale
function generateRandomNumber(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

//funzione per la generazione delle bombe
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