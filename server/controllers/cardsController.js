const card = require("../models/cardModel");

//finds all versions of a given card name
exports.filter = (req, res) => {
  const { cardName } = req.params;
  const cardNameFixed = cardName.replace(/_/g, " ");
  const cards = card.getCardsByName(cardNameFixed);
  if (!cards) {
    res.status(400).json({ Message: "Please provide a valid card name." });
    return;
  }
  res.status(200).json(cards);
};

//finds price of single card
exports.price = (req, res) => {
  const { cardID } = req.params;
  const { foil } = Boolean(req.params);
  const singleCard = card.getOneById(cardID);
  if (!singleCard) {
    res.status(400).json({ Message: "Price not found." });
  }
  if (foil) {
    res.status(200).json({ price: singleCard.prices.usdFoil });
    return;
  }
  res.status(200).json({ price: singleCard.prices.usd });
};
