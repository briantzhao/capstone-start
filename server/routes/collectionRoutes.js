const router = require("express").Router();
const {
  listCards,
  addCard,
  listSingleCard,
  updateCardQuantity,
} = require("../controllers/collectionsController");
router.get("/:userID", listCards);
router.get("/:userID/:id", listSingleCard);
router.post("/:userID", addCard);
router.patch("/:userID/:id", updateCardQuantity);

module.exports = router;
