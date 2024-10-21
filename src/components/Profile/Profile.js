import React from 'react';
import './Profile.css'; // Create a separate CSS file for styles

export default function ProfilePage() {
  return (
    <section className="profile-section">
      <div className="container">
        <div className="breadcrumb">
          <a href="#">Home</a> &gt; <a href="#">User</a> &gt; <span>User Profile</span>
        </div>

        <div className="profile-content">
          <div className="profile-card">
            <div className="profile-header">
              <img
                src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-chat/ava3.webp"
                alt="avatar"
                className="avatar"
              />
              <p className="role">Full Stack Developer</p>
              <p className="location">Bay Area, San Francisco, CA</p>
              <div className="buttons">
                <button className="follow-btn">Follow</button>
                <button className="message-btn">Message</button>
              </div>
            </div>

            <div className="social-links">
              <div className="link">
                <i className="fas fa-globe"></i>
                <span>https://mdbootstrap.com</span>
              </div>
              <div className="link">
                <i className="fab fa-github"></i>
                <span>mdbootstrap</span>
              </div>
              <div className="link">
                <i className="fab fa-twitter"></i>
                <span>@mdbootstrap</span>
              </div>
              <div className="link">
                <i className="fab fa-instagram"></i>
                <span>mdbootstrap</span>
              </div>
              <div className="link">
                <i className="fab fa-facebook"></i>
                <span>mdbootstrap</span>
              </div>
            </div>
          </div>

          <div className="info-card">
            <div className="info-row">
              <span>Full Name</span>
              <span className="text-muted">Johnatan Smith</span>
            </div>
            <div className="info-row">
              <span>Email</span>
              <span className="text-muted">example@example.com</span>
            </div>
            <div className="info-row">
              <span>Phone</span>
              <span className="text-muted">(097) 234-5678</span>
            </div>
            <div className="info-row">
              <span>Mobile</span>
              <span className="text-muted">(098) 765-4321</span>
            </div>
            <div className="info-row">
              <span>Address</span>
              <span className="text-muted">Bay Area, San Francisco, CA</span>
            </div>
          </div>

          <div className="project-status">
            <h4>Project Status</h4>
            <div className="project-item">
              <span>Web Design</span>
              <div className="progress">
                <div className="progress-bar" style={{ width: '80%' }}></div>
              </div>
            </div>
            <div className="project-item">
              <span>Website Markup</span>
              <div className="progress">
                <div className="progress-bar" style={{ width: '72%' }}></div>
              </div>
            </div>
            <div className="project-item">
              <span>One Page</span>
              <div className="progress">
                <div className="progress-bar" style={{ width: '89%' }}></div>
              </div>
            </div>
            <div className="project-item">
              <span>Mobile Template</span>
              <div className="progress">
                <div className="progress-bar" style={{ width: '55%' }}></div>
              </div>
            </div>
            <div className="project-item">
              <span>Backend API</span>
              <div className="progress">
                <div className="progress-bar" style={{ width: '66%' }}></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
