// src/components/HomePage.jsx
import React from "react";
import { Link } from "react-router-dom";

const HomePage = () => {
  return (
    <div style={{ textAlign: "center", padding: "50px" }}>
      <h1>Welcome to Stark AI</h1>
      <Link to="/interview">
        <button
          style={{
            padding: "10px 20px",
            backgroundColor: "#00e5ff",
            border: "none",
            borderRadius: "5px",
            color: "#ffffff",
            fontSize: "16px",
            cursor: "pointer",
          }}
        >
          Start Interview
        </button>
      </Link>
    </div>
  );
};

export default HomePage;
// AIzaSyCU6yeBVmulpE991ouvPnB3N-szIVaykOo
