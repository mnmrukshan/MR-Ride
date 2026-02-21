import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom'; // 👈 useLocation and useNavigate added
import myLogo from './logo2.png';
import Footer from './Footer';

function Home() {
  const location = useLocation(); // 👈 To identify the current page
  const navigate = useNavigate(); // 👈 For professional navigation
  const userName = localStorage.getItem("userName") || "Guest";
  const [category, setCategory] = useState("All");
  const [searchTerm, setSearchTerm] = useState("");
  const [maxPrice, setMaxPrice] = useState(30000);

  // --- NEW STATES FOR BOOKING MODAL ---
  const [selectedVehicle, setSelectedVehicle] = useState(null);
  const [bookingDate, setBookingDate] = useState("");
  const [bookingTime, setBookingTime] = useState("");

  const accentColor = "#00d1b2";
  
  // Professional Nav Style logic
  const getNavLinkStyle = (path) => ({
    background: 'none',
    border: 'none',
    borderBottom: location.pathname === path ? `2px solid ${accentColor}` : 'none', // 👈 Active underline
    color: location.pathname === path ? accentColor : 'white', // 👈 Active color
    cursor: 'pointer',
    fontWeight: 'bold',
    fontSize: '1rem',
    paddingBottom: '5px',
    transition: '0.3s',
    marginLeft: '20px'
  });

  const logoutButtonStyle = {
    background: 'rgba(255, 255, 255, 0.05)',
    color: 'white',
    border: '1px solid rgba(255, 255, 255, 0.2)',
    padding: '8px 20px',
    borderRadius: '30px',
    cursor: 'pointer',
    transition: 'all 0.3s ease',
    outline: 'none'
  };

  const vehicles = [
    // --- 9 CARS ---
    { id: 1, name: "Suzuki Alto", type: "Car", price: 8500, fuel: "Petrol", location: "Panadura", kmLimit: "100 KM", img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRpwTprI6Gk3lkY_RX-1-qig6A6O948klQIxQ&s" },
    { id: 2, name: "Suzuki Wagon-R", type: "Car", price: 9500, fuel: "Hybrid", location: "Nugegoda", kmLimit: "100 KM", img: "https://i.redd.it/2a8a1kk52klc1.jpeg" },
    { id: 3, name: "Toyota Premio", type: "Car", price: 18000, fuel: "Petrol", location: "Colombo", kmLimit: "100 KM", img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRCGP51J1PM9zB2XpY1nVfQ_LLPBxfa-PcyOA&s" },
    { id: 4, name: "Toyota Allion", type: "Car", price: 17500, fuel: "Petrol", location: "Galle", kmLimit: "100 KM", img: "https://i.ytimg.com/vi/dWGiWZnBzhQ/hq720.jpg?sqp=-oaymwEhCK4FEIIDSFryq4qpAxMIARUAAAAAGAElAADIQj0AgKJD&rs=AOn4CLDOuOhBP6cQZ9aUh25uKYFz3WHTdw" },
    { id: 5, name: "Toyota Grace", type: "Car", price: 15500, fuel: "Hybrid", location: "Matara", kmLimit: "100 KM", img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTWm7MTWu7AEbnZ5uvrpCmY6Ex620v52dTA0Q&s" },
    { id: 6, name: "Toyota Aqua", type: "Car", price: 12500, fuel: "Hybrid", location: "Kandy", kmLimit: "100 KM", img: "https://auto-lanka.com/img.web/UserImage/230223113812/image_e63ed3012ce27027a8ae52bd3c8216d337e356d13e9d395c42e335cfe6cbafae.jpg" },
    { id: 7, name: "Toyota Vitz", type: "Car", price: 11000, fuel: "Petrol", location: "Negombo", kmLimit: "100 KM", img: "https://motorguide-store.s3.ap-southeast-1.amazonaws.com/ikman/vitz_featured_18e366fde8.jpg" },
    { id: 8, name: "Suzuki Every", type: "Car", price: 8000, fuel: "Petrol", location: "Kurunegala", kmLimit: "100 KM", img: "https://www.ccarprice.com/products/Suzuki_Every_2025.jpg" },
    { id: 9, name: "Toyota Axio", type: "Car", price: 16000, fuel: "Hybrid", location: "Kalutara", kmLimit: "100 KM", img: "https://img.indianautosblog.com/2021/06/08/2018-toyota-corolla-axio-wxb-front-three-quarters-0cd8.jpg" },

    // --- 9 VANS ---
    { id: 10, name: "Toyota Hiace KDH", type: "Van", price: 25000, fuel: "Diesel", location: "Colombo", kmLimit: "200 KM", img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQr33rsnRuBY8l2rkjhyCEsYxH_jdnH0IXR-Q&s" },
    { id: 11, name: "Nissan Caravan", type: "Van", price: 22000, fuel: "Diesel", location: "Negombo", kmLimit: "200 KM", img: "https://wieck-nissanao-production.s3.amazonaws.com/photos/28e9752d3e4ce1a6b33897742fff1d72a38bcd03/preview-768x432.jpg" },
    { id: 12, name: "Toyota Dolphin", type: "Van", price: 15000, fuel: "Diesel", location: "Panadura", kmLimit: "200 KM", img: "https://image-cdn.beforward.jp/large/201704/743397/BF620392_67e103.jpg" },
    { id: 13, name: "Toyota Liteace", type: "Van", price: 12000, fuel: "Petrol", location: "Galle", kmLimit: "150 KM", img: "https://upload.wikimedia.org/wikipedia/commons/thumb/6/66/1989_Toyota_LiteAce_%28YM30%29_van_%2823309737442%29.jpg/330px-1989_Toyota_LiteAce_%28YM30%29_van_%2823309737442%29.jpg" },
    { id: 14, name: "Mazda Bongo", type: "Van", price: 11500, fuel: "Diesel", location: "Matara", kmLimit: "150 KM", img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR65E9wTdMdJEyaix95Jxa8YEKb4ahzY8xRiw&s" },
    { id: 15, name: "Nissan Serena", type: "Van", price: 20000, fuel: "Hybrid", location: "Colombo", kmLimit: "200 KM", img: "https://upload.wikimedia.org/wikipedia/commons/thumb/0/06/Nissan_Serena_C28_e-Power_Highway_Star_V.jpg/330px-Nissan_Serena_C28_e-Power_Highway_Star_V.jpg" },
    { id: 16, name: "Toyota Noah", type: "Van", price: 24000, fuel: "Hybrid", location: "Kandy", kmLimit: "200 KM", img: "https://global.toyota/pages/news/images/2022/01/13/1330/003.jpg" },
    { id: 17, name: "Mitsubishi L300", type: "Van", price: 13000, fuel: "Diesel", location: "Gampaha", kmLimit: "150 KM", img: "https://upload.wikimedia.org/wikipedia/commons/9/9d/Mitsubishi_L300_front_20081009.jpg" },
    { id: 18, name: "Micro Tourer", type: "Van", price: 19000, fuel: "Diesel", location: "Kurunegala", kmLimit: "150 KM", img: "https://www.vanhiresrilanka.com/images-vanhire/bus_for_hire/16seater/16seater_Micro_mini_bus.jpg" },

    // --- 9 BIKES ---
    { id: 19, name: "Yamaha MT-15", type: "Bike", price: 6500, fuel: "Petrol", location: "Matara", kmLimit: "Unlimited", img: "https://images.unsplash.com/photo-1695013147209-1516a20f0cdd?fm=jpg&q=60&w=3000&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8eWFtYWhhJTIwbXQxNXxlbnwwfHwwfHx8MA%3D%3D" },
    { id: 20, name: "Honda Hornet", type: "Bike", price: 5500, fuel: "Petrol", location: "Colombo", kmLimit: "Unlimited", img: "https://global.honda/content/dam/site/global-en/newsroom-new/cq_img/worldnews/1998/2980210b/01.jpg" },
    { id: 21, name: "Honda PCX 160", type: "Bike", price: 4500, fuel: "Petrol", location: "Kalutara", kmLimit: "Unlimited", img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSiFrSelPuccPwXoh4WcGZU9Q6o4vjZIOS-sw&s" },
    { id: 22, name: "Yamaha FZ V3", type: "Bike", price: 5000, fuel: "Petrol", location: "Panadura", kmLimit: "Unlimited", img: "https://cdn.bikedekho.com/processedimages/yamaha/fzs-fi-v3-bs6/source/fzs-fi-v3-bs6691c6c9113353.jpg?imwidth=412&impolicy=resize" },
    { id: 23, name: "Honda Dio", type: "Bike", price: 3500, fuel: "Petrol", location: "Colombo", kmLimit: "Unlimited", img: "https://ic4.maxabout.us/tr:w-250/autos/tw_india//N/2020/5/new-honda-dio-110-in-mat-axis-grey-metallic.jpg" },
    { id: 24, name: "Yamaha RayZR", type: "Bike", price: 3800, fuel: "Petrol", location: "Galle", kmLimit: "Unlimited", img: "https://cdn.bikedekho.com/processedimages/yamaha/ray-zr-125/source/ray-zr-12568a8198d15c01.jpg?imwidth=412&impolicy=resize" },
    { id: 25, name: "Bajaj Pulsar NS200", type: "Bike", price: 6000, fuel: "Petrol", location: "Negombo", kmLimit: "Unlimited", img: "https://cdn.bikedekho.com/processedimages/bajaj/pulsar-n160/640X309/pulsar-n16068d236047cb91.jpg" },
    { id: 26, name: "TVS Apache RTR", type: "Bike", price: 5200, fuel: "Petrol", location: "Kandy", kmLimit: "Unlimited", img: "https://fasterwheeler.com/product_images/jpeg/tvs-apache-rtr-160-4v-2025.jpg" },
    { id: 27, name: "Suzuki Gixxer", type: "Bike", price: 5800, fuel: "Petrol", location: "Colombo", kmLimit: "Unlimited", img: "https://fasterwheeler.com/product_images/webp/suzuki-gixxer-2026-final.webp" }
  ];

  const filteredVehicles = vehicles.filter(v =>
    (category === "All" || v.type === category) &&
    (v.name.toLowerCase().includes(searchTerm.toLowerCase())) &&
    (v.price <= maxPrice)
  );

  const handleLogout = () => {
    localStorage.removeItem("userName");
    window.location.href = "/";
  };

  const handleBookingSubmit = async (e) => {
    e.preventDefault();

    const bookingData = {
      userEmail: userName,
      vehicleName: selectedVehicle.name,
      pickupDate: bookingDate,
      pickupTime: bookingTime
    };

    try {
      const response = await fetch('http://localhost:5000/api/book', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(bookingData),
      });

      if (response.ok) {
        alert(`Successfully Reserved: ${selectedVehicle.name} for ${bookingDate}`);
        setSelectedVehicle(null);
        setBookingDate("");
        setBookingTime("");
      } else {
        alert("Booking failed! Please try again.");
      }
    } catch (error) {
      alert("Server error! Make sure your backend is running on port 5000.");
    }
  };

  return (
    <div style={{ backgroundColor: '#071618', minHeight: '100vh', color: 'white', fontFamily: 'Poppins, sans-serif' }}>
     
      {/* Navbar Section */}
      <nav style={{
        display: 'flex', justifyContent: 'space-between', alignItems: 'center',
        padding: '15px 40px', background: 'rgba(255, 255, 255, 0.03)',
        backdropFilter: 'blur(15px)', borderBottom: '1px solid rgba(255, 255, 255, 0.1)',
        position: 'sticky', top: 0, zIndex: 1000, boxShadow: '0 4px 30px rgba(0, 0, 0, 0.5)'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
          <img src={myLogo} alt="Logo" style={{ height: '45px', width: 'auto' }} />
          <h2 style={{ color: accentColor, margin: 0, letterSpacing: '2px', fontWeight: '800' }}>MR RIDE</h2>
          
          {/* Professional Navigation Buttons with Active State */}
          <div style={{ display: 'flex', gap: '20px', marginLeft: '30px' }}>
            <button 
                onClick={() => navigate("/home")} 
                style={getNavLinkStyle("/home")}
            >Home</button>
            <button 
                onClick={() => navigate("/my-bookings")} 
                style={getNavLinkStyle("/my-bookings")}
            >My Bookings</button>
            {userName === "mnmrukshan22" && (
    <button 
        onClick={() => navigate("/admin")} 
        style={getNavLinkStyle("/admin")}
    >Admin Panel</button>
  )}
          </div>
        </div>

        <div style={{ flex: 1, maxWidth: '400px', margin: '0 30px', position: 'relative', display: 'flex', alignItems: 'center' }}>
          <input
            type="text"
            placeholder="Search your favorite ride..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            style={{
              width: '100%', padding: '10px 45px 10px 20px', borderRadius: '25px', border: '1px solid rgba(255,255,255,0.2)',
              background: 'rgba(255,255,255,0.05)', color: 'white', outline: 'none'
            }}
          />
          {searchTerm && (
            <button
              onClick={() => setSearchTerm("")}
              style={{ position: 'absolute', right: '15px', background: 'transparent', border: 'none', color: 'rgba(255,255,255,0.5)', fontSize: '18px', cursor: 'pointer' }}
            >✕</button>
          )}
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: '12px',
            background: 'rgba(255, 255, 255, 0.05)',
            padding: '5px 15px 5px 8px',
            borderRadius: '20px',
            border: '1px solid rgba(255, 255, 255, 0.1)'
          }}>
            <div style={{ width: '32px', height: '32px', borderRadius: '50%', backgroundColor: accentColor, display: 'flex', justifyContent: 'center', alignItems: 'center', color: '#071618', fontWeight: 'bold', fontSize: '14px' }}>
              {userName.charAt(0).toUpperCase()}
            </div>
            <span style={{ fontSize: '0.9rem', color: 'rgba(255,255,255,0.7)' }}>
              Welcome, <strong style={{color: accentColor, fontSize: '1rem'}}>{userName}</strong>
            </span>
          </div>

          <button
            onClick={handleLogout}
            style={logoutButtonStyle}
            onMouseOver={(e) => {
              e.target.style.background = 'rgba(255, 255, 255, 0.15)';
              e.target.style.transform = 'scale(1.05)';
              e.target.style.boxShadow = '0 0 15px rgba(255, 255, 255, 0.1)';
            }}
            onMouseOut={(e) => {
              e.target.style.background = 'rgba(255, 255, 255, 0.05)';
              e.target.style.transform = 'scale(1)';
              e.target.style.boxShadow = 'none';
            }}
            onMouseDown={(e) => e.target.style.transform = 'scale(0.95)'}
            onMouseUp={(e) => e.target.style.transform = 'scale(1.05)'}
          >
            Logout
          </button>
        </div>
      </nav>

      {/* Hero Section */}
      <div style={{ textAlign: 'center', padding: '60px 20px' }}>
        <h1 style={{ fontSize: '3.5rem', fontWeight: '900', marginBottom: '10px' }}>Find Your <span style={{color: accentColor}}>Perfect Ride</span></h1>
       
        <div style={{ margin: '30px auto', maxWidth: '300px' }}>
          <p style={{ marginBottom: '10px', color: 'rgba(255,255,255,0.6)' }}>Max Price: <span style={{color: accentColor, fontWeight: 'bold'}}>LKR {maxPrice}</span></p>
          <input
            type="range" min="3000" max="30000" step="500"
            value={maxPrice} onChange={(e) => setMaxPrice(e.target.value)}
            style={{ width: '100%', accentColor: accentColor }}
          />
        </div>

        <div style={{ marginTop: '40px', display: 'flex', justifyContent: 'center', gap: '20px', flexWrap: 'wrap' }}>
          {["All", "Car", "Bike", "Van"].map(cat => (
            <button
              key={cat}
              onClick={() => setCategory(cat)}
              style={{
                padding: '12px 40px', borderRadius: '50px', border: '1px solid rgba(255,255,255,0.1)',
                backgroundColor: category === cat ? accentColor : 'rgba(255, 255, 255, 0.05)',
                color: category === cat ? '#071618' : 'white', cursor: 'pointer', fontWeight: 'bold',
                backdropFilter: 'blur(10px)', transition: 'all 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275)',
                transform: category === cat ? 'scale(1.15)' : 'scale(1)',
                boxShadow: category === cat ? `0 0 30px ${accentColor}88` : 'none'
              }}
              onMouseOver={(e) => { if(category !== cat) e.target.style.transform = 'translateY(-5px)'; }}
              onMouseOut={(e) => { if(category !== cat) e.target.style.transform = 'scale(1)'; }}
            >
              {cat === "All" ? "All Rides" : cat + "s"}
            </button>
          ))}
        </div>
      </div>

      {/* Grid Section */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '40px', padding: '0 60px 100px' }}>
        {filteredVehicles.map(vehicle => (
          <div key={vehicle.id} style={{ background: 'rgba(255, 255, 255, 0.02)', borderRadius: '30px', overflow: 'hidden', border: '1px solid rgba(255, 255, 255, 0.08)', backdropFilter: 'blur(20px)', transition: 'all 0.4s ease', cursor: 'pointer' }}
          onMouseOver={(e) => { e.currentTarget.style.transform = 'translateY(-15px)'; e.currentTarget.style.boxShadow = `0 20px 40px rgba(0, 209, 178, 0.2)`; }}
          onMouseOut={(e) => { e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.boxShadow = 'none'; }}
          >
            <div style={{ position: 'relative' }}>
              <img src={vehicle.img} alt={vehicle.name} style={{ width: '100%', height: '230px', objectFit: 'cover' }} />
              <div style={{ position: 'absolute', top: '15px', left: '15px', background: 'rgba(0, 209, 178, 0.15)', backdropFilter: 'blur(12px)', padding: '6px 14px', borderRadius: '12px', border: '1px solid rgba(0, 209, 178, 0.4)', fontSize: '0.75rem', fontWeight: 'bold', color: '#00d1b2', boxShadow: '0 4px 15px rgba(0, 0, 0, 0.4)', zIndex: 5 }}>
                ⚡ {vehicle.kmLimit}
              </div>
            </div>
            <div style={{ padding: '30px' }}>
              <h3 style={{ margin: '0 0 10px 0', fontSize: '1.5rem' }}>{vehicle.name}</h3>
              <p style={{ color: 'rgba(255,255,255,0.5)' }}>⛽ {vehicle.fuel} • 📍 {vehicle.location}</p>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '20px' }}>
                <span style={{ fontSize: '1.6rem', fontWeight: '900', color: accentColor }}>LKR {vehicle.price}</span>
                <button
                  onClick={() => setSelectedVehicle(vehicle)}
                  style={{ backgroundColor: 'rgba(0, 209, 178, 0.1)', color: accentColor, border: `1px solid ${accentColor}`, padding: '12px 25px', borderRadius: '15px', fontWeight: '900', backdropFilter: 'blur(5px)', cursor: 'pointer', transition: '0.3s' }}
                  onMouseOver={(e) => { e.target.style.backgroundColor = accentColor; e.target.style.color = '#071618'; e.target.style.boxShadow = `0 0 20px ${accentColor}66`; }}
                  onMouseOut={(e) => { e.target.style.backgroundColor = 'rgba(0, 209, 178, 0.1)'; e.target.style.color = accentColor; e.target.style.boxShadow = 'none'; }}
                >
                  BOOK NOW
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* --- ANIMATED BOOKING MODAL (DARK GLASS LOOK) --- */}
      {selectedVehicle && (
        <div style={{
          position: 'fixed', top: 0, left: 0, width: '100%', height: '100%',
          background: 'rgba(0,0,0,0.85)', backdropFilter: 'blur(15px)',
          display: 'flex', justifyContent: 'center', alignItems: 'center', zIndex: 2000,
          animation: 'fadeIn 0.3s ease-out'
        }}>
          <div style={{
            background: 'rgba(255, 255, 255, 0.03)', padding: '45px', borderRadius: '35px',
            border: '1px solid rgba(255, 255, 255, 0.12)', width: '90%', maxWidth: '460px',
            textAlign: 'center', boxShadow: '0 30px 70px rgba(0,0,0,0.7)',
            animation: 'slideUp 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275)'
          }}>
            <h2 style={{ color: accentColor, marginBottom: '8px', textTransform: 'uppercase', letterSpacing: '2.5px', fontWeight: '900' }}>Reserve Ride</h2>
            <p style={{ opacity: 0.5, marginBottom: '35px', fontSize: '0.95rem' }}>Selected: <strong style={{color: 'white'}}>{selectedVehicle.name}</strong></p>
           
            <form onSubmit={handleBookingSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '22px' }}>
              <div style={{ textAlign: 'left' }}>
                <label style={{ fontSize: '0.8rem', opacity: 0.7, marginBottom: '8px', display: 'block', color: accentColor, fontWeight: 'bold' }}>Pickup Date</label>
                <input
                  type="date" required value={bookingDate} onChange={(e) => setBookingDate(e.target.value)}
                  style={{
                    width: '100%', padding: '16px', background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.1)',
                    borderRadius: '16px', color: 'white', outline: 'none', transition: '0.3s',
                    colorScheme: 'dark', accentColor: accentColor
                  }}
                  onFocus={(e) => e.target.style.borderColor = accentColor} onBlur={(e) => e.target.style.borderColor = 'rgba(255,255,255,0.1)'}
                />
              </div>
              <div style={{ textAlign: 'left' }}>
                <label style={{ fontSize: '0.8rem', opacity: 0.7, marginBottom: '8px', display: 'block', color: accentColor, fontWeight: 'bold' }}>Pickup Time</label>
                <input
                  type="time" required value={bookingTime} onChange={(e) => setBookingTime(e.target.value)}
                  style={{
                    width: '100%', padding: '16px', background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.1)',
                    borderRadius: '16px', color: 'white', outline: 'none', transition: '0.3s',
                    colorScheme: 'dark', accentColor: accentColor
                  }}
                  onFocus={(e) => e.target.style.borderColor = accentColor} onBlur={(e) => e.target.style.borderColor = 'rgba(255,255,255,0.1)'}
                />
              </div>
             
              <div style={{ display: 'flex', gap: '20px', marginTop: '15px' }}>
                <button
                  type="button"
                  onClick={() => setSelectedVehicle(null)}
                  style={{ flex: 1, padding: '15px', background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)', color: 'white', borderRadius: '18px', cursor: 'pointer', transition: '0.2s', fontWeight: 'bold' }}
                  onMouseDown={(e) => e.target.style.transform = 'scale(0.92)'} onMouseUp={(e) => e.target.style.transform = 'scale(1)'}
                >Cancel</button>
                <button
                  type="submit"
                  style={{ flex: 2, padding: '15px', background: accentColor, border: 'none', color: '#071618', fontWeight: '900', borderRadius: '18px', cursor: 'pointer', transition: '0.2s', boxShadow: `0 10px 25px ${accentColor}44` }}
                  onMouseDown={(e) => e.target.style.transform = 'scale(0.92)'} onMouseUp={(e) => e.target.style.transform = 'scale(1)'}
                >Confirm</button>
              </div>
            </form>
          </div>
          <style>{`
            @keyframes fadeIn { from { opacity: 0; } to { opacity: 1; } }
            @keyframes slideUp { from { transform: translateY(60px); opacity: 0; } to { transform: translateY(0); opacity: 1; } }
          `}</style>
        </div>
      )}

      <Footer />
    </div>
  );
}

export default Home;