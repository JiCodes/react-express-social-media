const uuid = require('uuid').v4;

const sessions = {};

function createSession(username) {
  const sid = uuid();
  sessions[sid] = {
    username,
  };
  return sid;
}

function getUserBySession(sid) {
  return sessions[sid]?.username;
}

function deleteSession(sid) {
  delete sessions[sid];
}

module.exports = {
  createSession,
  deleteSession,
  getUserBySession,
};