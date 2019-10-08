import "./styles.css";

const allCards = document.querySelectorAll(".card");
const allCardsArr = Array.from(allCards);
const cardContainer = document.querySelector(".deck");
const restart = document.querySelector(".restart");
const timerText = document.querySelector(".timer");
const star1 = document.querySelector("#star1");
const star2 = document.querySelector("#star2");
const star3 = document.querySelector("#star3");
const Moves = document.querySelector(".moves");
let cardsToCompare = [];
let numberOfMoves = 0;
let matchedCards = [];
let flexOrder = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16];

function compare(a, b) {
  if (a === b) {
    return true;
  } else {
    return false;
  }
}

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

//click to show cards
cardContainer.addEventListener("click", function(event) {
  event.target.classList.add("open", "show");
  cardsToCompare.push(event.target);

  setTimeout(() => {
    if (cardsToCompare.length > 1) {
      //track moves
      numberOfMoves += 1;
      Moves.textContent = numberOfMoves;

      if (numberOfMoves > 9) {
        star3.className = "fa fa-star-o";
      }
      if (numberOfMoves > 18) {
        star2.className = "fa fa-star-o";
      }
      if (numberOfMoves > 27) {
        star1.className = "fa fa-star-o";
      }

      if (compare(cardsToCompare[0].innerHTML, cardsToCompare[1].innerHTML)) {
        cardsToCompare[0].classList.add("match");
        cardsToCompare[1].classList.add("match");
        matchedCards.push(cardsToCompare[0]);
        matchedCards.push(cardsToCompare[1]);
        cardsToCompare = [];
        console.log(matchedCards);
        if (matchedCards.length === 8) {
          shuffle(flexOrder);
          console.log(flexOrder);
          for (let [index, card] of matchedCards.entries()) {
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
        }
      } else {
        cardsToCompare[0].classList.remove("open", "show");
        cardsToCompare[1].classList.remove("open", "show");
        cardsToCompare = [];
      }
    }
  }, 1000);
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
