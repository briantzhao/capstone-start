const router = require("express").Router();
const { filter, price, searchById } = require("../controllers/cardsController");

router.get("/:cardName", filter);
router.get("/price/:cardID/:foil", price);
router.get("/id/:cardID", searchById);

module.exports = router;
