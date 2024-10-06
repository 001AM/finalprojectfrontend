// src/components/SignupPage.js
import React from "react";
import { useNavigate } from "react-router-dom";

const SignupPage = () => {
  const navigate = useNavigate();

  const handleSignup = (e) => {
    e.preventDefault();
    // Handle signup logic here
    console.log("User signed up");
    navigate("/login");
  };

  return (
    <div
      className="d-flex align-items-center justify-content-center"
      style={{ height: "100vh", width: "100vw", backgroundColor: "#343a40" }} // Dark background
    >
      <div
        className="bg-light p-4 rounded shadow"
        style={{ maxWidth: "400px", width: "100%", opacity: 0.95 }}
      >
        <h2 className="text-center text-info">Signup</h2>
        <form onSubmit={handleSignup}>
          <div className="mb-3">
            <input
              type="text"
              className="form-control"
              placeholder="Name"
              required
            />
          </div>
          <div className="mb-3">
            <input
              type="email"
              className="form-control"
              placeholder="Email"
              required
            />
          </div>
          <div className="mb-3">
            <input
              type="password"
              className="form-control"
              placeholder="Password"
              required
            />
          </div>
          <button type="submit" className="btn btn-info w-100">
            Signup
          </button>
        </form>
        <p className="mt-3 text-center">
          Already have an account?{" "}
          <span
            className="text-info"
            style={{ cursor: "pointer" }}
            onClick={() => navigate("/login")}
          >
            Login
          </span>
        </p>
      </div>
    </div>
  );
};

export default SignupPage;
