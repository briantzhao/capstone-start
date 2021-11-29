const axios = require("axios");
const fs = require("fs");

const API_URL =
  "https://archidekt.com/api/decks/cards/?orderBy=-createdAt&formats=3";

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

// for (let i = 1; i <= 15812; i++) {
//   console.log("call number: ", i);
//   //   setTimeout(() => {
//   axios
//     .get(`${API_URL}&page=${i}&pageSize=50`)
//     .then(({ data }) => {
//       console.log("successful call");
//       const decks = data.results.map((deck) => {
//         if (deck.private === false) {
//           const newDeck = {
//             deckName: deck.name,
//             deckID: deck.id,
//             deckColors: deck.colors,
//           };
//           console.log(newDeck);
//           return newDeck;
//         }
//       });
//       if (decks.length > 0) {
//         fs.appendFile("decks.json", JSON.stringify(decks), (err) => {
//           if (err) {
//             console.log(err);
//             return;
//           }
//           console.log("file written for: ", i);
//         });
//       }
//     })
//     .catch((err) => {
//       console.log(err);
//     });
//   //   }, 1000);
// }

// let next = `${API_URL}decks/cards/?formats=3&pageSize=50`;

// function download() {
//   axios
//     .get(next)
//     .then(({ data }) => {
//       console.log("start download: ", next);
//       const decks = data.results.map((deck) => {
//         if (deck.private === false) {
//           const newDeck = {
//             deckName: deck.name,
//             deckID: deck.id,
//             deckColors: deck.colors,
//           };
//           console.log(newDeck);
//           return newDeck;
//         }
//       });
//       fs.appendFile("decks.json", JSON.stringify(decks), (err) => {
//         if (err) {
//           console.log(err);
//           return;
//         }
//         console.log("file written");
//       });
//       next = data.next;
//     })
//     .catch((err) => {
//       console.log(err);
//     });

//   if (next !== null) {
//     download();
//   }
// }
// download();
