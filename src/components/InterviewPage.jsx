import React, { useEffect, useRef, useState } from "react";
import "./InterviewPage.css"; // Add CSS for styling

const InterviewPage = () => {
  const videoRef = useRef(null);
  const [transcript, setTranscript] = useState("");
  const [isRecording, setIsRecording] = useState(false);
  const [error, setError] = useState(null);
  const recognitionRef = useRef(null);
  const [currentQuestion, setCurrentQuestion] = useState("");
  const [questionIndex, setQuestionIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [isLoading, setIsLoading] = useState(false);

  const questions = [
    // Example hardcoded questions, replace this with actual fetch from Gemini API
    "Tell me about yourself.",
    "Why do you want this job?",
    "What is your greatest strength?",
  ];

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

  // Set up speech recognition using the Web Speech API
  useEffect(() => {
    const SpeechRecognition =
      window.SpeechRecognition || window.webkitSpeechRecognition;
    if (SpeechRecognition) {
      const recognition = new SpeechRecognition();
      recognitionRef.current = recognition;

      recognition.continuous = true;
      recognition.interimResults = true;

      recognition.onstart = () => {
        setIsRecording(true);
      };

      recognition.onend = () => {
        setIsRecording(false);
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
        setTranscript(interimTranscript);
      };

      recognition.start();
    } else {
      console.log("Speech Recognition API not supported in this browser.");
      setError("Speech Recognition API is not supported in this browser.");
    }
  }, []);

  // Function to fetch the next question from Gemini API
  const fetchNextQuestion = async () => {
    try {
      setIsLoading(true);
      // Replace this with the actual Gemini API call
      const nextQuestion = questions[questionIndex];
      setCurrentQuestion(nextQuestion);
      setIsLoading(false);
    } catch (err) {
      console.error("Error fetching question:", err);
      setError("Unable to fetch the next question. Please try again.");
      setIsLoading(false);
    }
  };

  // Function to send the transcript to Gemini for evaluation and scoring
  const submitAnswer = async (answer) => {
    try {
      setIsLoading(true);
      // Replace this with actual call to Gemini API to evaluate the answer
      const response = await fetch("/gemini-api/score", {
        method: "POST",
        body: JSON.stringify({ question: currentQuestion, answer }),
        headers: {
          "Content-Type": "application/json",
        },
      });
      const data = await response.json();
      setScore((prevScore) => prevScore + data.score);

      // Move to the next question
      if (questionIndex < questions.length - 1) {
        setQuestionIndex((prevIndex) => prevIndex + 1);
        setTranscript("");
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

  // Move to next question once current answer is done
  useEffect(() => {
    if (transcript && !isLoading) {
      submitAnswer(transcript);
    }
  }, [transcript]);

  // Automatically fetch the first question on page load
  useEffect(() => {
    fetchNextQuestion();
  }, [questionIndex]);

  return (
    <div className="stark-ai-container">
      <h1 className="title">Stark AI - Real-Time Interview</h1>
      <div className="video-container">
        <video ref={videoRef} autoPlay muted className="video"></video>
      </div>
      <div className="transcript-container">
        <h2 className="question-title">
          {currentQuestion || "Fetching question..."}
        </h2>
        <p className="transcript">{transcript || "Listening..."}</p>
        {isRecording && <p className="status">Recording...</p>}
        {error && <p className="error">{error}</p>}
      </div>
      <div className="score-container">
        <h2 className="score-title">Score: {score}</h2>
      </div>
    </div>
  );
};

export default InterviewPage;
