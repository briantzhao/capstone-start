const fs = require("fs"),
  path = require("path"),
  userFile = path.join(__dirname, "../data/users.json"),
  collFile = path.join(__dirname, "../data/collections.json");

const getAll = () => {
  const data = fs.readFileSync(userFile);
  return JSON.parse(data);
};

const getColl = () => {
  const data = fs.readFileSync(collFile);
  return JSON.parse(data);
};

const getOne = (email) => {
  const userArray = getAll();
  const foundUser = userArray.find((user) => user.email === email);
  return foundUser;
};

const create = (userObj) => {
  const userArray = getAll();
  const check = getOne(userObj.email);
  if (check) {
    return -1;
  }
  const userID = userArray.length + 1;
  const newUser = { ...userObj, id: userID };
  userArray.push(newUser);
  fs.writeFileSync(userFile, JSON.stringify(userArray));
  const collArray = getColl();
  const fullName = `${newUser.firstName} ${newUser.lastName}`;
  const newColl = { id: userID, name: fullName, collection: [] };
  collArray.push(newColl);
  fs.writeFileSync(collFile, JSON.stringify(collArray));
  return newUser;
};

const findOne = (email) => {
  return getOne(email);
};

module.exports = { create, findOne };
