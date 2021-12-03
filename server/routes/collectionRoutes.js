const router = require("express").Router();
const {
  listCards,
  addCard,
  listSingleCard,
  updateCardQuantity,
} = require("../controllers/collectionsController");

//get user's collection data
router.get("/:userID", listCards);

//get specific card from user's collection based on UID
router.get("/:userID/:id", listSingleCard);

//add new card to user's collection
router.post("/:userID", addCard);

//edit card from user's collection
router.patch("/:userID/:id", updateCardQuantity);

module.exports = router;
