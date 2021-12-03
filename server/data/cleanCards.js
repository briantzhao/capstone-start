const fs = require("fs");

//removes most data from Scryfall json, leaves only data that may be relevant to future expansions of the project
let modCards = [];
const getCards = () => {
  fs.readFile("./default-cards.json", (err, data) => {
    if (err) {
      console.log(err);
      return;
    }
    console.log("cards read");
    modCards = JSON.parse(data).map((card) => {
      console.log(card.name);
      //excludes cards that are unplayable (memorabilia)
      if (card.set_type !== "memorabilia") {
        let newCard = {
          id: card.id,
          oracleID: card.oracle_id,
          tcgplayerID: card.tcgplayer_id,
          name: card.name,
          scryfall: card.scryfall_uri,
          layout: card.layout,
          cmc: card.cmc,
          colorIdentity: card.color_identity,
          keywords: card.keywords,
          setID: card.set_id,
          set: card.set,
          setName: card.set_name,
          setURI: card.scryfall_set_uri,
          rarity: card.rarity,
          flavorText: card.flavor_text,
          prices: {
            usd: card.prices.usd,
            usdFoil: card.prices.usd_foil,
          },
          edhrec: card.related_uris.edhrec,
        };
        let cardFaces = [];
        //checks if card has card faces (aka a double-faced card)
        //if so, add data for each card face to cardFaces array
        if (card.card_faces) {
          for (let i = 0; i < 2; i++) {
            cardFaces[i] = {
              name: card.card_faces[i].name,
              manaCost: card.card_faces[i].mana_cost,
              typeLine: card.card_faces[i].type_line,
              oracleText: card.card_faces[i].oracle_text,
              colors: card.card_faces[i].colors,
            };
            //checks if card has power/toughness (aka is a creature)
            //if not included, this will jam up the process if the function encounters a non-creature card
            if (card.card_faces[i].power) {
              cardFaces[i].power = card.card_faces[i].power;
              cardFaces[i].toughness = card.card_faces[i].toughness;
            }
            //also, data is inconsistent in terms of where image uris are stored in the object
            if (card.card_faces[i].image_uris) {
              cardFaces[i].imageURIs = {
                small: card.card_faces[i].image_uris.small,
                normal: card.card_faces[i].image_uris.normal,
              };
            } else {
              cardFaces[i].imageURIs = {
                small: card.image_uris.small,
                normal: card.image_uris.normal,
              };
            }
          }
        } else {
          //if the card only has one face, then record data normally stored in card faces
          //into new cardface field, so our data is consistent
          cardFaces[0] = {
            name: card.name,
            manaCost: card.mana_cost,
            typeLine: card.type_line,
            oracleText: card.oracle_text,
            colors: card.colors,
            imageURIs: {
              small: card.image_uris.small,
              normal: card.image_uris.normal,
            },
          };
          if (card.power) {
            cardFaces[0].power = card.power;
            cardFaces[0].toughness = card.toughness;
          }
        }
        newCard.cardFaces = cardFaces;

        return newCard;
      }
    });
    fs.writeFile(
      "./default-cards-filtered.json",
      JSON.stringify(modCards),
      (err) => {
        if (err) {
          console.log(err);
          return;
        }
        console.log("file write success");
      }
    );
  });
};
getCards();
