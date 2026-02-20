import React from 'react';

const Footer = () => {
  const accentColor = "#00d1b2"; 

  const iconStyle = {
    width: '42px',
    height: '42px',
    borderRadius: '12px',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    cursor: 'pointer',
    transition: 'all 0.3s ease',
    fontSize: '18px',
    color: 'white',
    border: '1.5px solid rgba(255, 255, 255, 0.25)', 
    background: 'rgba(255, 255, 255, 0.03)',
  };

  const handleMouseOver = (e) => {
    e.currentTarget.style.borderColor = accentColor;
    e.currentTarget.style.color = accentColor;
    e.currentTarget.style.transform = 'translateY(-3px)';
  };

  const handleMouseOut = (e) => {
    e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.25)';
    e.currentTarget.style.color = 'white';
    e.currentTarget.style.transform = 'translateY(0)';
  };

  return (
    <footer style={{ 
      background: 'linear-gradient(to bottom, rgba(255,255,255,0.01), rgba(0, 209, 178, 0.03))', 
      padding: '60px 40px 30px', 
      borderTop: '1px solid rgba(255,255,255,0.08)', 
      textAlign: 'center',
      marginTop: '50px',
      backdropFilter: 'blur(15px)'
    }}>
      <div style={{ 
        display: 'flex', 
        justifyContent: 'space-around', 
        flexWrap: 'wrap', 
        gap: '40px', 
        maxWidth: '1200px', 
        margin: '0 auto 40px' 
      }}>
        <div style={{ minWidth: '200px' }}>
          <h4 style={{ color: accentColor, marginBottom: '15px', textTransform: 'uppercase', letterSpacing: '1px' }}>Contact Us</h4>
          <p style={{ opacity: 0.8, fontSize: '0.95rem' }}>📞 +94 760 752854</p>
          <p style={{ opacity: 0.8, fontSize: '0.95rem', marginTop: '5px' }}>📍 Galewela, Sri Lanka</p>
        </div>

        <div style={{ minWidth: '200px' }}>
          <h4 style={{ color: accentColor, marginBottom: '15px', textTransform: 'uppercase', letterSpacing: '1px' }}>Support</h4>
          <p style={{ opacity: 0.8, fontSize: '0.95rem' }}>📧 mrride@gmail.com</p>
          <p style={{ opacity: 0.8, fontSize: '0.95rem', marginTop: '5px' }}>🕒 24/7 Service Available</p>
        </div>

        <div style={{ minWidth: '200px' }}>
          <h4 style={{ color: accentColor, marginBottom: '15px', textTransform: 'uppercase', letterSpacing: '1px' }}>Follow Us</h4>
          <div style={{ display: 'flex', justifyContent: 'center', gap: '18px' }}>
            {/* Facebook */}
            <div style={iconStyle} title="Facebook" onMouseOver={handleMouseOver} onMouseOut={handleMouseOut}>
              f
            </div>
            
            {/* Real TikTok SVG Icon */}
            <div style={iconStyle} title="TikTok" onMouseOver={handleMouseOver} onMouseOut={handleMouseOut}>
              <svg 
                width="20" 
                height="20" 
                viewBox="0 0 24 24" 
                fill="currentColor" 
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.17-2.89-.6-4.13-1.47-.13 3.44-.3 6.88-.45 10.32-.15 2.13-.86 4.41-2.61 5.72-2 1.57-5.02 1.65-7.05.35-2.22-1.35-3.05-4.24-2.1-6.62.77-2.13 3.09-3.61 5.34-3.39.11 0 .22.02.33.04v4.07c-.44-.13-.9-.2-1.37-.21-1.32-.01-2.73.91-2.98 2.21-.31 1.5.76 3.12 2.26 3.4 1.14.24 2.47-.2 3.03-1.23.4-.64.44-1.4.45-2.13.01-4.71.01-9.42.02-14.13.03-1 .04-2 .03-3.01z" />
              </svg>
            </div>
            
            {/* LinkedIn */}
            <div style={iconStyle} title="LinkedIn" onMouseOver={handleMouseOver} onMouseOut={handleMouseOut}>
              in
            </div>
          </div>
        </div>
      </div>

      <hr style={{ border: 'none', borderTop: '1px solid rgba(255,255,255,0.05)', width: '80%', margin: '0 auto 20px' }} />

      <p style={{ opacity: 0.4, fontSize: '0.85rem', letterSpacing: '1px' }}>
        © 2026 <strong>MR RIDE</strong>. All Rights Reserved. <br/>
        <span style={{ color: accentColor }}>Developed by Mohamed Rukshan</span>
      </p>
    </footer>
  );
};

export default Footer;