const router = require("express").Router();
const { filter, price } = require("../controllers/cardsController");

router.get("/:cardName", filter);
router.get("/price/:cardID/:foil", price);

module.exports = router;
