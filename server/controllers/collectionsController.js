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

// //gets information for single card
// exports.listSingleCard = (req, res) => {
//   const card = collection.getById(req.params.id);
//   if (!card) {
//     res.status(400).json({ Message: "Please provide a valid card." });
//   }
//   res.json(card);
// };

//deletes data for a card in a collection
// exports.deleteCard = (req, res) => {
//   const updatedCollection = collection.remove(req.params.id);
//   if (!updatedCollection) {
//     res.status(400).json({ Message: "Please provide a valid card." });
//   }
//   res.json(updatedCollection);
// };

//updates quantity for a given card
exports.updateCardQuantity = (req, res) => {
  const { userID, id } = req.params;
  const updatedCollection = collection.updateQuantity(
    userID,
    id,
    req.body.quantity
  );
  if (!updatedCollection) {
    res.status(400).json({ Message: "Please provide a valid card." });
  }
  res.json(updatedCollection);
};
