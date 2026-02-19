import React, { useState } from 'react';
import axios from 'axios';
import { BrowserRouter as Router, Routes, Route, useNavigate } from 'react-router-dom';
import './App.css'; 
import Home from './Home'; // අපි හදපු අලුත් Home පිටුව

function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isRegister, setIsRegister] = useState(false);
  const navigate = useNavigate(); // පිටු මාරු කරන්න පාවිච්චි කරන tool එක

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Register ද Login ද කියලා බලලා URL එක තෝරනවා
    const url = isRegister ? "http://localhost:5000/register" : "http://localhost:5000/login";

    try {
      const response = await axios.post(url, { email, password });
      alert(response.data.message);
      
      // සාර්ථකව Login වුණොත් විතරක් Dashboard (Home) එකට යවනවා
      if (!isRegister && response.status === 200) {
        navigate("/home");
      }
    } catch (error) {
      alert("වැරදියි: " + (error.response ? error.response.data.message : "Server එක වැඩ නැත!"));
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

// මුළු App එකම Router එක ඇතුළේ තියන්න ඕනේ
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