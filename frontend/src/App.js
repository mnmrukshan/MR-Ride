import React, { useState } from 'react';
import axios from 'axios';
import { BrowserRouter as Router, Routes, Route, useNavigate } from 'react-router-dom';
import './App.css'; 
import Home from './Home'; // Importing the Home component

function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isRegister, setIsRegister] = useState(false);
  const navigate = useNavigate(); // Tool used for page navigation

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Selecting the URL based on Register or Login mode
    const url = isRegister ? "http://localhost:5000/register" : "http://localhost:5000/login";

    try {
      const response = await axios.post(url, { email, password });
      alert(response.data.message);
      
      // Navigate to Dashboard (Home) only if Login is successful
      if (!isRegister && response.status === 200) {
        navigate("/home");
      }
    } catch (error) {
      alert("Error: " + (error.response ? error.response.data.message : "Server is not responding!"));
    }
  };

  return (
    <div className="main-container">
      <div className="login-card">
        <h2>{isRegister ? "User Register" : "User Login"}</h2>
        
        <form onSubmit={handleSubmit}>
          <div className="input-group">
            <div className="icon-circle">
              <i className="fas fa-user"></i>
            </div>
            <input 
              type="email" 
              className="styled-input"
              placeholder="Username / Email" 
              onChange={(e) => setEmail(e.target.value)} 
              value={email}
              required 
            />
          </div>

          <div className="input-group">
            <input 
              type="password" 
              className="styled-input input-right"
              placeholder="Password" 
              onChange={(e) => setPassword(e.target.value)} 
              value={password}
              required 
            />
            <div className="icon-circle right-icon">
              <i className="fas fa-lock"></i>
            </div>
          </div>

          <button type="submit" className="login-btn">
            {isRegister ? "REGISTER" : "LOGIN"}
          </button>
        </form>

        <p className="switch-text" style={{color: 'white', marginTop: '20px'}}>
          {isRegister ? "Already have an account? " : "New here? "}
          <span 
            className="link" 
            onClick={() => setIsRegister(!isRegister)}
            style={{color: '#00ffcc', cursor: 'pointer', fontWeight: 'bold'}}
          >
            {isRegister ? "Login here" : "Register Now"}
          </span>
        </p>
      </div>
    </div>
  );
}

// Main App component wrapped in Router
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