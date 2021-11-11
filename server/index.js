require("dotenv").config();
const express = require("express");
const app = express();
const cors = require("cors");
const path = require("path");
const cardRoutes = require("./routes/cardRoutes");

const port = process.env.PORT || 8080;

app.use(cors());

app.use(express.static(path.join(__dirname, "public")));

app.use(express.json());

app.use("/cards", cardRoutes);

app.listen(port, function () {
  console.log(`Server running on port ${port}`);
});
