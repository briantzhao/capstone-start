const router = require("express").Router();
const {
  listCards,
  addCard,
  // listSingleCard,
  // deleteCard,
  updateCardQuantity,
} = require("../controllers/collectionsController");

router.get("/:userID", listCards);
router.post("/:userID", addCard);
router.patch("/:userID/:id", updateCardQuantity);

module.exports = router;
