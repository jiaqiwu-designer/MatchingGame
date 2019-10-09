//Define variables
const allCards = document.querySelectorAll(".card");
const allCardsArr = Array.from(allCards);
const cardContainer = document.querySelector(".deck");
const restart = document.querySelector(".restart");
const timerText = document.querySelector(".timer");
const star1 = document.querySelector("#star1");
const star2 = document.querySelector("#star2");
const star3 = document.querySelector("#star3");
const Moves = document.querySelector(".moves");
const endingTxt = document.querySelector(".endingTxt");
const endingDialog = document.querySelector(".endingDialogue");
const endingRestart = document.querySelector(".endRestart");
let cardsToCompare = [];
let numberOfMoves = 0;
let matchedCards = [];
let flexOrder = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16];

//Declare functions
function compare(a, b) {
  if (a === b) {
    return true;
  } else {
    return false;
  }
}

// Shuffle function from http://stackoverflow.com/a/2450976
function shuffle(array) {
  var currentIndex = array.length,
    temporaryValue,
    randomIndex;

  while (currentIndex !== 0) {
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex -= 1;
    temporaryValue = array[currentIndex];
    array[currentIndex] = array[randomIndex];
    array[randomIndex] = temporaryValue;
  }

  return array;
}

//create timer
let seconds = 0;
setInterval(function() {
  timerText.innerHTML = seconds++;
}, 1000);

//main game
cardContainer.addEventListener("click", function(event) {
  //click to show cards
  event.target.classList.add("open", "show");

  cardsToCompare.push(event.target); //add cards to compare pile

  let starNumber = 3; //track star number

  setTimeout(() => {
    if (cardsToCompare.length > 1) {
      //track moves
      numberOfMoves += 1;
      Moves.textContent = numberOfMoves;

      //set star ratings
      if (numberOfMoves > 9) {
        star3.className = "fa fa-star-o";
        starNumber = 2;
      }
      if (numberOfMoves > 18) {
        star2.className = "fa fa-star-o";
        starNumber = 1;
      }
      if (numberOfMoves > 27) {
        star1.className = "fa fa-star-o";
        starNumber = 0;
      }

      //compare cards
      if (compare(cardsToCompare[0].innerHTML, cardsToCompare[1].innerHTML)) {
        //add match class to matched cards
        cardsToCompare[0].classList.add("match");
        cardsToCompare[1].classList.add("match");

        //add matched cards to the match pile
        matchedCards.push(cardsToCompare[0]);
        matchedCards.push(cardsToCompare[1]);

        cardsToCompare = []; //clear the compare pile

        //define winning condition
        if (matchedCards.length === 16) {
          endingDialog.style.visibility = "visible"; //display ending dialogue

          //dynamically update the ending text message to players
          endingTxt.textContent = `You finished game with ${starNumber} stars in ${seconds} seconds and ${numberOfMoves} moves.`;

          //shuffle cards
          shuffle(flexOrder);
          console.log(flexOrder);
          for (let [index, card] of matchedCards.entries()) {
            card.className = "card";
            card.style.order = flexOrder[index];
          }

          //reset lists and stars
          matchedCards = [];
          seconds = 0;
          numberOfMoves = 0;
          Moves.textContent = 0;
          star1.className = "fa fa-star";
          star2.className = "fa fa-star";
          star3.className = "fa fa-star";
        }
      } else {
        //flip cards back
        cardsToCompare[0].classList.remove("open", "show");
        cardsToCompare[1].classList.remove("open", "show");
        cardsToCompare = []; //clear compare pile
      }
    }
  }, 500);
});

//retart the game
restart.addEventListener("click", function() {
  shuffle(flexOrder);
  for (let [index, card] of allCardsArr.entries()) {
    card.className = "card";
    card.style.order = flexOrder[index];
  }
  matchedCards = [];
  seconds = 0;
  numberOfMoves = 0;
  Moves.textContent = 0;
  star1.className = "fa fa-star";
  star2.className = "fa fa-star";
  star3.className = "fa fa-star";
});

endingRestart.addEventListener("click", function() {
  endingDialog.style.visibility = "hidden";
  seconds = 0;
});
