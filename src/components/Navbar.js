import React, { useState } from "react";
import { Link } from "react-router-dom";
import { FaUser, FaHome, FaEnvelope, FaBell, FaBars } from "react-icons/fa";
import Logo from "../assets/Interv(1).png";
import "./Sidebar.css"; // Add a separate CSS file for custom styling

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [currentPage, setcurrentPage] = useState("Community");
  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };
  console.log(currentPage);

  return (
    <div className="" style={{ width: "100vw", height: "10vh" }}>
      {/* Mobile/Tablet View: Hamburger Icon */}
      <div className="mobile-navbar border-bottom">
        <img src={Logo} alt="logo" className="mobile-logo" />
        <FaBars
          className="menu-icon"
          style={{ color: "black" }}
          onClick={toggleSidebar}
        />
      </div>

      {/* Sidebar */}
      <div
        className={`sidebar ${isOpen ? "sidebar-open" : ""} border-bottom p-2`}
      >
        <div className="sidebar-header">
          <FaBars className="close-icon" onClick={toggleSidebar} />
        </div>
        <ul className="sidebar-links">
          <li>
            <Link to="/mock-interview">MockInterview</Link>
          </li>
        </ul>
      </div>

      {/* Desktop Navbar */}
      <div className="desktop-navbar">
        <div className="row border-bottom d-flex align-items-center p-1">
          <div className="col-sm d-flex justify-content-center">
            <img
              src={Logo}
              alt="logo"
              style={{ height: "75px", width: "145px" }}
            />
          </div>
          <div className="col-sm container ">
            <div className="row d-flex justify-content-center">
            <Link
                to="/interview"
                style={{ color: "inherit", textDecoration: "none" }}
                className={` ${currentPage === "Interview" ? "border-bottom" : ""} cursor-pointer col-sm h5 d-flex justify-content-center`}
                onClick={() => {
                  setcurrentPage("Interview");
                }}
              >
                Interview
              </Link>
              <Link
                to="/mock-interview"
                style={{ color: "inherit", textDecoration: "none" }}
                className={` ${currentPage === "MockInterview" ? "border-bottom" : ""} cursor-pointer col-sm h5 d-flex justify-content-center`}
                onClick={() => {
                  setcurrentPage("MockInterview");
                }}
              >
                MockInterview
              </Link>
              <Link
                to="/profile"
                style={{ color: "inherit", textDecoration: "none" }}
                className={` ${currentPage === "Profile" ? "border-bottom" : ""} cursor-pointer col-sm h5 d-flex justify-content-center`}
                onClick={() => {
                  setcurrentPage("Profile");
                }}
              >
                Profile
              </Link>
            </div>
          </div>
          <div className="col-sm">
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
