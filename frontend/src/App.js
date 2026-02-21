import React, { useState } from 'react';
import axios from 'axios';
import { BrowserRouter as Router, Routes, Route, useNavigate } from 'react-router-dom';
import './App.css'; 
import Home from './Home'; 
import myLogo from './logo2.png'; 
import MyBookings from './MyBookings';

function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isRegister, setIsRegister] = useState(false);
  const navigate = useNavigate();

  const accentColor = "#00d1b2"; // Your theme emerald color

  const handleSubmit = async (e) => {
    e.preventDefault();
    const url = isRegister ? "http://localhost:5000/register" : "http://localhost:5000/login";

    try {
      const response = await axios.post(url, { email, password });
      
      if (isRegister) {
        alert("Registration Successful! Please login.");
      } else {
        alert("Login Successful!");
      }
      
      if (!isRegister && response.status === 200) {
        localStorage.setItem("userName", email.split('@')[0]); 
        navigate("/home");
      }
    } catch (error) {
      const errorMsg = error.response ? error.response.data.message : "Server Connection Failed";
      alert("Error: " + errorMsg);
    }
  };

  // Modern Glassy Button Style
  const glassButtonStyle = {
    width: '100%',
    padding: '14px',
    borderRadius: '15px',
    border: `1px solid ${accentColor}`,
    background: 'rgba(0, 209, 178, 0.1)',
    color: accentColor,
    fontSize: '1.1rem',
    fontWeight: '900',
    cursor: 'pointer',
    backdropFilter: 'blur(5px)',
    transition: 'all 0.3s ease',
    textTransform: 'uppercase',
    letterSpacing: '1px',
    marginTop: '20px',
    outline: 'none'
  };

  return (
    <div className="main-container">
      <div className="login-card">
        <div className="logo-container" style={{ textAlign: 'center', marginBottom: '20px' }}>
          <img src={myLogo} alt="MR Ride Logo" style={{ width: '100px', height: 'auto' }} />
        </div>

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

          {/* Optimized Glassmorphism Button */}
          <button 
            type="submit" 
            style={glassButtonStyle}
            onMouseOver={(e) => {
              e.target.style.backgroundColor = accentColor;
              e.target.style.color = '#071618';
              e.target.style.boxShadow = `0 0 25px ${accentColor}88`;
              e.target.style.transform = 'translateY(-2px)';
            }}
            onMouseOut={(e) => {
              e.target.style.backgroundColor = 'rgba(0, 209, 178, 0.1)';
              e.target.style.color = accentColor;
              e.target.style.boxShadow = 'none';
              e.target.style.transform = 'translateY(0)';
            }}
            onMouseDown={(e) => e.target.style.transform = 'scale(0.96)'}
            onMouseUp={(e) => e.target.style.transform = 'scale(1)'}
          >
            {isRegister ? "Register Now" : "Sign In"}
          </button>
        </form>

        <p className="switch-text">
          {isRegister ? "Already have an account? " : "New to MR Ride? "}
          <span 
            className="link" 
            style={{ color: accentColor, fontWeight: 'bold', cursor: 'pointer' }}
            onClick={() => setIsRegister(!isRegister)}
          >
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
        <Route path="/my-bookings" element={<MyBookings />} />
      </Routes>
    </Router>
  );
}

export default App;