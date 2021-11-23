const card = require("../models/cardModel");

//finds all versions of a given card name
exports.filter = (req, res) => {
  const { cardName } = req.body;
  card
    .find({ cardName })
    .then((cards) => {
      res.status(200).json({ cards });
    })
    .catch(() => {
      res.status(400).json({ Message: "Card not found." });
    });
};

//finds price of single card
exports.price = (req, res) => {
  const { cardID, foil } = req.body;
  card
    .find({ cardID })
    .then((card) => {
      foil
        ? res.status(200).json({ price: card.usd_foil })
        : res.status(200).json({ price: card.usd });
    })
    .catch(() => {
      res.status(400).json({ Message: "Price not found" });
    });
};
