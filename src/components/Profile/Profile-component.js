import React from "react";
import { FaEnvelope, FaLinkedin, FaTwitter, FaStar } from "react-icons/fa";
import profilePic from "../../assets/Interv.png"; // Assuming you have a placeholder image

const ProfileCard = () => {
  return (
    <div className="profile-card bg-white p-3 rounded shadow-lg h-50">
      {/* Profile Header */}
      <div className="d-flex align-items-center border-bottom pb-3 mb-3">
        <img
          src={profilePic}
          alt="profile"
          className="rounded-circle"
          style={{ width: "80px", height: "80px" }}
        />
        <div className="ml-3">
          <h4 className="font-weight-bold mb-0">John Doe</h4>
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
      <div className="d-flex justify-content-start mb-3 gap-3">
        <button className="btn btn-primary mr-2">
          <FaEnvelope className="mr-1" />
          Message
        </button>
        <a
          href="https://www.linkedin.com"
          target="_blank"
          rel="noreferrer"
          className="btn btn-outline-primary mr-2"
        >
          <FaLinkedin className="mr-1" />
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

      {/* Quick Stats */}
      <div className="quick-stats border-top pt-3">
        <div className="d-flex justify-content-between">
          <div className="stat-item">
            <h5>Reviews</h5>
            <p className="font-weight-bold">120</p>
          </div>
          <div className="stat-item">
            <h5>Followers</h5>
            <p className="font-weight-bold">540</p>
          </div>
          <div className="stat-item">
            <h5>Job Offers</h5>
            <p className="font-weight-bold">3</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileCard;
