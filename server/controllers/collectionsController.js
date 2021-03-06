const collection = require("../models/collectionModel");

//gets all cards from collection
exports.listCards = (req, res) => {
  const { userID } = req.params;
  res.json(collection.getUserColl(userID));
};

//adds single card to collection
exports.addCard = (req, res) => {
  const { userID } = req.params;
  const updatedCards = collection.add(userID, req.body);
  res.json(updatedCards);
};

//gets information for single card
exports.listSingleCard = (req, res) => {
  console.log("hello");
  const card = collection.getById(req.params.userID, req.params.id);
  if (!card) {
    res.status(400).json({ Message: "Please provide a valid card." });
  }
  res.json(card);
};

//updates quantity for a given card
exports.updateCardQuantity = (req, res) => {
  const { userID, id } = req.params;
  console.log("cardcontroller", req.body);
  const updatedCollection = collection.updateQuantity(userID, id, req.body);
  if (!updatedCollection) {
    res.status(400).json({ Message: "Please provide a valid card." });
  }
  res.json(updatedCollection);
};
