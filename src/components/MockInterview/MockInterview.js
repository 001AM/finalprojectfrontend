import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Navbar from "../Navbar";
import CreateAxiosInstance from "../Axios";

const MockInterview = () => {
  const [mockInterviewData, setMockInterviewData] = useState([]);
  const [error, setError] = useState(null);
  const axiosInstance = CreateAxiosInstance();

  useEffect(() => {
    // Fetch mock interview data from the API
    const fetchMockInterviewData = async () => {
      try {
        const response = await axiosInstance.get("anaylzer/mockinterview_data/");
        
        // Check if the response contains mockinterview_data
        if (response.data.mockinterview_data) {
          setMockInterviewData(response.data.mockinterview_data); // Use the correct path for data
        } else {
          setError("No mock interview data found.");
        }
      } catch (error) {
        setError("An error occurred. Please try again later.");
      }
    };

    fetchMockInterviewData();
  }, [axiosInstance]); // Include axiosInstance as a dependency

  return (
    <div style={{ display: "flex", flexDirection: "column", padding: "20px" }}>
      <h1>My Interviews</h1>
      {error && <p style={{ color: "red" }}>{error}</p>}
      <div style={{ border: "1px solid #ccc", padding: "10px" }}>
        {mockInterviewData.length === 0 ? (
          <p>No mock interviews available.</p>
        ) : (
          [...mockInterviewData].reverse().map(interview => (
            <div
              key={interview.id}
              style={{ border: "1px solid #000", margin: "10px", padding: "10px" }}
            >
              <h2>{interview.name}</h2>
              <p>Role: {interview.role}</p>
              <p>Review: {interview.review || "No review provided"}</p>
              <p>Rating: {interview.rating || "Not rated"}</p>
              <p>Created At: {new Date(interview.created_at).toLocaleString()}</p>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default MockInterview;
