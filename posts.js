const uuid = require("uuid").v4;

const posts = {};

function addPost(poster, text) {
  const id = uuid();

  const sanitizedText = sanitize(text);

  posts[id] = {
    id,
    poster,
    text: sanitizedText,
  };

  return id;
}

function getPosts() {
  return posts;
}

function sanitize(post) {
  post = post
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");

  return post;
}

module.exports = {
  addPost,
  getPosts,
};
