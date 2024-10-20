// src/components/LoginPage.js
import axios from "axios";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const LoginPage = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const postData = new FormData();
    postData.append("email", formData.email);
    postData.append("password", formData.password);

    try {
      console.log(postData);
      const res = await axios.post(`http://192.168.0.107:8000/login/`, postData);
      localStorage.setItem("access_token", res.data.access);
      localStorage.setItem("refresh_token", res.data.refresh);
      navigate("/");
    } catch (error) {
      console.error("Error:", error);
    }
  };


  return (
    <div
      className="d-flex align-items-center justify-content-center"
      style={{width:'221vh', height:'100vh', backgroundColor: "#343a40" }} // Dark background
    >
      <div
        className="bg-light p-4 rounded shadow"
        style={{ maxWidth: "400px", width: "100%", opacity: 0.95 }}
      >
        <h2 className="text-center text-info">Login</h2>
        <form onSubmit={handleSubmit}> {/* Add onSubmit to form */}
  <div className="mb-3">
    <input
      type="email"
      className="form-control"
      name="email" // Add name attribute
      value={formData.email} // Bind value to state
      placeholder="Email"
      onChange={handleChange}
      required
    />
  </div>
  <div className="mb-3">
    <input
      type="password"
      className="form-control"
      name="password" // Add name attribute
      value={formData.password} // Bind value to state
      placeholder="Password"
      onChange={handleChange}
      required
    />
  </div>
  <button type="submit" className="btn btn-info w-100">
    Login
  </button>
</form>
    
        <p className="mt-3 text-center">
          Don't have an account?{" "}
          <span
            className="text-info"
            style={{ cursor: "pointer" }}
            onClick={handleSubmit}
          >
            Sign up
          </span>
        </p>
      </div>
    </div>
  );
};

export default LoginPage;
