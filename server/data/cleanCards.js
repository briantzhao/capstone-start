const fs = require("fs");

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
      if (card.set_type !== "memorabilia") {
        let newCard = {
          id: card.id,
          oracleID: card.oracle_id,
          tcgplayerID: card.tcgplayer_id,
          name: card.name,
          scryfall: card.scryfall_uri,
          layout: card.layout,
          // imageURIs: {
          //     small: card.image_uris.small,
          //     normal: card.image_uris.normal
          // },

          // manaCost: card.mana_cost,
          cmc: card.cmc,
          // typeLine: card.type_line,
          // oracleText: card.oracleText,
          // colors: card.colors,
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
        if (card.card_faces) {
          for (let i = 0; i < 2; i++) {
            cardFaces[i] = {
              name: card.card_faces[i].name,
              manaCost: card.card_faces[i].mana_cost,
              typeLine: card.card_faces[i].type_line,
              oracleText: card.card_faces[i].oracle_text,
              colors: card.card_faces[i].colors,
            };
            if (card.card_faces[i].power) {
              cardFaces[i].power = card.card_faces[i].power;
              cardFaces[i].toughness = card.card_faces[i].toughness;
            }
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
