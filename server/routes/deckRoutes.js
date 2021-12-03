const router = require("express").Router();

const { filter, price, getDeck } = require("../controllers/decksController");

//return all decks that feature specific card
//searches by card name
router.get("/card/:cardName", filter);

//return price of single deck based on deck ID
router.get("/price/:deckID", price);

//return deck information of single deck based on deck ID
router.get("/:deckID", getDeck);

module.exports = router;
