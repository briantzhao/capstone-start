const fs = require("fs"),
  path = require("path"),
  userFile = path.join(__dirname, "../data/users.json"),
  collFile = path.join(__dirname, "../data/collections.json");

//returns all users data
const getAll = () => {
  const data = fs.readFileSync(userFile);
  return JSON.parse(data);
};

//returns all collection data
const getColl = () => {
  const data = fs.readFileSync(collFile);
  return JSON.parse(data);
};

//returns specific user by email
//helper function that's also used to check if a user already exists
const getOne = (email) => {
  const userArray = getAll();
  const foundUser = userArray.find((user) => user.email === email);
  return foundUser;
};

//creates new user
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
  //creates new collection object in collection data
  const collArray = getColl();
  const fullName = `${newUser.firstName} ${newUser.lastName}`;
  const newColl = { id: userID, name: fullName, collection: [] };
  collArray.push(newColl);
  fs.writeFileSync(collFile, JSON.stringify(collArray));
  return newUser;
};

//returns specific user by email
const findOne = (email) => {
  return getOne(email);
};

module.exports = { create, findOne };
