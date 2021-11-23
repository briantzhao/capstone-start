const decks = require("../models/deckModel");
const cards = require("../models/cardModel");

//finds all decks with a given card
exports.filter = (req, res) => {
  const { cardName } = req.body;
  decks
    .find({ cardName })
    .then((decks) => {
      res.status(200).json({ decks });
    })
    .catch(() => {
      res.status(400).json({ Message: "No decks found" });
    });
};

//finds price of a given deck
exports.price = (req, res) => {
  const { deckID } = req.body;
  decks
    .find({ deckID })
    .then((deck) => {
      let deckPrice = 0;
      for (let i = 0; i < deck.length(); i++) {
        cards
          .find({ cardID: deck[i].id })
          .then((card) => {
            deckPrice += card.usd;
          })
          .catch((err) => {
            console.log(err);
          });
      }
      res.status(200).json({ deckPrice });
    })
    .catch(() => {
      res.status(400).json({ Message: "Deck not found" });
    });
};

//finds a decklist for a specific deckID
exports.getDeck = (req, res) => {
  const { deckID } = req.body;
  decks
    .find({ deckID })
    .then((deck) => {
      res.json({ deck });
    })
    .catch(() => {
      res.status(400).json({ Message: "Deck not found" });
    });
};
