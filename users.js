const users = {};

function isEmpty(username) {
  return !username || !username.trim();
}

function isValid(username) {
  let isValid = true;
  isValid = !!username && username.trim();
  isValid = isValid && username.match(/^[A-Za-z0-9]{1,16}$/);
  return isValid;
}

function getUserData(username) {
  return users[username];
}

function addUserData(username, userData) {
  users[username] = userData;
}

module.exports = {
  isEmpty,
  isValid,
  getUserData,
  addUserData,
};
