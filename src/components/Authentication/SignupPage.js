// src/components/SignupPage.js
import axios from "axios";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const SignupPage = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    email: "",
    password1: "",
    name: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSave = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.post("http://13.60.208.123:8000/signup/", {
        email: formData.email,
        password: formData.password1,
        name: formData.name
      });
      console.log(res);
      console.log("Registered successfully");
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
      style={{ height: "100vh", width: "100vw", backgroundColor: "#343a40" }} // Dark background
    >
      <div
        className="bg-light p-4 rounded shadow"
        style={{ maxWidth: "400px", width: "100%", opacity: 0.95 }}
      >
        <h2 className="text-center text-info">Signup</h2>
        <form onSubmit={handleSave}> {/* Add onSubmit to form */}
  <div className="mb-3">
    <input
      type="text"
      className="form-control"
      name="name" // Add name attribute
      value={formData.name} // Bind value to state
      placeholder="Name"
      required
      onChange={handleChange}
    />
  </div>
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
      name="password1" // Add name attribute
      value={formData.password1} // Bind value to state
      placeholder="Password"
      onChange={handleChange}
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
            onClick={handleSave}
          >
            Login
          </span>
        </p>
      </div>
    </div>
  );
};

export default SignupPage;
