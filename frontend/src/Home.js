import React, { useState } from 'react';

function Home() {
  const userName = localStorage.getItem("userName") || "Guest";
  const [category, setCategory] = useState("All");

  // 27 Vehicles (9 Cars, 9 Vans, 9 Bikes) with working High-Quality Images
  const vehicles = [
    // --- 9 CARS ---
    { id: 1, name: "Suzuki Alto", type: "Car", price: "8,500", fuel: "Petrol", location: "Panadura", kmLimit: "100 KM", img: "https://images.pexels.com/photos/3752169/pexels-photo-3752169.jpeg?auto=compress&cs=tinysrgb&w=400" },
    { id: 2, name: "Suzuki Wagon-R", type: "Car", price: "9,500", fuel: "Hybrid", location: "Nugegoda", kmLimit: "100 KM", img: "https://images.pexels.com/photos/3311574/pexels-photo-3311574.jpeg?auto=compress&cs=tinysrgb&w=400" },
    { id: 3, name: "Toyota Premio", type: "Car", price: "18,000", fuel: "Petrol", location: "Colombo", kmLimit: "100 KM", img: "https://images.pexels.com/photos/170811/pexels-photo-170811.jpeg?auto=compress&cs=tinysrgb&w=400" },
    { id: 4, name: "Toyota Allion", type: "Car", price: "17,500", fuel: "Petrol", location: "Galle", kmLimit: "100 KM", img: "https://images.pexels.com/photos/210019/pexels-photo-210019.jpeg?auto=compress&cs=tinysrgb&w=400" },
    { id: 5, name: "Toyota Grace", type: "Car", price: "15,500", fuel: "Hybrid", location: "Matara", kmLimit: "100 KM", img: "https://images.pexels.com/photos/116675/pexels-photo-116675.jpeg?auto=compress&cs=tinysrgb&w=400" },
    { id: 6, name: "Toyota Aqua", type: "Car", price: "12,500", fuel: "Hybrid", location: "Kandy", kmLimit: "100 KM", img: "https://images.pexels.com/photos/386110/pexels-photo-386110.jpeg?auto=compress&cs=tinysrgb&w=400" },
    { id: 7, name: "Toyota Vitz", type: "Car", price: "11,000", fuel: "Petrol", location: "Negombo", kmLimit: "100 KM", img: "https://images.pexels.com/photos/707046/pexels-photo-707046.jpeg?auto=compress&cs=tinysrgb&w=400" },
    { id: 8, name: "Suzuki Every", type: "Car", price: "8,000", fuel: "Petrol", location: "Kurunegala", kmLimit: "100 KM", img: "https://images.pexels.com/photos/1035108/pexels-photo-1035108.jpeg?auto=compress&cs=tinysrgb&w=400" },
    { id: 9, name: "Toyota Axio", type: "Car", price: "16,000", fuel: "Hybrid", location: "Kalutara", kmLimit: "100 KM", img: "https://images.pexels.com/photos/1149137/pexels-photo-1149137.jpeg?auto=compress&cs=tinysrgb&w=400" },

    // --- 9 VANS ---
    { id: 10, name: "Toyota Hiace KDH", type: "Van", price: "25,000", fuel: "Diesel", location: "Colombo", kmLimit: "200 KM", img: "https://images.pexels.com/photos/45853/van-vehicle-delivery-white-45853.jpeg?auto=compress&cs=tinysrgb&w=400" },
    { id: 11, name: "Nissan Caravan", type: "Van", price: "22,000", fuel: "Diesel", location: "Negombo", kmLimit: "200 KM", img: "https://images.pexels.com/photos/1105666/pexels-photo-1105666.jpeg?auto=compress&cs=tinysrgb&w=400" },
    { id: 12, name: "Toyota Dolphin", type: "Van", price: "15,000", fuel: "Diesel", location: "Panadura", kmLimit: "200 KM", img: "https://images.pexels.com/photos/1519192/pexels-photo-1519192.jpeg?auto=compress&cs=tinysrgb&w=400" },
    { id: 13, name: "Toyota Liteace", type: "Van", price: "12,000", fuel: "Petrol", location: "Galle", kmLimit: "150 KM", img: "https://images.pexels.com/photos/4489749/pexels-photo-4489749.jpeg?auto=compress&cs=tinysrgb&w=400" },
    { id: 14, name: "Mazda Bongo", type: "Van", price: "11,500", fuel: "Diesel", location: "Matara", kmLimit: "150 KM", img: "https://images.pexels.com/photos/1637859/pexels-photo-1637859.jpeg?auto=compress&cs=tinysrgb&w=400" },
    { id: 15, name: "Nissan Serena", type: "Van", price: "20,000", fuel: "Hybrid", location: "Colombo", kmLimit: "200 KM", img: "https://images.pexels.com/photos/6301929/pexels-photo-6301929.jpeg?auto=compress&cs=tinysrgb&w=400" },
    { id: 16, name: "Toyota Noah", type: "Van", price: "24,000", fuel: "Hybrid", location: "Kandy", kmLimit: "200 KM", img: "https://images.pexels.com/photos/1545743/pexels-photo-1545743.jpeg?auto=compress&cs=tinysrgb&w=400" },
    { id: 17, name: "Mitsubishi L300", type: "Van", price: "13,000", fuel: "Diesel", location: "Gampaha", kmLimit: "150 KM", img: "https://images.pexels.com/photos/2526128/pexels-photo-2526128.jpeg?auto=compress&cs=tinysrgb&w=400" },
    { id: 18, name: "Micro Tourer", type: "Van", price: "19,000", fuel: "Diesel", location: "Kurunegala", kmLimit: "150 KM", img: "https://images.pexels.com/photos/2834653/pexels-photo-2834653.jpeg?auto=compress&cs=tinysrgb&w=400" },

    // --- 9 BIKES ---
    { id: 19, name: "Yamaha MT-15", type: "Bike", price: "6,500", fuel: "Petrol", location: "Matara", kmLimit: "Unlimited", img: "https://images.pexels.com/photos/2116491/pexels-photo-2116491.jpeg?auto=compress&cs=tinysrgb&w=400" },
    { id: 20, name: "Honda Hornet", type: "Bike", price: "5,500", fuel: "Petrol", location: "Colombo", kmLimit: "Unlimited", img: "https://images.pexels.com/photos/2626661/pexels-photo-2626661.jpeg?auto=compress&cs=tinysrgb&w=400" },
    { id: 21, name: "Honda PCX 160", type: "Bike", price: "4,500", fuel: "Petrol", location: "Kalutara", kmLimit: "Unlimited", img: "https://images.pexels.com/photos/15964861/pexels-photo-15964861/free-photo-of-blue-honda-scooter-parked-in-front-of-a-white-wall.jpeg?auto=compress&cs=tinysrgb&w=400" },
    { id: 22, name: "Yamaha FZ V3", type: "Bike", price: "5,000", fuel: "Petrol", location: "Panadura", kmLimit: "Unlimited", img: "https://images.pexels.com/photos/1413412/pexels-photo-1413412.jpeg?auto=compress&cs=tinysrgb&w=400" },
    { id: 23, name: "Honda Dio", type: "Bike", price: "3,500", fuel: "Petrol", location: "Colombo", kmLimit: "Unlimited", img: "https://images.pexels.com/photos/19156093/pexels-photo-19156093/free-photo-of-man-driving-a-motorcycle-on-the-street.jpeg?auto=compress&cs=tinysrgb&w=400" },
    { id: 24, name: "Yamaha RayZR", type: "Bike", price: "3,800", fuel: "Petrol", location: "Galle", kmLimit: "Unlimited", img: "https://images.pexels.com/photos/19871148/pexels-photo-19871148/free-photo-of-scooter-parked-on-sidewalk.jpeg?auto=compress&cs=tinysrgb&w=400" },
    { id: 25, name: "Bajaj Pulsar NS200", type: "Bike", price: "6,000", fuel: "Petrol", location: "Negombo", kmLimit: "Unlimited", img: "https://images.pexels.com/photos/1477430/pexels-photo-1477430.jpeg?auto=compress&cs=tinysrgb&w=400" },
    { id: 26, name: "TVS Apache RTR", type: "Bike", price: "5,200", fuel: "Petrol", location: "Kandy", kmLimit: "Unlimited", img: "https://images.pexels.com/photos/2445530/pexels-photo-2445530.jpeg?auto=compress&cs=tinysrgb&w=400" },
    { id: 27, name: "Suzuki Gixxer", type: "Bike", price: "5,800", fuel: "Petrol", location: "Colombo", kmLimit: "Unlimited", img: "https://images.pexels.com/photos/5431666/pexels-photo-5431666.jpeg?auto=compress&cs=tinysrgb&w=400" }
  ];

  const filteredVehicles = category === "All" ? vehicles : vehicles.filter(v => v.type === category);

  const handleLogout = () => {
    localStorage.removeItem("userName");
    window.location.href = "/";
  };

  return (
    <div style={{ backgroundColor: '#0b2225', minHeight: '100vh', color: 'white', fontFamily: 'Poppins, sans-serif' }}>
      
      {/* Navbar with Glassmorphism */}
      <nav style={{ 
        display: 'flex', justifyContent: 'space-between', alignItems: 'center', 
        padding: '20px 40px', background: 'rgba(255, 255, 255, 0.05)', 
        backdropFilter: 'blur(20px)', borderBottom: '1px solid rgba(255, 255, 255, 0.1)',
        position: 'sticky', top: 0, zIndex: 1000
      }}>
        <h2 style={{ color: '#00ffcc', margin: 0, letterSpacing: '1px' }}>MR RIDE</h2>
        <div>
          <span style={{ marginRight: '20px' }}>Welcome, <strong style={{color: '#00ffcc'}}>{userName}</strong></span>
          <button onClick={handleLogout} style={{ 
            background: 'transparent', color: 'white', border: '1px solid #00ffcc', 
            padding: '8px 20px', borderRadius: '20px', cursor: 'pointer' 
          }}>Logout</button>
        </div>
      </nav>

      {/* Hero/Filter Section */}
      <div style={{ textAlign: 'center', padding: '60px 20px' }}>
        <h1 style={{ fontSize: '3rem', fontWeight: '800' }}>Find Your Perfect Ride</h1>
        <div style={{ marginTop: '30px', display: 'flex', justifyContent: 'center', gap: '15px', flexWrap: 'wrap' }}>
          {["All", "Car", "Bike", "Van"].map(cat => (
            <button key={cat} onClick={() => setCategory(cat)} style={{ 
              padding: '12px 35px', borderRadius: '35px', border: 'none', 
              backgroundColor: category === cat ? '#00ffcc' : 'rgba(255, 255, 255, 0.1)',
              color: category === cat ? '#0b2225' : 'white', cursor: 'pointer', fontWeight: 'bold',
              transition: '0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275)'
            }}>
              {cat === "All" ? "All Rides" : cat + "s"}
            </button>
          ))}
        </div>
      </div>

      {/* Vehicle Grid - Modern Layout */}
      <div style={{ 
        display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', 
        gap: '40px', padding: '0 40px 80px' 
      }}>
        {filteredVehicles.map(vehicle => (
          <div key={vehicle.id} style={{ 
            background: 'rgba(255, 255, 255, 0.03)', borderRadius: '25px', 
            overflow: 'hidden', border: '1px solid rgba(255, 255, 255, 0.08)', 
            backdropFilter: 'blur(15px)', transition: '0.4s ease-in-out',
            boxShadow: '0 10px 30px rgba(0,0,0,0.2)'
          }}>
            <div style={{ position: 'relative' }}>
              <img src={vehicle.img} alt={vehicle.name} style={{ width: '100%', height: '220px', objectFit: 'cover' }} 
                   onError={(e) => {e.target.src="https://via.placeholder.com/400x220?text=Vehicle+Image"}} />
              <div style={{ 
                position: 'absolute', bottom: '15px', right: '15px', 
                background: '#ff6600', padding: '5px 15px', borderRadius: '8px', fontWeight: 'bold', fontSize: '12px',
                boxShadow: '0 4px 10px rgba(0,0,0,0.3)'
              }}>
                {vehicle.kmLimit}
              </div>
            </div>

            <div style={{ padding: '25px' }}>
              <h3 style={{ margin: '0 0 8px 0', fontSize: '1.6rem' }}>{vehicle.name}</h3>
              <p style={{ fontSize: '14px', color: 'rgba(255,255,255,0.5)', marginBottom: '20px' }}>
                ⛽ {vehicle.fuel} • 📍 {vehicle.location}
              </p>
              
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderTop: '1px solid rgba(255,255,255,0.1)', paddingTop: '20px' }}>
                <div>
                   <span style={{ fontSize: '12px', color: 'rgba(255,255,255,0.4)', display: 'block' }}>Starting from</span>
                   <span style={{ fontSize: '1.5rem', fontWeight: '800', color: '#00ffcc' }}>LKR {vehicle.price}</span>
                </div>
                <button style={{ 
                  backgroundColor: '#00ffcc', color: '#0b2225', border: 'none', 
                  padding: '12px 25px', borderRadius: '15px', fontWeight: '800', cursor: 'pointer',
                  boxShadow: '0 5px 15px rgba(0, 255, 204, 0.3)'
                }}>BOOK NOW</button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Home;