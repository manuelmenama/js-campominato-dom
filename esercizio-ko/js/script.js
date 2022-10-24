console.log('Loaded "Campo Minato"');

//1 creare html funzionale 
//2 generare dinamicamente le caselle
//3 quando clicchiamo sulla casella questa si colora + messaggio in console con numero casella
//4 creare bottone di start
//5 creare un una select con tre livelli di difficoltà (1 - 100(10), 2 - 81(9), 3 - 49(7))

//SECONDA PARTE
/**
 * -creo variabile con lo score di gioco
 * -creo array di 16 numeri bomba
 * -creo variabile del numero massimo di bombe generate
 * 
 * GENERARE LE BOMBE
 * -creo 16 numeri generati casualmente da 1 a grandezza playground
 * 
 * CONDIZIONI DI VINCITA
 * -se casella premuta è uguale ad una bomba, fine gioco, restituisco il punteggio
 * -se clicco tutte le caselle senza bomba, fine gioco
 * FINE GIOCO
 * -quando calpesto una bomba tutte le bombe si accendono
 * -il playground diventa incliccabile
 * 
 */

//dichiaro i primi elementi con i quali interagirò
const objectContainer = document.querySelector('.container');
const playButton = document.querySelector('button');

let score = 0;
const maxBombNumber = 16;
let bombNumbersArray = [];

//al click del play button viene generato il campo da gioco
playButton.addEventListener('click', playFunction);

function playFunction() {
  //appena clicco viene eliminato tutto quello che c'era nel campo da gioco
  reset();
  //sempre al click viene letto il value della difficoltà selezionata
  let gameDifficulty = document.getElementById('game-changer').value;
  console.log(gameDifficulty);
  //calcolo la dimensione del campo da gioco che utilizzo come limite del contatore
  const playgroundDimension = Math.pow(gameDifficulty, 2);
  
  //chiamo una funzione all'interno di un for che genererà tante caselle quante dice il contatore
  for (let i = 0; i < playgroundDimension; i++) {
    generateNumeratedCard(i, objectContainer, gameDifficulty);
  };

  bombNumbersArray = generateBombNumber(bombNumbersArray, maxBombNumber, playgroundDimension);

  console.log(bombNumbersArray);

  //const playgroundCard = document.getElementsByClassName('card');

  return gameDifficulty;
}


function generateBombNumber(numericArray, maxArrayLenght, playgroundDimension) {
  const min = 1;
  const max = playgroundDimension;
  let i = 0;
  while(i < maxArrayLenght) {
    let randomNumber = randomNumberGenerator(min, max);
    if(!numericArray.includes(numericArray[i])) {
      numericArray.push(randomNumber);
      i++;
    }
  }
  return numericArray;
}

function randomNumberGenerator(min, max){
  const numberGenerated = Math.floor(Math.random() * (max - min + 1)) + min;
  return numberGenerated;
}

function reset() {
  objectContainer.innerHTML = '';
  bombNumbersArray = [];
}

/** la funzione crea la card e inserisce il numero
 * 
 * @param {number} iterationCounter 
 * @param {object} objectContainer 
 * @param {number} gameDifficulty 
 */
function generateNumeratedCard(iterationCounter, objectContainer, gameDifficulty) {

  const cardCreated = document.createElement('div');
  objectContainer.append(cardCreated);
  cardCreated.className = 'card';
  cardCreated.innerHTML = `<span>${iterationCounter + 1}</span>`;
  cardCreated.style.width = generateCalcCss(gameDifficulty);
  cardCreated.style.height = generateCalcCss(gameDifficulty);
  //aggiungo un id custom incrementale a tutte le caselle
  cardCreated.idCard = iterationCounter + 1;
  //allo scattare dell'evento appiccico una classe active alla casella
  cardCreated.addEventListener('click', activateCard);
}

/** la funzione attende un valore numerico per dare dimensione alla card
 * 
 * @param {number} numberOfElem 
 * @returns 
 */
function generateCalcCss(numberOfElem){
  return `calc(100% / ${numberOfElem})`
}

/**
 * funzione che appiccica una classe active alle card
 */
function activateCard() {
  this.classList.add('active');
  score++;
  console.log(this.idCard);

  if(score === (gameDifficulty() - maxBombNumber)) {
    winControl(true);
  }

  if(bombNumbersArray.includes(this.idCard)) {
    winControl(false);
  }
};

function endGame(winControl) {

  if(winControl){
    console.log("vinto");
  }else{
    console.log("perso con score: ", score);
  }

}