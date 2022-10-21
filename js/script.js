console.log('Loaded "Campo Minato"');

//1 creare html funzionale 
//2 generare dinamicamente le caselle
//3 quando clicchiamo sulla casella questa si colora + messaggio in console con numero casella
//4 creare bottone di start
//5 creare un una select con tre livelli di difficoltà (1 - 100(10), 2 - 81(9), 3 - 49(7))


//dichiaro i primi elementi con i quali interagirò
const objectContainer = document.querySelector('.container');
const playButton = document.querySelector('button');

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

}

function reset() {
  objectContainer.innerHTML = '';
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
  console.log(this.idCard);
};