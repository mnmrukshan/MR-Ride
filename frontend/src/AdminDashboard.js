import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Footer from './Footer';

function AdminDashboard() {
    const accentColor = "#00d1b2";
    
    // States for data management
    const [adminVehicles, setAdminVehicles] = useState([]); // Real inventory from DB
    const [reservations, setReservations] = useState([]); // Real bookings from DB
    const [isLoading, setIsLoading] = useState(true); 
    const [searchTerm, setSearchTerm] = useState("");
    const [newVehicle, setNewVehicle] = useState({ name: "", type: "Car", price: "", img: "" }); // img added
    const [showNote, setShowNote] = useState(false);

    // Fetch all bookings and vehicles from database on component load
    useEffect(() => {
        const fetchData = async () => {
            setIsLoading(true); 
            try {
                // Fetch Reservations
                const resResponse = await axios.get('http://localhost:5000/api/admin/all-bookings');
                setReservations(resResponse.data);

                // Fetch Vehicles (Inventory)
                const vehResponse = await axios.get('http://localhost:5000/api/vehicles');
                setAdminVehicles(vehResponse.data);
            } catch (err) {
                console.error("Error fetching data:", err);
            } finally {
                setIsLoading(false); 
            }
        };
        fetchData();
    }, []);

    // Function to Add a New Vehicle to Database
    const handleAddVehicle = async (e) => {
        e.preventDefault();
        try {
            await axios.post('http://localhost:5000/api/admin/add-vehicle', newVehicle);
            setShowNote(true);
            setTimeout(() => setShowNote(false), 3000);
            
            // Refresh the vehicle list
            const response = await axios.get('http://localhost:5000/api/vehicles');
            setAdminVehicles(response.data);
            setNewVehicle({ name: "", type: "Car", price: "", img: "" }); // Reset form
        } catch (err) {
            alert("Failed to add vehicle!");
        }
    };

    // Function to Edit Vehicle Price via Prompt
    const handleEditVehicle = async (id, currentName, currentPrice) => {
        const newPrice = prompt(`Enter new price for ${currentName}:`, currentPrice);
        if (newPrice !== null && newPrice !== "") {
            try {
                await axios.patch(`http://localhost:5000/api/admin/vehicle/${id}`, { 
                    price: Number(newPrice),
                    name: currentName 
                });
                alert("Vehicle updated successfully!");
                // Update UI
                setAdminVehicles(adminVehicles.map(v => v._id === id ? { ...v, price: newPrice } : v));
            } catch (err) {
                alert("Update failed!");
            }
        }
    };

    // 👈 පියවර 1: handleDeleteVehicle Function එක ඇතුළත් කළා
    const handleDeleteVehicle = async (id) => {
        if (window.confirm("Are you sure you want to remove this vehicle?")) {
            try {
                await axios.delete(`http://localhost:5000/api/admin/vehicle/${id}`);
                alert("Vehicle removed successfully!");
                // Update the UI immediately
                setAdminVehicles(adminVehicles.filter(v => v._id !== id));
            } catch (err) {
                console.error("Delete error:", err);
                alert("Delete failed!");
            }
        }
    };

    // Function to Approve/Reject a booking
    const updateStatus = async (id, newStatus) => {
        try {
            await axios.patch(`http://localhost:5000/api/book/status/${id}`, { status: newStatus });
            setReservations(reservations.map(res => res._id === id ? { ...res, status: newStatus } : res));
            alert(`Booking ${newStatus} successfully!`);
        } catch (err) {
            alert("Status update failed!");
        }
    };

    const glassStyle = {
        background: 'rgba(255, 255, 255, 0.02)',
        backdropFilter: 'blur(25px)',
        WebkitBackdropFilter: 'blur(25px)',
        borderRadius: '30px',
        border: '1px solid rgba(255, 255, 255, 0.08)',
        padding: '35px',
        boxShadow: '0 20px 60px rgba(0, 0, 0, 0.5)',
        transition: '0.3s ease'
    };

    const inputStyle = {
        width: '100%',
        padding: '16px',
        borderRadius: '16px',
        border: '1px solid rgba(255,255,255,0.1)',
        background: 'rgba(255,255,255,0.05)',
        color: 'white',
        fontSize: '1rem',
        outline: 'none',
        transition: '0.3s'
    };

    const filteredVehicles = adminVehicles.filter(v => 
        v.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div style={{ backgroundColor: '#071618', minHeight: '100vh', color: 'white', fontFamily: 'Poppins, sans-serif' }}>
            
            {showNote && (
                <div style={{ 
                    position: 'fixed', top: '30px', right: '30px', background: accentColor, color: '#071618', 
                    padding: '18px 35px', borderRadius: '15px', fontWeight: '900', zIndex: 5000, 
                    boxShadow: `0 15px 40px ${accentColor}66`, animation: 'slideInRight 0.5s cubic-bezier(0.175, 0.885, 0.32, 1.275)' 
                }}>
                    ✨ VEHICLE REGISTERED SUCCESSFULLY!
                </div>
            )}

            <div style={{ padding: '80px 50px' }}>
                <h1 style={{ textAlign: 'center', marginBottom: '60px', fontWeight: '900', fontSize: '3rem', letterSpacing: '-1.5px' }}>
                    Admin <span style={{color: accentColor}}>Control Panel</span>
                </h1>

                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '30px', marginBottom: '60px' }}>
                    {[
                        { label: 'Total Inventory', val: adminVehicles.length, sub: 'Live stock', col: accentColor },
                        { label: 'Pending Bookings', val: reservations.filter(r => r.status === 'Pending').length, sub: 'Urgent Action', col: '#ffcc00' },
                        { label: 'Confirmed Bookings', val: reservations.filter(r => r.status === 'Approved').length, sub: 'Approved rides', col: accentColor }
                    ].map((stat, i) => (
                        <div key={i} style={glassStyle} className="stat-card">
                            <p style={{ opacity: 0.5, fontSize: '0.8rem', textTransform: 'uppercase', fontWeight: 'bold', letterSpacing: '1px' }}>{stat.label}</p>
                            <h2 style={{ color: stat.col, fontSize: '3rem', margin: '15px 0', fontWeight: '900' }}>{stat.val}</h2>
                            <span style={{ fontSize: '0.75rem', color: stat.col, opacity: 0.8 }}>{stat.sub}</span>
                        </div>
                    ))}
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 2.2fr', gap: '40px' }}>
                    {/* REGISTER FORM */}
                    <div style={glassStyle}>
                        <h3 style={{ color: accentColor, marginBottom: '35px', fontSize: '1.6rem', fontWeight: '800' }}>Register New Ride</h3>
                        <form onSubmit={handleAddVehicle} style={{ display: 'flex', flexDirection: 'column', gap: '22px' }}>
                            <input 
                                type="text" placeholder="Vehicle Model Name" required style={inputStyle}
                                value={newVehicle.name} onChange={(e) => setNewVehicle({...newVehicle, name: e.target.value})}
                            />
                            <select 
                                value={newVehicle.type} onChange={(e) => setNewVehicle({...newVehicle, type: e.target.value})}
                                style={inputStyle}
                            >
                                <option value="Car" style={{background: '#071618'}}>Car</option>
                                <option value="Van" style={{background: '#071618'}}>Van</option>
                                <option value="Bike" style={{background: '#071618'}}>Bike</option>
                            </select>
                            <input 
                                type="number" placeholder="Daily Rental Rate (LKR)" required style={inputStyle}
                                value={newVehicle.price} onChange={(e) => setNewVehicle({...newVehicle, price: e.target.value})}
                            />
                            <input 
                                type="text" placeholder="Image URL (Link)" required style={inputStyle}
                                value={newVehicle.img} onChange={(e) => setNewVehicle({...newVehicle, img: e.target.value})}
                            />
                            <button type="submit" className="register-btn">REGISTER VEHICLE</button>
                        </form>
                    </div>

                    {/* INVENTORY LIST */}
                    <div style={glassStyle}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '40px' }}>
                            <h3 style={{ color: accentColor, fontSize: '1.6rem', fontWeight: '800' }}>System Inventory</h3>
                            <input 
                                type="text" placeholder="Search rides..." value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                style={{ padding: '12px 25px', borderRadius: '30px', border: '1px solid rgba(255,255,255,0.1)', background: 'rgba(255,255,255,0.05)', color: 'white', outline: 'none', width: '250px' }}
                            />
                        </div>
                        <div style={{ overflowX: 'auto' }}>
                            <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                                <thead>
                                    <tr style={{ textAlign: 'left', borderBottom: '2px solid rgba(255,255,255,0.05)', opacity: 0.4, fontSize: '0.8rem', fontWeight: '900' }}>
                                        <th style={{ padding: '20px' }}>VEHICLE</th>
                                        <th style={{ padding: '20px' }}>CATEGORY</th>
                                        <th style={{ padding: '20px' }}>DAILY RATE</th>
                                        <th style={{ padding: '20px' }}>ACTIONS</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {filteredVehicles.map(v => (
                                        <tr key={v._id} className="inventory-row">
                                            <td style={{ padding: '20px', fontWeight: '700' }}>{v.name}</td>
                                            <td style={{ padding: '20px' }}><span style={{ background: 'rgba(255,255,255,0.08)', padding: '6px 14px', borderRadius: '12px', fontSize: '0.75rem', fontWeight: '800' }}>{v.type.toUpperCase()}</span></td>
                                            <td style={{ padding: '20px', color: accentColor, fontWeight: '900' }}>LKR {v.price}</td>
                                            <td style={{ padding: '20px', display: 'flex', gap: '10px' }}>
                                                <button onClick={() => handleEditVehicle(v._id, v.name, v.price)} className="row-btn edit">EDIT</button>
                                                {/* 👈 පියවර 2: DELETE බොත්තමට Function එක සම්බන්ධ කළා */}
                                                <button onClick={() => handleDeleteVehicle(v._id)} className="row-btn delete">DELETE</button>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>

                {/* CUSTOMER RESERVATIONS */}
                <div style={{ ...glassStyle, marginTop: '40px' }}>
                    <h3 style={{ color: accentColor, marginBottom: '30px', fontSize: '1.6rem', fontWeight: '800' }}>Customer Reservations</h3>
                    {isLoading ? (
                        <div style={{ textAlign: 'center', padding: '50px' }}>
                            <div className="spinner"></div><p style={{ marginTop: '15px', opacity: 0.5 }}>Loading Data...</p>
                        </div>
                    ) : (
                        <div style={{ overflowX: 'auto' }}>
                            <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                                <thead>
                                    <tr style={{ textAlign: 'left', borderBottom: '2px solid rgba(255,255,255,0.05)', opacity: 0.4, fontSize: '0.8rem', fontWeight: '900' }}>
                                        <th style={{ padding: '20px' }}>CUSTOMER</th>
                                        <th style={{ padding: '20px' }}>PHONE</th>
                                        <th style={{ padding: '20px' }}>VEHICLE</th>
                                        <th style={{ padding: '20px' }}>DATE & TIME</th>
                                        <th style={{ padding: '20px' }}>STATUS</th>
                                        <th style={{ padding: '20px' }}>ACTIONS</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {reservations.map((res) => (
                                        <tr key={res._id} className="inventory-row">
                                            <td style={{ padding: '20px' }}>{res.userEmail.split('@')[0]}</td>
                                            <td style={{ padding: '20px', color: accentColor }}>{res.phone}</td>
                                            <td style={{ padding: '20px', fontWeight: '700' }}>{res.vehicleName}</td>
                                            <td style={{ padding: '20px' }}>{res.pickupDate} | {res.pickupTime}</td>
                                            <td style={{ padding: '20px' }}>
                                                <span style={{ 
                                                    background: res.status === 'Pending' ? 'rgba(255, 204, 0, 0.1)' : 'rgba(0, 209, 178, 0.1)', 
                                                    color: res.status === 'Pending' ? '#ffcc00' : '#00d1b2', 
                                                    padding: '6px 12px', borderRadius: '10px', fontSize: '0.75rem', fontWeight: '800', 
                                                    border: `1px solid ${res.status === 'Pending' ? 'rgba(255, 204, 0, 0.3)' : 'rgba(0, 209, 178, 0.3)'}` 
                                                }}>{res.status.toUpperCase()}</span>
                                            </td>
                                            <td style={{ padding: '20px', display: 'flex', gap: '10px' }}>
                                                <button onClick={() => updateStatus(res._id, 'Approved')} className="row-btn edit" style={{ background: 'rgba(0, 209, 178, 0.2)' }}>APPROVE</button>
                                                <button onClick={() => updateStatus(res._id, 'Rejected')} className="row-btn delete">REJECT</button>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    )}
                </div>
            </div>
            <Footer />
            <style>{`
                @keyframes spin { 0% { transform: rotate(0deg); } 100% { transform: rotate(360deg); } }
                .spinner { width: 40px; height: 40px; border: 4px solid rgba(0, 209, 178, 0.1); border-top: 4px solid #00d1b2; border-radius: 50%; margin: 0 auto; animation: spin 1s linear infinite; }
                .stat-card:hover { transform: translateY(-10px); box-shadow: 0 30px 60px rgba(0, 209, 178, 0.2); }
                .register-btn { background: linear-gradient(135deg, #00d1b2 0%, #00b89c 100%); color: #071618; padding: 20px; border-radius: 18px; border: none; font-weight: 900; font-size: 1.1rem; cursor: pointer; margin-top: 15px; box-shadow: 0 10px 30px rgba(0, 209, 178, 0.4); transition: 0.4s ease; }
                .register-btn:hover { transform: scale(1.03); box-shadow: 0 15px 40px rgba(0, 209, 178, 0.6); }
                .inventory-row:hover { background: rgba(255,255,255,0.03); }
                .row-btn { padding: 10px 20px; border-radius: 12px; cursor: pointer; font-size: 0.8rem; font-weight: 800; transition: 0.3s; border: 1px solid transparent; }
                .row-btn.edit { background: rgba(0, 209, 178, 0.1); color: #00d1b2; border-color: rgba(0, 209, 178, 0.3); }
                .row-btn.edit:hover { background: #00d1b2; color: #071618; }
                .row-btn.delete { background: rgba(255, 68, 68, 0.1); color: #ff4444; border-color: rgba(255, 68, 68, 0.3); }
                .row-btn.delete:hover { background: #ff4444; color: white; }
            `}</style>
        </div>
    );
}

export default AdminDashboard;