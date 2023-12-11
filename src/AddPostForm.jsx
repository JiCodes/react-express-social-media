import { useState } from "react";

import { MESSAGES } from "./constants";

import "./AddPostForm.css";

function AddPostForm({ onAddPost, error }) {
  const [post, setPost] = useState("");
  const errorMessage = MESSAGES[error] || MESSAGES.default;

  function onSubmit(event) {
    event.preventDefault();
    onAddPost(post);
    setPost("");
  }

  return (
    <div className="input-bar">
      <form action="#/post" className="input-form" onSubmit={onSubmit}>
        <textarea
          rows="2"
          cols="30"
          value={post}
          placeholder="What's happening?!"
          className="input-field"
          onChange={(e) => setPost(e.target.value)}
        ></textarea>
        <button type="submit" className="input-button">
          Post
        </button>
        {error && <p className="input-error-message">{errorMessage}</p>}
      </form>
    </div>
  );
}

export default AddPostForm;
