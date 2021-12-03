require("dotenv").config();
const express = require("express");
const app = express();
const cors = require("cors");
const path = require("path");
const cardRoutes = require("./routes/cardRoutes");
const deckRoutes = require("./routes/deckRoutes");
const collectionRoutes = require("./routes/collectionRoutes");
const userRoutes = require("./routes/userRoutes");

//use port 8080
const port = process.env.PORT || 8000;

app.use(cors());

app.use(express.static(path.join(__dirname, "public")));

app.use(express.json());

app.use("/cards", cardRoutes);

app.use("/decks", deckRoutes);

app.use("/collections", collectionRoutes);

app.use("/users", userRoutes);

app.listen(port, function () {
  console.log(`Server running on port ${port}`);
});
