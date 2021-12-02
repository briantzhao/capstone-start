// const fs = require("fs"),
//   path = require("path"),
//   collFile = path.join(__dirname, "../data/collections.json"),
//   cardsFile = path.join(__dirname, "../data/default-cards-filtered.json");3
const fs = require("fs"),
  path = require("path"),
  collFile = path.join(__dirname, "../data/collections.json");

const getAll = () => {
  const data = fs.readFileSync(collFile);
  return JSON.parse(data);
};

// const getCards = () => {
//   const data = fs.readFileSync(cardsFile);
//   return JSON.parse(data);
// };

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

const add = (userID, card) => {
  const collArray = getAll();
  const userIndex = getIndex(userID, collArray);
  if (userIndex >= 0) {
    const newCardID = collArray[userIndex].collection.length + 1;
    const collCard = { ...card, id: newCardID };
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

const updateQuantity = (userID, cardID, newQuantity) => {
  console.log(userID, cardID);
  const collArray = getAll();
  const userIndex = getIndex(userID, collArray);
  if (userIndex >= 0) {
    const cardIndex = getIndex(cardID, collArray[userIndex].collection);
    if (cardIndex >= 0) {
      if (newQuantity === 0) {
        collArray[userIndex].collection.splice(cardIndex, 1);
      } else {
        collArray[userIndex].collection[cardIndex].quantity = newQuantity;
      }
      fs.writeFileSync(collFile, JSON.stringify(collArray));
      return collArray[userIndex].collection;
    }
  }
  return null;
};

module.exports = { getUserColl, add, updateQuantity, getById };
