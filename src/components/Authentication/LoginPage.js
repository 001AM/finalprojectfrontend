// src/components/LoginPage.js
import React from "react";
import { useNavigate } from "react-router-dom";

const LoginPage = () => {
  const navigate = useNavigate();

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
      setLogin(true)
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
        <h2 className="text-center text-info">Login</h2>
        <form onSubmit={handleLogin}>
          <div className="mb-3">
            <input
              type="email"
              className="form-control"
              placeholder="Email"
              onChange={handleChange}
              required
            />
          </div>
          <div className="mb-3">
            <input
              type="password"
              className="form-control"
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
