const axios = require("axios");
const fs = require("fs");

const API_URL = "https://archidekt.com/api/decks/";
let fullDecks = [];
let urls = [];
const getUrls = () => {
  fs.readFile("./data/decks.json", (err, data) => {
    if (err) {
      console.log(err);
      return;
    }
    urls = JSON.parse(data).map((deck) => {
      return `${API_URL}${deck.deckID}/`;
    });
    console.log(urls.length);
    next();
  });
};
getUrls();

const next = () => {
  if (!urls.length) {
    console.log("about to write to file");
    // fs.writeFile("./data/decklists.json", JSON.stringify(fullDecks), (err) => {
    fs.appendFile("./data/decklists.json", JSON.stringify(fullDecks), (err) => {
      if (err) {
        console.log(err);
        return;
      }
      console.log("append success");
    });
    return;
  }
  const url = urls.pop();
  axios
    .get(url)
    .then(({ data }) => {
      console.log("successful call");
      const newDeckList = data.cards.map((el) => {
        const strippedCard = {
          id: el.card.id,
          prices: {
            normal: el.card.tcg,
            foil: el.card.tcgfoil,
          },
          uid: el.card.uid,
          tcgProductID: el.card.tcgProductID,
          colors: el.card.oracleCard.colors,
          colorIdentity: el.card.oracleCard.colorIdentity,
          types: el.card.oracleCard.types,
          subTypes: el.card.oracleCard.subTypes,
          superTypes: el.card.oracleCard.superTypes,
          name: el.card.oracleCard.name,
          manaCost: el.card.oracleCard.manaCost,
          cmc: el.card.oracleCard.cmc,
          text: el.card.oracleCard.text,
          layout: el.card.oracleCard.layout,
          faces: el.card.oracleCard.faces,
          quantity: 1,
          categories: el.categories,
        };
        return strippedCard;
      });
      const deck = {
        id: data.id,
        name: data.name,
        list: newDeckList,
      };
      console.log(deck.name);
      fullDecks.push(deck);
      console.log("decks: ", fullDecks.length);
      setTimeout(next, 100);
    })
    .catch((err) => {
      console.log(err);
    });
};
