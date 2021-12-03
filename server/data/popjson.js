const axios = require("axios");
const fs = require("fs");

const API_URL =
  "https://archidekt.com/api/decks/cards/?orderBy=-createdAt&formats=3";

//archidekt's api will only allow you to query decks in bulk
//you have to grab deck ID's first through this query
//and then do an individual query for each deck ID to get the actual decklist
let urls = [];
for (let i = 0; i < 20; i++) {
  urls[i] = `${API_URL}&page=${i + 1}&pageSize=50`;
}
let fullDecks = [];
const next = () => {
  if (!urls.length) {
    console.log("about to write to file");
    fs.writeFile("./decks.json", JSON.stringify(fullDecks), (err) => {
      if (err) {
        console.log(err);
        return;
      }
      console.log("write success");
    });
    return;
  }
  let i = 1;
  const url = urls.pop();
  axios
    .get(url)
    .then(({ data }) => {
      console.log("successful call");
      const decks = data.results.map((deck) => {
        if (deck.private === false) {
          const newDeck = {
            deckName: deck.name,
            deckID: deck.id,
            deckColors: deck.colors,
          };
          console.log(newDeck);
          return newDeck;
        }
      });
      if (decks.length > 0) {
        while (decks.length > 0) {
          fullDecks.push(decks.pop());
        }
        console.log(fullDecks.length);
      }
      setTimeout(next, 100);
    })
    .catch((err) => {
      console.log(err);
      fs.writeFile("./decks.json", JSON.stringify(fullDecks), (err) => {
        if (err) {
          console.log(err);
          return;
        }
      });
    });
};
