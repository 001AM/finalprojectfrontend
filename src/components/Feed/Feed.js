import React from "react";

const Feed = ({ posts }) => {
  return (
    <div
      className=""
      style={{
        flex: 1, // Take up remaining space
        display: "flex",
        flexDirection: "column",
        height: "90%",
        width:"95%",
        marginLeft:"2.1rem"
      }}
    >
      <div
        className="feed-container"
        style={{
          flex: 1, // Fill remaining vertical space
          overflowY: "auto", // Enable vertical scrolling when content overflows
        }}
      >
        {posts.map((post, index) => (
          <div
            key={index}
            className="card mb-4 border bg-white rounded shadow-lg"
          >
            <div className="card-body">
              <h5 className="card-title">{post.title}</h5>
              <h6 className="card-subtitle mb-2 text-muted">{post.author}</h6>
              <p className="card-text">{post.content}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Feed;
