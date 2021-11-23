const router = require("express").Router();
const axios = require("axios");
const { filter, price } = require("../controllers/cardsController");

router.get("/:cardName", filter);
router.get("/price/:cardName", price);

module.exports = router;
