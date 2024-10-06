import React from "react";
import { FaEnvelope, FaLinkedin, FaTwitter, FaStar } from "react-icons/fa";
import profilePic from "../../assets/Interv.png"; // Assuming you have a placeholder image
import Navbar from "../Navbar";

const Profile = () => {
  return (
    <div
      className=""
      style={{ display: "flex flex-column", width: "100vw", height: "100vh" }}
    >
      <Navbar />
      <div
        className="bg-white p-4 rounded shadow-lg"
        style={{ height: "90vh" }}
      >
        {/* Profile Header */}
        <div className="d-flex align-items-center border-bottom pb-3 mb-3">
          <img
            src={profilePic}
            alt="profile"
            className="rounded-circle"
            style={{ width: "100px", height: "100px" }}
          />
          <div className="ml-3">
            <h2 className="font-weight-bold mb-0">John Doe</h2>
            <p className="text-muted mb-1">Software Engineer at XYZ Corp</p>
            <div className="d-flex align-items-center">
              <span className="text-warning mr-1">
                <FaStar />
              </span>
              <span>4.5</span>
              <span className="text-muted ml-2">(120 reviews)</span>
            </div>
          </div>
        </div>

        {/* Contact and Social Media */}
        <div className="d-flex justify-content-start mb-3 gap-2">
          <button className="btn btn-primary mr-2">
            <FaEnvelope className="mr-3" />
            Message
          </button>
          <a
            href="https://www.linkedin.com"
            target="_blank"
            rel="noreferrer"
            className="btn btn-outline-primary mr-2"
          >
            <FaLinkedin className="mr-3" />
            LinkedIn
          </a>
          <a
            href="https://www.twitter.com"
            target="_blank"
            rel="noreferrer"
            className="btn btn-outline-primary"
          >
            <FaTwitter className="mr-1" />
            Twitter
          </a>
        </div>

        {/* Bio Section */}
        <div className="mb-4">
          <h4 className="font-weight-bold">About</h4>
          <p className="text-muted">
            Experienced software engineer with a passion for developing
            innovative programs that expedite the efficiency and effectiveness
            of organizational success. Well-versed in technology and writing
            code to create systems that are reliable and user-friendly.
          </p>
        </div>

        {/* Tabs (Overview, Reviews, Salaries, Interviews) */}
        <div className="border-bottom mb-4">
          <ul className="nav nav-tabs">
            <li className="nav-item">
              <a href="#overview" className="nav-link active">
                Overview
              </a>
            </li>
            <li className="nav-item">
              <a href="#reviews" className="nav-link">
                Reviews
              </a>
            </li>
            <li className="nav-item">
              <a href="#salaries" className="nav-link">
                Salaries
              </a>
            </li>
            <li className="nav-item">
              <a href="#interviews" className="nav-link">
                Interviews
              </a>
            </li>
          </ul>
        </div>

        {/* Overview Tab Content */}
        <div id="overview">
          <h4 className="font-weight-bold mb-3">Overview</h4>
          <div className="row">
            <div className="col-md-6">
              <h5>Position</h5>
              <p>Software Engineer</p>
            </div>
            <div className="col-md-6">
              <h5>Company</h5>
              <p>XYZ Corp</p>
            </div>
            <div className="col-md-6">
              <h5>Location</h5>
              <p>San Francisco, CA</p>
            </div>
            <div className="col-md-6">
              <h5>Experience</h5>
              <p>5 years</p>
            </div>
          </div>
        </div>

        {/* Reviews Tab Content (Placeholder) */}
        <div id="reviews" style={{ display: "none" }}>
          <h4 className="font-weight-bold mb-3">Reviews</h4>
          <p>No reviews yet.</p>
        </div>

        {/* Salaries Tab Content (Placeholder) */}
        <div id="salaries" style={{ display: "none" }}>
          <h4 className="font-weight-bold mb-3">Salaries</h4>
          <p>No salary data yet.</p>
        </div>

        {/* Interviews Tab Content (Placeholder) */}
        <div id="interviews" style={{ display: "none" }}>
          <h4 className="font-weight-bold mb-3">Interviews</h4>
          <p>No interview data yet.</p>
        </div>
      </div>
    </div>
  );
};

export default Profile;
