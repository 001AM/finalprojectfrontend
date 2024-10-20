import React, { useEffect, useRef, useState } from "react";
import "./InterviewPage.css"; // Add CSS for styling

const InterviewPage = () => {
  const videoRef = useRef(null);
  const [transcript, setTranscript] = useState(""); // Persistent transcript
  const [isRecording, setIsRecording] = useState(false);
  const [error, setError] = useState(null);
  const recognitionRef = useRef(null);
  const [currentQuestion, setCurrentQuestion] = useState("");
  const [questionIndex, setQuestionIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [timer, setTimer] = useState(120); // 2-minute timer (120 seconds)
  const [isTimerActive, setIsTimerActive] = useState(false);

  const questions = [
    "Tell me about yourself.",
    "Why do you want this job?",
    "What is your greatest strength?",
  ];

  // Start timer countdown
  useEffect(() => {
    let interval = null;
    if (isTimerActive && timer > 0) {
      interval = setInterval(() => {
        setTimer((prevTime) => prevTime - 1);
      }, 1000);
    } else if (timer === 0) {
      clearInterval(interval);
      recognitionRef.current && recognitionRef.current.stop(); // Stop recording when time runs out
    }
    return () => clearInterval(interval);
  }, [isTimerActive, timer]);

  // Access the user's camera using the getUserMedia API
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
  }, []);

  // Set up speech recognition and handle pauses without resetting transcript
  useEffect(() => {
    const SpeechRecognition =
      window.SpeechRecognition || window.webkitSpeechRecognition;
    if (SpeechRecognition) {
      const recognition = new SpeechRecognition();
      recognitionRef.current = recognition;

      recognition.continuous = true; // Continuous recognition for pauses
      recognition.interimResults = true; // Allow partial results

      recognition.onstart = () => {
        setIsRecording(true);
        setIsTimerActive(true); // Start the timer when recording starts
      };

      recognition.onend = () => {
        setIsRecording(false);
        setIsTimerActive(false); // Stop the timer when recording ends
        console.log("Speech recognition has stopped.");
      };

      recognition.onerror = (event) => {
        console.error("Speech recognition error:", event.error);
        setError("Speech recognition error occurred. Please try again.");
      };

      recognition.onresult = (event) => {
        let interimTranscript = "";
        for (let i = event.resultIndex; i < event.results.length; i++) {
          const transcriptPart = event.results[i][0].transcript;
          interimTranscript += transcriptPart;
        }
        setTranscript((prevTranscript) => prevTranscript + " " + interimTranscript); // Append new speech data
      };

      recognition.start(); // Start recognition on component mount
    } else {
      console.log("Speech Recognition API not supported in this browser.");
      setError("Speech Recognition API is not supported in this browser.");
    }
  }, []);

  // Fetch the next question
  const fetchNextQuestion = async () => {
    try {
      setIsLoading(true);
      const nextQuestion = questions[questionIndex];
      setCurrentQuestion(nextQuestion);
      setIsLoading(false);
    } catch (err) {
      console.error("Error fetching question:", err);
      setError("Unable to fetch the next question. Please try again.");
      setIsLoading(false);
    }
  };

  // Submit answer to Gemini for evaluation and scoring
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
        setTranscript(""); // Clear transcript for the new question
        setTimer(120); // Reset the timer for the next question
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

  return (
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
          gap: "80px",
        }}
      >
        <div>
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
            backgroundColor: "#222b37",
            color: "white",
            padding: "20px",
            borderRadius: "30px",
          }}
        >
          <div>
            <h2 className="question-title">
              {currentQuestion || "Fetching question..."}
            </h2>
            <p className="transcript">{transcript || "Listening..."}</p>
            {isRecording && <p className="status">Recording...</p>}
            {error && <p className="error">{error}</p>}
            <p className="timer">
              Time left: {Math.floor(timer / 60)}:{timer % 60 < 10 ? `0${timer % 60}` : timer % 60}
            </p>
          </div>
          <div className="score-container">
            <h2 className="score-title">Score: {score}</h2>
          </div>
        </div>
      </div>
    </div>
  );
};

export default InterviewPage;
