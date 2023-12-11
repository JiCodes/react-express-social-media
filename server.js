const express = require("express");
const cookieParser = require("cookie-parser");
const app = express();
const PORT = process.env.PORT || 3000;

const sessions = require("./sessions");
const users = require("./users");
const posts = require("./posts");

app.use(express.static("./dist"));
app.use(cookieParser());
app.use(express.json());

app.listen(PORT, () => {
  console.log(`Server listening on port: ${PORT}`);
});

// Sessions
app.get("/api/v1/session", (req, res) => {
  const sid = req.cookies.sid;
  const username = sid ? sessions.getUserBySession(sid) : "";
  if (!sid || !users.isValid(username)) {
    res.status(401).json({ error: "auth-missing" });
    return;
  }
  res.json({ username });
});

app.post("/api/v1/session", (req, res) => {
  const { username } = req.body;

  if (users.isEmpty(username)) {
    res.status(400).json({ error: "username-required" });
    return;
  }

  if (!users.isValid(username)) {
    res.status(400).json({ error: "username-invalid" });
    return;
  }

  if (username === "dog") {
    res.status(403).json({ error: "auth-insufficient" });
    return;
  }

  const sid = sessions.createSession(username);
  const fetchedPosts = posts.getPosts();

  res.cookie("sid", sid);
  res.json(fetchedPosts);
});

app.delete("/api/v1/session", (req, res) => {
  const sid = req.cookies.sid;
  const username = sid ? sessions.getUserBySession(sid) : "";

  if (sid) {
    res.clearCookie("sid");
  }

  if (username) {
    sessions.deleteSession(sid);
  }

  res.json({ username });
});

// Posts
app.get("/api/v1/posts", (req, res) => {
  const sid = req.cookies.sid;
  const username = sid ? sessions.getUserBySession(sid) : "";
  if (!sid || !users.isValid(username)) {
    res.status(401).json({ error: "auth-missing" });
    return;
  }
  res.json(posts.getPosts());
});

app.post("/api/v1/posts", (req, res) => {
  const sid = req.cookies.sid;
  const username = sid ? sessions.getUserBySession(sid) : "";
  if (!sid || !users.isValid(username)) {
    res.status(401).json({ error: "auth-missing" });
    return;
  }

  let { post } = req.body;
  if (!post) {
    res.status(400).json({ error: "content-required" });
    return;
  }

  posts.addPost(username, post);
  res.json(posts.getPosts());
});
