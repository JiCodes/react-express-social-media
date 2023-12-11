import { useEffect } from "react";

import "./PostList.css";

function PostList({ posts, pollPosts }) {
  useEffect(() => {
    const intervalId = setInterval(pollPosts, 5000);
    return () => clearInterval(intervalId);
  }, []);

  return (
    <ol className="post-list">
      {Object.keys(posts).length === 0 ? (
        <p className="post-empty">No post yet...</p>
      ) : (
        Object.values(posts)
          .reverse()
          .map((post) => (
            <li key={post.id} className="post-item">
              <i className="user-icon post-avator"></i>
              <div className="post-info">
                <span className="post-poster">{post.poster}</span>
                <p className="post-text"> {post.text} </p>
              </div>
            </li>
          ))
      )}
    </ol>
  );
}

export default PostList;
