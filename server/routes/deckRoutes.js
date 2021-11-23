const router = require("express").Router();

const { filter, price, getDeck } = require("../controllers/decksController");

router.get("/:cardName", filter);
router.get("/:deckID", price);
router.get("/:deckID", getDeck);

module.exports = router;
