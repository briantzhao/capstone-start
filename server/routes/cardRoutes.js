const router = require("express").Router();
const { filter, price, searchById } = require("../controllers/cardsController");

//get all possible versions of a card
router.get("/:cardName", filter);

//get price of a specific card
//returns foil or nonfoil price
router.get("/price/:cardID/:foil", price);

//get specific card by UID
router.get("/id/:cardID", searchById);

module.exports = router;
