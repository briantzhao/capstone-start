const router = require("express").Router();
const axios = require("axios");
const {
  listCards,
  addCard,
  listSingleCard,
  deleteCard,
  updateCardQuantity,
} = require("../controllers/collectionsController");

router.get("/", listCards);
router.post("/", addCard);
router.get("/:id", listSingleCard);
router.delete("/:id", deleteCard);
router.patch("/:id", updateCardQuantity);

module.exports = router;
