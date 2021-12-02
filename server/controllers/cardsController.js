const card = require("../models/cardModel");

//finds all versions of a given card name
exports.filter = (req, res) => {
  const { cardName } = req.params;
  let cardNameFixed = cardName.replace(/_/g, " ");
  cardNameFixed = cardNameFixed.replace(/%2F/gi, "/");
  const cards = card.getCardsByName(cardNameFixed);
  if (!cards) {
    res.status(400).json({ Message: "Please provide a valid card name." });
    return;
  }
  res.status(200).json(cards);
};

//finds single card by ID
exports.searchById = (req, res) => {
  const { cardID } = req.params;
  const singleCard = card.getOneById(cardID);
  if (!singleCard) {
    return res.status(400).json({ Message: "Card not found." });
  }
  res.status(200).json({ card: singleCard });
};

//finds price of single card
exports.price = (req, res) => {
  const { cardID } = req.params;
  const { foil } = Boolean(req.params);
  const singleCard = card.getOneById(cardID);
  if (!singleCard) {
    return res.status(400).json({ Message: "Price not found." });
  }
  if (foil) {
    res.status(200).json({ price: singleCard.prices.usdFoil });
    return;
  }
  res.status(200).json({ price: singleCard.prices.usd });
};
