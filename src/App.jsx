import { useEffect, useState } from "react";

import "./App.css";

import {
  fetchSession,
  fetchLogin,
  fetchLogout,
  fetchPosts,
  fetchAddPost,
} from "./services";

import { LOGIN_STATUS, SERVER, CLIENT } from "./constants";

import Loading from "./Loading";
import LoginForm from "./LoginForm";
import Sidebar from "./Sidebar";
import AddPostForm from "./AddPostForm";
import PostList from "./PostList";

function App() {
  const [username, setUsername] = useState("");
  const [loginStatus, setLoginStatus] = useState(LOGIN_STATUS.PENDING);
  const [error, setError] = useState("");
  const [posts, setPosts] = useState({});

  useEffect(() => {
    checkSession();
  }, []);

  function checkSession() {
    fetchSession()
      .then((session) => {
        setUsername(session.username);
        setLoginStatus(LOGIN_STATUS.IS_LOGGED_IN);
        return fetchPosts();
      })
      .catch((err) => {
        if (err?.error === SERVER.AUTH_MISSING) {
          return Promise.reject({ error: CLIENT.NO_SESSION });
        }
        return Promise.reject(err);
      })
      .then((posts) => {
        setPosts(posts);
      })
      .catch((err) => {
        if (err?.error === CLIENT.NO_SESSION) {
          setLoginStatus(LOGIN_STATUS.NOT_LOGGED_IN);
          return;
        }
        setError(err?.error || "ERROR");
      });
  }

  function onLogin(username) {
    fetchLogin(username)
      .then((fetchedPosts) => {
        setError("");
        setPosts(fetchedPosts);
        setUsername(username);
        setLoginStatus(LOGIN_STATUS.IS_LOGGED_IN);
      })
      .catch((err) => {
        setError(err?.error || "ERROR");
      });
  }

  function onLogout() {
    setError("");
    setPosts({});
    setUsername("");
    setLoginStatus(LOGIN_STATUS.NOT_LOGGED_IN);

    fetchLogout().catch((err) => {
      setError(err?.error || "ERROR");
    });
  }

  function onAddPost(post) {
    fetchAddPost(post)
      .then((fetchedPosts) => {
        setError("");
        setPosts(fetchedPosts);
      })
      .catch((err) => {
        setError(err?.error || "ERROR");
      });
  }

  function pollPosts() {
    fetchPosts()
      .then((fetchedPosts) => {
        setPosts(fetchedPosts);
      })
      .catch((err) => {
        setError(err?.error || "ERROR");
      });
  }

  return (
    <div className="app">
      {loginStatus === LOGIN_STATUS.PENDING && (
        <Loading>
          <i className="spinner"> </i>
          <span> Loading... </span>
        </Loading>
      )}
      {loginStatus === LOGIN_STATUS.NOT_LOGGED_IN && (
        <LoginForm onLogin={onLogin} error={error} />
      )}
      {loginStatus === LOGIN_STATUS.IS_LOGGED_IN && (
        <div className="content-view">
          <Sidebar username={username} onLogout={onLogout} />
          <AddPostForm onAddPost={onAddPost} error={error} />
          <PostList posts={posts} pollPosts={pollPosts} />
        </div>
      )}
    </div>
  );
}

export default App;
