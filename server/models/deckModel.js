const fs = require("fs"),
  path = require("path"),
  decksFile = path.join(__dirname, "../data/decklists.json"),
  cardsFile = path.join(__dirname, "../data/default-cards-filtered.json");

//returns all data from decks data
const getAll = () => {
  const data = fs.readFileSync(decksFile);
  return JSON.parse(data);
};

//returns all data from cards data
const getCards = () => {
  const data = fs.readFileSync(cardsFile);
  return JSON.parse(data);
};

//finds all decks that include specific card by card name
//must be done by card name, since we want to include decks
//that have different versions of the card
//(different versions of a card are interchangeable in playability)
const findDecks = (cardName) => {
  const decksArray = getAll();
  const decks = decksArray.filter((deck) => {
    const found = deck.list.find((card) => {
      return card.name === cardName;
    });
    if (found) {
      return deck;
    }
  });
  return decks;
};

//returns single deck based on deckID
const findDeckById = (deckID) => {
  const decksArray = getAll();
  const singleDeck = decksArray.find((deck) => {
    return deck.id === Number(deckID);
  });
  return singleDeck;
};

//queries card data to get prices of all cards in deck
//then returns the total price
const findPrice = (deckID) => {
  const singleDeck = findDeckById(deckID);
  const cardsArray = getCards();
  const prices = singleDeck.list.map((card) => {
    const singleCard = cardsArray.find((el) => {
      if (el !== null) {
        return el.id === card.uid;
      }
    });
    return singleCard.prices.usd;
  });
  let total = 0;
  while (prices.length > 0) {
    total = total + Number(prices.pop());
  }
  const formatter = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  });
  return formatter.format(total);
};

module.exports = { findDecks, findDeckById, findPrice };
