const decks = require("../models/deckModel");

//finds all decks with a given card
exports.filter = (req, res) => {
  let { cardName } = req.params;
  cardName = cardName.replace(/_/g, " ");
  const decksList = decks.findDecks(cardName);
  if (!decksList) {
    res.status(400).json({ Message: "No decks found" });
    return;
  }
  res.status(200).json(decksList);
};

//finds price of a given deck
exports.price = (req, res) => {
  const { deckID } = req.params;
  const deckPrice = decks.findPrice(deckID);
  if (!deckPrice) {
    res.status(400).json({ Message: "Deck not found" });
    return;
  }
  res.status(200).json(deckPrice);
};

//finds a decklist for a specific deckID
exports.getDeck = (req, res) => {
  const { deckID } = req.params;
  const singleDeck = decks.findDeckById(deckID);
  if (!singleDeck) {
    res.status(400).json({ Message: "Deck not found" });
    return;
  }
  res.status(200).json(singleDeck);
};
