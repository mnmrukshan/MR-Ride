import React from 'react';

function Home() {
  return (
    <div style={{ 
      height: '100vh', 
      display: 'flex', 
      flexDirection: 'column',
      justifyContent: 'center', 
      alignItems: 'center', 
      backgroundColor: '#0b2225', 
      color: 'white',
      fontFamily: 'Poppins, sans-serif'
    }}>
      <h1 style={{ fontSize: '3rem', marginBottom: '20px' }}>Welcome to MR Ride! 🚗</h1>
      <h2 style={{ color: '#00ffcc' }}>You have successfully accessed the Dashboard.</h2>
      <p style={{ marginTop: '20px', fontSize: '1.2rem' }}>Experience the best car rental service with us.</p>
      
      <button 
        onClick={() => window.location.href = "/"}
        style={{ 
          marginTop: '30px', 
          padding: '12px 30px', 
          borderRadius: '30px', 
          border: 'none', 
          backgroundColor: 'white', 
          fontWeight: 'bold', 
          cursor: 'pointer' 
        }}
      >
        Log Out
      </button>
    </div>
  );
}

export default Home;