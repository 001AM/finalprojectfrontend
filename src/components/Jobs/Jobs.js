import React, { useState } from 'react';
import './Jobs.css'; // Make sure to create this file for styling

const Jobs = () => {
  const [selectedJob, setSelectedJob] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Sample job data
  const jobs = [
    {
      id: 1,
      title: 'Senior UI Developer',
      company: 'Nike',
      rate: '$120/hr',
      description: 'We are looking for a Senior UI Developer to join our team. You will be responsible for creating and maintaining high-quality user interfaces for our web applications...',
      logo: 'https://example.com/nike-logo.png', // Replace with actual logo URL
    },
    // Add more job data if needed
  ];

  const openModal = (job) => {
    setSelectedJob(job);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  return (
    <div className="jobs-container">
      <div className="background-purple margin-2px">
        <h1 className="mb-9">Find My Job</h1>
        <div className="job-cards">
          {jobs.map((job) => (
            <div key={job.id} className="job-card" onClick={() => openModal(job)}>
              <div className="job-rate">{job.rate}</div>
              <div className="job-title">{job.title}</div>
              <div className="job-arrow">→</div>
              <div className="job-company">
                <img src={job.logo} alt={job.company} className="company-logo" />
                <span>{job.company}</span>
                <button className="view-button">View</button>
              </div>
              
            </div>
          ))}
        </div>
      </div>

      {/* Modal */}
      {isModalOpen && (
        <div className="modal-overlay" onClick={closeModal}>
          <div className="modal-content " style={{backgroundColor:'white'}} onClick={(e) => e.stopPropagation()}>
            <button className="close-button" onClick={closeModal}>X</button>
            {selectedJob && (
              <>
                <h2>{selectedJob.title}</h2>
                <p>{selectedJob.description}</p>
                <button className="apply-button">Apply Now</button>
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default Jobs;
