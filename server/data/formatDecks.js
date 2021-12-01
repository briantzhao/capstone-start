const fs = require("fs");

let decks = [];
let cards = [];
let modDecks = [];
const getDecks = () => {
  fs.readFile("./decklistsraw.json", (err, data) => {
    if (err) {
      console.log(err);
      return;
    }
    console.log("decks read");
    decks = JSON.parse(data);
    fs.readFile("./default-cards-filtered.json", (err, cardData) => {
      if (err) {
        console.log(err);
        return;
      }
      console.log("cards read");
      cards = JSON.parse(cardData);
      modDecks = decks.map((deck) => {
        console.log("deck name: ", deck.name);
        let newDeck = {
          id: deck.id,
          name: deck.name,
        };
        const newList = deck.list.map((card) => {
          const newCard = {
            id: card.id,
            uid: card.uid,
            colors: card.colors,
            colorIdentity: card.colorIdentity,
            types: card.types,
            subTypes: card.subTypes,
            superTypes: card.superTypes,
            name: card.name,
            manaCost: card.manaCost,
            cmc: card.cmc,
            text: card.text,
            layout: card.layout,
            faces: card.faces,
            quantity: card.quantity,
            categories: card.categories,
          };
          console.log(card.name);
          const singleCard = cards.find((cardEl) => {
            if (cardEl !== null) {
              return cardEl.id === newCard.uid;
            }
          });
          newCard.price = singleCard.prices.usd;
          newCard.set = singleCard.set;
          return newCard;
        });
        newDeck.list = newList;
        return newDeck;
      });
      fs.writeFile("./decklists.json", JSON.stringify(modDecks), (err) => {
        if (err) {
          console.log(err);
          return;
        }
        console.log("file write success");
      });
    });
  });
};

getDecks();
