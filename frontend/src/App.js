import React, { useState } from 'react';
import axios from 'axios';
import { BrowserRouter as Router, Routes, Route, useNavigate } from 'react-router-dom';
import './App.css'; 
import Home from './Home'; 

function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isRegister, setIsRegister] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Choosing the endpoint based on whether the user is registering or logging in
    const url = isRegister ? "http://localhost:5000/register" : "http://localhost:5000/login";

    try {
      const response = await axios.post(url, { email, password });
      alert(response.data.message);
      
      // Navigate to Home dashboard only on successful login
      if (!isRegister && response.status === 200) {
        navigate("/home");
      }
    } catch (error) {
      alert("Error: " + (error.response ? error.response.data.message : "Server is not reachable"));
    }
  };

  return (
    <div className="main-container">
      <div className="login-card">
        {/* Changed the heading text to User Login */}
        <h2>{isRegister ? "Create Your Account" : "User Login"}</h2>
        
        <form onSubmit={handleSubmit}>
          <div className="input-group">
            <input 
              type="email" 
              className="styled-input"
              placeholder="Email Address" 
              onChange={(e) => setEmail(e.target.value)} 
              value={email}
              required 
            />
          </div>
          <div className="input-group">
            <input 
              type="password" 
              className="styled-input"
              placeholder="Password" 
              onChange={(e) => setPassword(e.target.value)} 
              value={password}
              required 
            />
          </div>
          <button type="submit" className="login-btn">
            {isRegister ? "Register Now" : "Sign In"}
          </button>
        </form>

        <p className="switch-text">
          {isRegister ? "Already have an account? " : "New to MR Ride? "}
          <span className="link" onClick={() => setIsRegister(!isRegister)}>
            {isRegister ? "Login here" : "Get started today"}
          </span>
        </p>
      </div>
    </div>
  );
}

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/home" element={<Home />} />
      </Routes>
    </Router>
  );
}

export default App;