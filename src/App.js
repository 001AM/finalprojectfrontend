// src/App.js
import React from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  useLocation,
} from "react-router-dom";
import InterviewPage from "./components/InterviewPage";
import Jobs from "./components/Jobs/Jobs";
import HomePage from "./components/HomePage";
import Dashboard from "./components/Dashboard/Dashboard";
import LoginPage from "./components/Authentication/LoginPage";
import SignupPage from "./components/Authentication/SignupPage";
import "bootstrap/dist/css/bootstrap.min.css";
import "../src/App.css";
import Profile from "./components/Profile/Profile";
import MockInterview from "./components/MockInterview/MockInterview";
import BaseLayout from "./layout/BaseLayout"; // Import the BaseLayout component

const App = () => {
  const location = useLocation();

  const isAuthRoute =
    location.pathname === "/login" || location.pathname === "/signup";

  return (
    <div>
      {!isAuthRoute ? ( // If not on auth routes, use BaseLayout
        <BaseLayout>
          <Routes>
            {/* Protected Routes */}
            <Route path="/" element={<HomePage />} />
            <Route path="/interview" element={<InterviewPage />} />
            {/* <Route path="/dashboard" element={<Dashboard />} /> */}
            <Route path="/profile" element={<Profile />} />
            <Route path="/mock-interview" element={<MockInterview />} />
            {/* <Route path="/jobs" element={<Jobs />} /> */}
          </Routes>
        </BaseLayout>
      ) : (
        <Routes>
          {/* Authentication Routes */}
          <Route path="/signup" element={<SignupPage />} />
          <Route path="/login" element={<LoginPage />} />
        </Routes>
      )}
    </div>
  );
};

// Wrap App in Router
const AppWithRouter = () => (
  <Router>
    <App />
  </Router>
);

export default AppWithRouter;
