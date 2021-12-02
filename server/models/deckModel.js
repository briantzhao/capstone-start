const fs = require("fs"),
  path = require("path"),
  decksFile = path.join(__dirname, "../data/decklists.json"),
  cardsFile = path.join(__dirname, "../data/default-cards-filtered.json");

const getAll = () => {
  const data = fs.readFileSync(decksFile);
  return JSON.parse(data);
};

const getCards = () => {
  const data = fs.readFileSync(cardsFile);
  return JSON.parse(data);
};

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

const findDeckById = (deckID) => {
  const decksArray = getAll();
  const singleDeck = decksArray.find((deck) => {
    return deck.id === Number(deckID);
  });
  return singleDeck;
};

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
