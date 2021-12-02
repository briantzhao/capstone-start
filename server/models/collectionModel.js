// const fs = require("fs"),
//   path = require("path"),
//   collFile = path.join(__dirname, "../data/collections.json"),
//   cardsFile = path.join(__dirname, "../data/default-cards-filtered.json");3
const fs = require("fs"),
  path = require("path"),
  collFile = path.join(__dirname, "../data/collections.json"),
  cardsFile = path.join(__dirname, "../data/default-cards-filtered.json"),
  nonUP = [
    "a",
    "an",
    "the",
    "for",
    "and",
    "nor",
    "or",
    "but",
    "so",
    "at",
    "by",
    "of",
    "on",
    "to",
  ];

const getAll = () => {
  const data = fs.readFileSync(collFile);
  return JSON.parse(data);
};

const getCards = () => {
  const data = fs.readFileSync(cardsFile);
  return JSON.parse(data);
};

const getUser = (id, arr) => {
  const userEl = arr.find((user) => {
    return user.id === Number(id);
  });
  return userEl;
};

const getIndex = (id, arr) => {
  const singleEl = arr.findIndex((el) => el.id === Number(id));
  return singleEl;
};

const getUserColl = (userID) => {
  const collArray = getAll();
  const userData = getUser(userID, collArray);
  if (!userData.collection) {
    return null;
  }
  return userData.collection;
};

const findPrice = (uid, foil) => {
  const cardsArray = getCards();
  const cardPrices = cardsArray.find((card) => {
    if (card !== null) {
      return card.id === uid;
    }
  }).prices;
  if (foil === "foil") {
    return cardPrices.usdFoil;
  } else {
    return cardPrices.usd;
  }
};

const add = (userID, card) => {
  const collArray = getAll();
  const cardsArray = getCards();
  const userIndex = getIndex(userID, collArray);
  if (userIndex >= 0) {
    const newCardID = collArray[userIndex].collection.length + 1;
    const collCard = { ...card, id: newCardID };
    let cardName = collCard.name.split(" ");
    collCard.name = cardName
      .map((word) => {
        if (nonUP.find((el) => el === word)) {
          return word;
        }
        const fixedName =
          word.slice(0, 1).toUpperCase() +
          word.slice(1, word.length).toLowerCase();
        return fixedName;
      })
      .join(" ");
    const cardPrices = cardsArray.find((card) => {
      if (card !== null) {
        return card.id === collCard.uid;
      }
    }).prices;
    if (collCard.foil === "foil") {
      collCard.price = cardPrices.usdFoil;
    } else {
      collCard.price = cardPrices.usd;
    }
    collArray[userIndex].collection.push(collCard);
    fs.writeFileSync(collFile, JSON.stringify(collArray));
    return collArray[userIndex].collection;
  }
  return null;
};

const getById = (userID, cardID) => {
  const collArray = getAll();
  const userData = getUser(userID, collArray);
  if (!userData.collection) {
    return null;
  }
  const card = userData.collection.find((card) => {
    if (card !== null) {
      return card.uid === cardID;
    }
  });
  return card;
};

// const remove = (cardID) => {
//     const collArray = getAll();
//     const userIndex = getIndex(userID, collArray);
//     if (userIndex >= 0) {
//         const cardIndex = getIndex(cardID, collArray[userIndex].collection)
//         collArray[userIndex].collection.splice(cardIndex, 1)
//         fs.writeFileSync(collFile, JSON.stringify(collArray))
//         return collArray[userIndex].collection;
//     }
//     return null;
// }

const updateQuantity = (userID, cardID, newInfo) => {
  const { quantity, setID, set, foil, uid } = newInfo;
  const collArray = getAll();
  const userIndex = getIndex(userID, collArray);
  if (userIndex >= 0) {
    const cardIndex = getIndex(cardID, collArray[userIndex].collection);
    if (cardIndex >= 0) {
      if (quantity === 0) {
        collArray[userIndex].collection.splice(cardIndex, 1);
      } else {
        collArray[userIndex].collection[cardIndex].quantity = quantity;
        collArray[userIndex].collection[cardIndex].setID = setID;
        collArray[userIndex].collection[cardIndex].set = set;
        collArray[userIndex].collection[cardIndex].foil = foil;
        collArray[userIndex].collection[cardIndex].uid = uid;
        collArray[userIndex].collection[cardIndex].price = findPrice(uid, foil);
      }
      fs.writeFileSync(collFile, JSON.stringify(collArray));
      return collArray[userIndex].collection;
    }
  }
  return null;
};

module.exports = { getUserColl, add, updateQuantity, getById };
