const fs = require("fs"),
  path = require("path"),
  cardFile = path.join(__dirname, "../data/default-cards-filtered.json");

//returns all data from card data
const getAll = () => {
  const data = fs.readFileSync(cardFile);
  return JSON.parse(data);
};

//returns card based on UID
const getOneById = (id) => {
  const cardsArray = getAll();
  const singleCard = cardsArray.find((card) => {
    if (card !== null) {
      return card.id === id;
    }
  });
  return singleCard;
};

//returns all versions of a given card (from different sets)
const getCardsByName = (name) => {
  const cardsArray = getAll();
  const cards = cardsArray.filter((card) => {
    if (card !== null) {
      return card.name === name;
    }
  });
  //ensure that duplicate sets aren't returned
  let foundCards = [];
  cards.forEach((card) => {
    if (!foundCards.find((el) => el.setID === card.setID)) {
      foundCards.push(card);
    }
  });
  return foundCards;
};

module.exports = { getOneById, getCardsByName };
