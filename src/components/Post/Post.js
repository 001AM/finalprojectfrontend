import React, { useState } from "react";
import "./Post.css"; // Your custom styles

const PostBar = () => {
  const [postContent, setPostContent] = useState("");

  const handlePostChange = (event) => {
    setPostContent(event.target.value);
  };

  const handlePostSubmit = (event) => {
    event.preventDefault();
    // Handle post submission logic here (e.g., send to API)
    alert(`Post Submitted: ${postContent}`);
    setPostContent(""); // Clear the input after submission
  };

  return (
    <div className="post-bar w-4/5 shadow-lg bg-white" style={{'min-width':'95%'}}>
      <div className="post-input">
        <img
          src="https://via.placeholder.com/40"
          alt="profile"
          className="profile-img"
        />
        <textarea
          value={postContent}
          onChange={handlePostChange}
          placeholder="Start a post..."
          className="post-textarea"
        />
      </div>
      <div className="post-options d-flex flex-row-reverse">
        <button
          type="submit"
          onClick={handlePostSubmit}
          className="post-submit"
        >
          Post
        </button>
      </div>
    </div>
  );
};

export default PostBar;
