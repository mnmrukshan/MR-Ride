import React, { useEffect, useState } from 'react';
import Footer from './Footer';

function MyBookings() {
    const [bookings, setBookings] = useState([]);
    const userEmail = localStorage.getItem("userName"); 
    const accentColor = "#00d1b2";

    // --- NEW: FETCH BOOKINGS ---
    useEffect(() => {
        if (userEmail) {
            fetch(`http://localhost:5000/api/my-bookings/${userEmail}`)
                .then(res => res.json())
                .then(data => setBookings(data))
                .catch(err => console.error("Error fetching bookings:", err));
        }
    }, [userEmail]);

    // --- NEW: DELETE FUNCTION ---
    const handleDelete = async (id) => {
        if (window.confirm("Are you sure you want to cancel this booking?")) {
            try {
                const response = await fetch(`http://localhost:5000/api/book/${id}`, { 
                    method: 'DELETE' 
                });
                if (response.ok) {
                    alert("Booking Cancelled!");
                    // Filter out the deleted booking from UI instead of full reload for better speed
                    setBookings(bookings.filter(booking => booking._id !== id));
                }
            } catch (err) {
                alert("Error deleting booking!");
            }
        }
    };

    return (
        <div style={{ backgroundColor: '#071618', minHeight: '100vh', color: 'white', fontFamily: 'Poppins, sans-serif' }}>
            <div style={{ padding: '80px 40px' }}>
                <h1 style={{ textAlign: 'center', marginBottom: '50px', fontSize: '2.5rem', fontWeight: '800' }}>
                    My <span style={{color: accentColor}}>Reservations</span>
                </h1>
                
                <div style={{ display: 'grid', gap: '25px', maxWidth: '900px', margin: '0 auto' }}>
                    {bookings.length > 0 ? bookings.map(booking => (
                        <div key={booking._id} style={{ 
                            background: 'rgba(255, 255, 255, 0.03)', padding: '30px', borderRadius: '25px', 
                            border: '1px solid rgba(255, 255, 255, 0.1)', backdropFilter: 'blur(15px)',
                            display: 'flex', justifyContent: 'space-between', alignItems: 'center',
                            transition: '0.3s'
                        }}>
                            <div>
                                <h3 style={{ color: accentColor, margin: '0 0 8px 0', fontSize: '1.4rem' }}>{booking.vehicleName}</h3>
                                <p style={{ opacity: 0.7, margin: '4px 0' }}>📅 Date: <strong>{booking.pickupDate}</strong></p>
                                <p style={{ opacity: 0.7, margin: '4px 0' }}>🕒 Time: <strong>{booking.pickupTime}</strong></p>
                            </div>
                            
                            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', alignItems: 'flex-end' }}>
                                <div style={{ 
                                    background: 'rgba(0, 209, 178, 0.1)', padding: '8px 15px', 
                                    borderRadius: '10px', color: accentColor, fontSize: '0.75rem', 
                                    fontWeight: '900', border: `1px solid ${accentColor}44` 
                                }}>
                                    STATUS: PENDING
                                </div>
                                
                                {/* --- NEW: DELETE BUTTON --- */}
                                <button 
                                    onClick={() => handleDelete(booking._id)}
                                    style={{
                                        background: 'rgba(255, 68, 68, 0.1)',
                                        color: '#ff4444',
                                        border: '1px solid #ff4444',
                                        padding: '8px 15px',
                                        borderRadius: '10px',
                                        cursor: 'pointer',
                                        fontSize: '0.75rem',
                                        fontWeight: 'bold',
                                        transition: '0.3s'
                                    }}
                                    onMouseOver={(e) => {
                                        e.target.style.background = '#ff4444';
                                        e.target.style.color = 'white';
                                    }}
                                    onMouseOut={(e) => {
                                        e.target.style.background = 'rgba(255, 68, 68, 0.1)';
                                        e.target.style.color = '#ff4444';
                                    }}
                                >
                                    CANCEL BOOKING
                                </button>
                            </div>
                        </div>
                    )) : (
                        <div style={{ textAlign: 'center', padding: '50px', background: 'rgba(255,255,255,0.02)', borderRadius: '20px' }}>
                            <p style={{ opacity: 0.5, fontSize: '1.2rem' }}>You haven't made any bookings yet.</p>
                        </div>
                    )}
                </div>
            </div>
            <Footer />
        </div>
    );
}

export default MyBookings;