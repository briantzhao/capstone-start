const fs = require("fs"),
  path = require("path"),
  cardFile = path.join(__dirname, "../data/default-cards-filtered.json");

const getAll = () => {
  const data = fs.readFileSync(cardFile);
  return JSON.parse(data);
};

const getOneById = (id) => {
  const cardsArray = getAll();
  const singleCard = cardsArray.find((card) => {
    if (card !== null) {
      return card.id === id;
    }
  });
  return singleCard;
};

const getCardsByName = (name) => {
  const cardsArray = getAll();
  const cards = cardsArray.filter((card) => {
    if (card !== null) {
      return card.name === name;
    }
  });
  return cards;
};

module.exports = { getOneById, getCardsByName };
