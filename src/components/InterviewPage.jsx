import React, { useState, useRef, useEffect } from "react";
import CreateAxiosInstance from "../Axios";
import axios from "axios";
import SpeechRecognition, { useSpeechRecognition } from "react-speech-recognition";
import { useNavigate } from "react-router-dom";

const InterviewPage = () => {
  const axiosInstance = CreateAxiosInstance();
  const videoRef = useRef(null);
  const [formState, setFormState] = useState({
    resume: null,
    transcript: "",
    role: "",
  });
  const [error, setError] = useState(null);
  const [isResumeUploaded, setIsResumeUploaded] = useState(false);
  const [isWebcamVisible, setIsWebcamVisible] = useState(false);
  const [isTranscribing, setIsTranscribing] = useState(false);
  const { transcript, resetTranscript, browserSupportsSpeechRecognition } = useSpeechRecognition();
  const [question, setQuestion] = useState([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [id, setId] = useState();
  const [loading, setLoading] = useState(false); // Loading state
  const navigate = useNavigate();

  const handleResumeUpload = (e) => {
    setFormState({ ...formState, resume: e.target.files[0] });
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormState({ ...formState, [name]: value });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!formState.resume || !formState.transcript || !formState.role) {
      setError("Please upload your resume and fill out all fields.");
      return;
    }

    const formData = new FormData();
    formData.append("resume", formState.resume);
    formData.append("nottranscript", "False");
    formData.append("transcript", formState.transcript);
    formData.append("role", formState.role);

    setLoading(true); // Start loading

    try {
      const response = await axiosInstance.post(
        "http://192.168.0.107:8000/anaylzer/upload/",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      console.log("Resume uploaded successfully:", response.data);
      setIsResumeUploaded(true);
      setId(response.data.id);
      setError(null);
      setIsWebcamVisible(true);
      setIsTranscribing(true);
      const questionsWithAnswers = response.data.keywords.map(q => ({ ...q, answer: "" }));
      setQuestion(questionsWithAnswers);
    } catch (error) {
      console.error("Error uploading resume:", error);
      setError("Failed to upload resume. Please try again.");
    } finally {
      setLoading(false); // Stop loading
    }
  };

  const handleNextQuestion = () => {
    if (currentQuestionIndex < question.length - 1) {
      const updatedQuestions = [...question];
      updatedQuestions[currentQuestionIndex].answer = transcript;
      setQuestion(updatedQuestions);
      setCurrentQuestionIndex(currentQuestionIndex + 1);
      resetTranscript();
    }
  };

  const handlePreviousQuestion = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(currentQuestionIndex - 1);
    }
  };

  useEffect(() => {
    const getUserCamera = async () => {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({ video: true });
        if (videoRef.current) {
          videoRef.current.srcObject = stream;
        }
      } catch (err) {
        console.error("Error accessing camera:", err);
        setError("Unable to access the camera. Please check your permissions.");
      }
    };

    if (isWebcamVisible) {
      getUserCamera();
    }

    return () => {
      if (videoRef.current && videoRef.current.srcObject) {
        const stream = videoRef.current.srcObject;
        const tracks = stream.getTracks();
        tracks.forEach((track) => track.stop());
      }
    };
  }, [isWebcamVisible]);

  useEffect(() => {
    if (isTranscribing) {
      SpeechRecognition.startListening({ continuous: true, language: "en-IN" });
    }

    return () => {
      SpeechRecognition.stopListening();
    };
  }, [isTranscribing]);

  if (!browserSupportsSpeechRecognition) {
    return <p>Speech Recognition API is not supported in this browser.</p>;
  }

  const Submit = async () => {
    const formData = new FormData();
    formData.append("answers", JSON.stringify(question));
    formData.append("id", id);
    navigate('/mock-interview');

    try {
      const res = await axiosInstance.post('anaylzer/submitmockinterview/', formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });
      console.log(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div style={{ display: "flex", flexDirection: "column", alignItems: "center", marginTop: "50px" }}>
      <h1 className="title">Stark AI - Real-Time Interview</h1>

      {/* Resume Upload Section */}
      {!isResumeUploaded && (
        <form onSubmit={handleSubmit} style={{ marginTop: "20px", textAlign: "center" }}>
          <input
            type="file"
            accept=".pdf,.doc,.docx"
            onChange={handleResumeUpload}
            style={{ marginBottom: "10px", marginRight: "5px", border: '2px solid' }}
          />
          <input
            type="text"
            name="transcript"
            value={formState.transcript}
            onChange={handleInputChange}
            style={{ borderRadius: "20px", padding: "10px", marginBottom: "10px", marginRight: "5px", border: '2px solid' }}
            placeholder="Enter Transcript"
          />
          <input
            type="text"
            name="role"
            value={formState.role}
            onChange={handleInputChange}
            style={{ borderRadius: "20px", padding: "10px", marginRight: "5px", marginBottom: "10px", border: '2px solid' }}
            placeholder="Enter Role"
          />
          <button
            type="submit"
            style={{
              padding: "10px",
              borderRadius: "10px",
              backgroundColor: "green",
              color: "white",
              marginBottom: "10px",
            }}
          >
            Upload
          </button>
          {loading && <p>Loading...</p>} {/* Loader */}
          {error && <p style={{ color: "red" }}>{error}</p>}
        </form>
      )}

      {/* Webcam and Transcript Section */}
      {isWebcamVisible && (
        <div style={{ display: "flex", flexDirection: "row", alignItems: "start", marginTop: "20px", gap: '20px' }}>
          <div style={{ width: "80vh" }}>
            <video ref={videoRef} autoPlay muted style={{ borderRadius: "30px" }}></video>
          </div>
          <div style={{ padding: "20px", borderRadius: "30px", border: "1px solid black", marginTop: "20px" }}>
            <h2>Question {currentQuestionIndex + 1}: {question[currentQuestionIndex]?.question[0]}</h2>
            <p style={{ fontSize: '30px' }}>{transcript ? transcript : 'Listening...'}</p>
            {question.length > 0 && (
              <div>
                <button onClick={handlePreviousQuestion} disabled={currentQuestionIndex === 0} style={{ marginRight: "10px", backgroundColor: 'green', padding: '10px', color: 'white', borderRadius: '20px' }}>
                  Previous
                </button>
                <button onClick={handleNextQuestion} disabled={currentQuestionIndex === question.length - 1} style={{ backgroundColor: 'green', padding: '10px', color: 'white', borderRadius: '20px' }}>
                  Next
                </button>
              </div>
            )}
          </div>
        </div>
      )}
      {isResumeUploaded && <p style={{ color: "green" }}>Resume uploaded successfully!</p>}

      {/* Display the submit button only on the last question */}
      {isWebcamVisible && currentQuestionIndex === question.length - 1 && (
        <button onClick={Submit} style={{ backgroundColor: 'green', padding: '10px', borderRadius: '20px' }}>Submit</button>
      )}
    </div>
  );
};

export default InterviewPage;
