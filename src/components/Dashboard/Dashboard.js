import React from "react";
import Navbar from "../Navbar";
import ProfileCard from "../Profile/Profile-component";
import PostBar from "../Post/Post";
import Feed from "../Feed/Feed";

const Dashboard = () => {
  const posts = [
    {
      title: "Post 1",
      author: "Author 1",
      content: "This is the content of post 1.",
    },
    {
      title: "Post 2",
      author: "Author 2",
      content: "This is the content of post 2.",
    },
    {
      title: "Post 3",
      author: "Author 3",
      content: "This is the content of post 3.",
    },
    {
      title: "Post 1",
      author: "Author 1",
      content: "This is the content of post 1.",
    },
    {
      title: "Post 2",
      author: "Author 2",
      content: "This is the content of post 2.",
    },
    {
      title: "Post 3",
      author: "Author 3",
      content: "This is the content of post 3.",
    },
  ];

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        width: "100%",
        height: "100%",
        overflow : "hidden"
      }}
    >
      <div className="row w-auto mt-2" style={{ flex: 1, overflow: "hidden" }}>
        <div className="d-none d-lg-flex container col-lg-3 justify-content-center h-50">
          <ProfileCard />
        </div>

        <div
          className="container col-lg-5 col-md-12 ml-4"
          style={{ flex: 1, overflow: "hidden", height: "100%" }}
        >
          <PostBar />
          <Feed posts={posts} />
        </div>
{/* 
        <div className="d-none d-lg-flex container col-lg-3 justify-content-center">
          <ProfileCard />
        </div> */}
      </div>
    </div>
  );
};

export default Dashboard;
