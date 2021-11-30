const router = require("express").Router();

const { filter, price, getDeck } = require("../controllers/decksController");

router.get("/card/:cardName", filter);
router.get("/price/:deckID", price);
router.get("/:deckID", getDeck);

module.exports = router;
