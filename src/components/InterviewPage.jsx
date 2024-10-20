import React, { useEffect, useRef, useState } from "react";
import "./InterviewPage.css";
import SpeechRecognition, { useSpeechRecognition } from "react-speech-recognition";
import axios from "axios";

const InterviewPage = () => {
  const videoRef = useRef(null);
  const [isRecording, setIsRecording] = useState(false);
  const [error, setError] = useState(null);
  const [currentQuestion, setCurrentQuestion] = useState("");
  const [questionIndex, setQuestionIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [timer, setTimer] = useState(120); // 2-minute timer (120 seconds)
  const [isTimerActive, setIsTimerActive] = useState(false);
  const [mic, setMic] = useState(true);
  const [micText, setMicText] = useState("Start");
  const [question, setQuestions] = useState([])
  const [resume, setResume] = useState()

  useEffect(() => {
    async function getData() {
      const res = await axios.get('http://192.168.0.107:8000/analyzer/upload/')

    }
  }, [])

  // Speech Recognition Setup
  const startListening = () =>
    SpeechRecognition.startListening({ continuous: true, language: "en-IN" });
  const { transcript, resetTranscript, browserSupportsSpeechRecognition } =
    useSpeechRecognition();

  // Questions array
  const questions = [
    "Tell me about yourself.",
    "Why do you want this job?",
    "What is your greatest strength?",
  ];

  // Toggle Microphone
  const handleMic = () => {
    if (mic) {
      setMic(false);
      SpeechRecognition.stopListening();
      setMicText("Start");
      stopTimer(); // Stop the timer when the mic is stopped
    } else {
      setMic(true);
      startListening();
      setMicText("Stop");
      startTimer(); // Start the timer when the mic is started
    }
  };

  // Timer countdown
  useEffect(() => {
    let interval = null;
    if (isTimerActive && timer > 0) {
      interval = setInterval(() => {
        setTimer((prevTime) => prevTime - 1);
      }, 1000);
    } else if (timer === 0) {
      clearInterval(interval);
      SpeechRecognition.stopListening();
    }
    return () => clearInterval(interval);
  }, [isTimerActive, timer]);

  const startTimer = () => {
    setIsTimerActive(true);
    setTimer(120); // Reset the timer to 2 minutes
  };

  const stopTimer = () => {
    setIsTimerActive(false);
    // setTimer(0)
  };

  // Access user's camera
  useEffect(() => {
    const getUserCamera = async () => {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({
          video: true,
        });
        if (videoRef.current) {
          videoRef.current.srcObject = stream;
        }
      } catch (err) {
        console.error("Error accessing camera:", err);
        setError("Unable to access the camera. Please check your permissions.");
      }
    };

    getUserCamera();

    // Clean up the video stream when component unmounts
    return () => {
      if (videoRef.current && videoRef.current.srcObject) {
        const stream = videoRef.current.srcObject;
        const tracks = stream.getTracks();
        tracks.forEach((track) => track.stop());
      }
    };
  }, []);

  // Fetch the next question
  const fetchNextQuestion = () => {
    const nextQuestion = questions[questionIndex];
    setCurrentQuestion(nextQuestion);
    setIsLoading(false);
  };

  // Submit the answer for evaluation
  const submitAnswer = async (answer) => {
    try {
      setIsLoading(true);
      const response = await fetch("/gemini-api/score", {
        method: "POST",
        body: JSON.stringify({ question: currentQuestion, answer }),
        headers: {
          "Content-Type": "application/json",
        },
      });
      const data = await response.json();
      setScore((prevScore) => prevScore + data.score);

      if (questionIndex < questions.length - 1) {
        setQuestionIndex((prevIndex) => prevIndex + 1);
        resetTranscript();
        setTimer(120);
      } else {
        console.log("Interview completed");
      }
      setIsLoading(false);
    } catch (err) {
      console.error("Error submitting answer:", err);
      setError("Unable to submit your answer. Please try again.");
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchNextQuestion();
  }, [questionIndex]);

  const stopListening = () => {
    setIsRecording(false);
    SpeechRecognition.stopListening();
    setIsTimerActive(false);
  };

  if (!browserSupportsSpeechRecognition) {
    return <p>Speech Recognition API is not supported in this browser.</p>;
  }

  return (
    <>
    {
      
    }
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          marginTop: "50px",
        }}
      >
        <h1 className="title">Stark AI - Real-Time Interview</h1>
        <div
          className="flex flex-row"
          style={{
            display: "flex",
            flexDirection: "row",
            marginTop: "20px",
          }}
        >
          <div style={{ Width: "80vh" }}>
            <video
              style={{ borderRadius: "30px" }}
              ref={videoRef}
              autoPlay
              muted
              className="video"
            ></video>
          </div>
          <div
            style={{
              color: "black",
              padding: "20px",
              borderRadius: "30px",
              border: "1px solid black",
            }}
          >
            <div className="container">
              <h2 style={{ color: "black" }}></h2>
              <br />

              <div className="main-content">{transcript}</div>

              <div className="btn-style">
                <button
                  style={{ backgroundColor: `${micText === "Start" ? 'blue' : 'red'}`, padding: "8px", borderRadius: "10px", color: "white" }}
                  onClick={handleMic}
                  disabled={timer === 0}
                >
                  {micText}
                </button>
              </div>
              <div className="timer">
                <h3>Timer: {timer}s</h3>
              </div>
            </div>
            <div className="score-container">
              <h2 className="score-title">Score: {score}</h2>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default InterviewPage;
