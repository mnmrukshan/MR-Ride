import React, { useState } from 'react';
import myLogo from './logo.png'; 

function Home() {
  const userName = localStorage.getItem("userName") || "Guest";
  const [category, setCategory] = useState("All");

  // Soft Professional Emerald Accent
  const accentColor = "#00d1b2"; 

  const vehicles = [
    // --- Your existing 27 vehicle data stays here ---
    { id: 1, name: "Suzuki Alto", type: "Car", price: "8,500", fuel: "Petrol", location: "Panadura", kmLimit: "100 KM", img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRpwTprI6Gk3lkY_RX-1-qig6A6O948klQIxQ&s" },
    { id: 2, name: "Suzuki Wagon-R", type: "Car", price: "9,500", fuel: "Hybrid", location: "Nugegoda", kmLimit: "100 KM", img: "https://i.redd.it/2a8a1kk52klc1.jpeg" },
    { id: 3, name: "Toyota Premio", type: "Car", price: "18,000", fuel: "Petrol", location: "Colombo", kmLimit: "100 KM", img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRCGP51J1PM9zB2XpY1nVfQ_LLPBxfa-PcyOA&s" },
    { id: 4, name: "Toyota Allion", type: "Car", price: "17,500", fuel: "Petrol", location: "Galle", kmLimit: "100 KM", img: "https://i.ytimg.com/vi/dWGiWZnBzhQ/hq720.jpg?sqp=-oaymwEhCK4FEIIDSFryq4qpAxMIARUAAAAAGAElAADIQj0AgKJD&rs=AOn4CLDOuOhBP6cQZ9aUh25uKYFz3WHTdw" },
    { id: 5, name: "Toyota Grace", type: "Car", price: "15,500", fuel: "Hybrid", location: "Matara", kmLimit: "100 KM", img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTWm7MTWu7AEbnZ5uvrpCmY6Ex620v52dTA0Q&s" },
    { id: 6, name: "Toyota Aqua", type: "Car", price: "12,500", fuel: "Hybrid", location: "Kandy", kmLimit: "100 KM", img: "https://auto-lanka.com/img.web/UserImage/230223113812/image_e63ed3012ce27027a8ae52bd3c8216d337e356d13e9d395c42e335cfe6cbafae.jpg" },
    { id: 7, name: "Toyota Vitz", type: "Car", price: "11,000", fuel: "Petrol", location: "Negombo", kmLimit: "100 KM", img: "https://motorguide-store.s3.ap-southeast-1.amazonaws.com/ikman/vitz_featured_18e366fde8.jpg" },
    { id: 8, name: "Suzuki Every", type: "Car", price: "8,000", fuel: "Petrol", location: "Kurunegala", kmLimit: "100 KM", img: "https://www.ccarprice.com/products/Suzuki_Every_2025.jpg" },
    { id: 9, name: "Toyota Axio", type: "Car", price: "16,000", fuel: "Hybrid", location: "Kalutara", kmLimit: "100 KM", img: "https://img.indianautosblog.com/2021/06/08/2018-toyota-corolla-axio-wxb-front-three-quarters-0cd8.jpg" },
    { id: 10, name: "Toyota Hiace KDH", type: "Van", price: "25,000", fuel: "Diesel", location: "Colombo", kmLimit: "200 KM", img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQr33rsnRuBY8l2rkjhyCEsYxH_jdnH0IXR-Q&s" },
    { id: 11, name: "Nissan Caravan", type: "Van", price: "22,000", fuel: "Diesel", location: "Negombo", kmLimit: "200 KM", img: "https://wieck-nissanao-production.s3.amazonaws.com/photos/28e9752d3e4ce1a6b33897742fff1d72a38bcd03/preview-768x432.jpg" },
    { id: 12, name: "Toyota Dolphin", type: "Van", price: "15,000", fuel: "Diesel", location: "Panadura", kmLimit: "200 KM", img: "https://image-cdn.beforward.jp/large/201704/743397/BF620392_67e103.jpg" },
    { id: 13, name: "Toyota Liteace", type: "Van", price: "12,000", fuel: "Petrol", location: "Galle", kmLimit: "150 KM", img: "https://upload.wikimedia.org/wikipedia/commons/thumb/6/66/1989_Toyota_LiteAce_%28YM30%29_van_%2823309737442%29.jpg/330px-1989_Toyota_LiteAce_%28YM30%29_van_%2823309737442%29.jpg" },
    { id: 14, name: "Mazda Bongo", type: "Van", price: "11,500", fuel: "Diesel", location: "Matara", kmLimit: "150 KM", img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR65E9wTdMdJEyaix95Jxa8YEKb4ahzY8xRiw&s" },
    { id: 15, name: "Nissan Serena", type: "Van", price: "20,000", fuel: "Hybrid", location: "Colombo", kmLimit: "200 KM", img: "https://upload.wikimedia.org/wikipedia/commons/thumb/0/06/Nissan_Serena_C28_e-Power_Highway_Star_V.jpg/330px-Nissan_Serena_C28_e-Power_Highway_Star_V.jpg" },
    { id: 16, name: "Toyota Noah", type: "Van", price: "24,000", fuel: "Hybrid", location: "Kandy", kmLimit: "200 KM", img: "https://global.toyota/pages/news/images/2022/01/13/1330/003.jpg" },
    { id: 17, name: "Mitsubishi L300", type: "Van", price: "13,000", fuel: "Diesel", location: "Gampaha", kmLimit: "150 KM", img: "https://upload.wikimedia.org/wikipedia/commons/9/9d/Mitsubishi_L300_front_20081009.jpg" },
    { id: 18, name: "Micro Tourer", type: "Van", price: "19,000", fuel: "Diesel", location: "Kurunegala", kmLimit: "150 KM", img: "https://www.vanhiresrilanka.com/images-vanhire/bus_for_hire/16seater/16seater_Micro_mini_bus.jpg" },
    { id: 19, name: "Yamaha MT-15", type: "Bike", price: "6,500", fuel: "Petrol", location: "Matara", kmLimit: "Unlimited", img: "https://images.unsplash.com/photo-1695013147209-1516a20f0cdd?fm=jpg&q=60&w=3000&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8eWFtYWhhJTIwbXQxNXxlbnwwfHwwfHx8MA%3D%3D" },
    { id: 20, name: "Honda Hornet", type: "Bike", price: "5,500", fuel: "Petrol", location: "Colombo", kmLimit: "Unlimited", img: "https://global.honda/content/dam/site/global-en/newsroom-new/cq_img/worldnews/1998/2980210b/01.jpg" },
    { id: 21, name: "Honda PCX 160", type: "Bike", price: "4,500", fuel: "Petrol", location: "Kalutara", kmLimit: "Unlimited", img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSiFrSelPuccPwXoh4WcGZU9Q6o4vjZIOS-sw&s" },
    { id: 22, name: "Yamaha FZ V3", type: "Bike", price: "5,000", fuel: "Petrol", location: "Panadura", kmLimit: "Unlimited", img: "https://cdn.bikedekho.com/processedimages/yamaha/fzs-fi-v3-bs6/source/fzs-fi-v3-bs6691c6c9113353.jpg?imwidth=412&impolicy=resize" },
    { id: 23, name: "Honda Dio", type: "Bike", price: "3,500", fuel: "Petrol", location: "Colombo", kmLimit: "Unlimited", img: "https://ic4.maxabout.us/tr:w-250/autos/tw_india//N/2020/5/new-honda-dio-110-in-mat-axis-grey-metallic.jpg" },
    { id: 24, name: "Yamaha RayZR", type: "Bike", price: "3,800", fuel: "Petrol", location: "Galle", kmLimit: "Unlimited", img: "https://cdn.bikedekho.com/processedimages/yamaha/ray-zr-125/source/ray-zr-12568a8198d15c01.jpg?imwidth=412&impolicy=resize" },
    { id: 25, name: "Bajaj Pulsar NS200", type: "Bike", price: "6,000", fuel: "Petrol", location: "Negombo", kmLimit: "Unlimited", img: "https://cdn.bikedekho.com/processedimages/bajaj/pulsar-n160/640X309/pulsar-n16068d236047cb91.jpg" },
    { id: 26, name: "TVS Apache RTR", type: "Bike", price: "5,200", fuel: "Petrol", location: "Kandy", kmLimit: "Unlimited", img: "https://fasterwheeler.com/product_images/jpeg/tvs-apache-rtr-160-4v-2025.jpg" },
    { id: 27, name: "Suzuki Gixxer", type: "Bike", price: "5,800", fuel: "Petrol", location: "Colombo", kmLimit: "Unlimited", img: "https://fasterwheeler.com/product_images/webp/suzuki-gixxer-2026-final.webp" }
  ];

  const filteredVehicles = category === "All" ? vehicles : vehicles.filter(v => v.type === category);

  const handleLogout = () => {
    localStorage.removeItem("userName");
    window.location.href = "/";
  };

  return (
    <div style={{ backgroundColor: '#071618', minHeight: '100vh', color: 'white', fontFamily: 'Poppins, sans-serif' }}>
      
      {/* Navbar - Fixed Alignment */}
      <nav style={{ 
        display: 'flex', justifyContent: 'space-between', alignItems: 'center', 
        padding: '15px 40px', background: 'rgba(255, 255, 255, 0.03)', 
        backdropFilter: 'blur(15px)', borderBottom: '1px solid rgba(255, 255, 255, 0.1)',
        position: 'sticky', top: 0, zIndex: 1000, boxShadow: '0 4px 30px rgba(0, 0, 0, 0.5)'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
          <img src={myLogo} alt="Logo" style={{ height: '40px', width: 'auto', filter: `drop-shadow(0 0 5px ${accentColor})` }} />
          <h2 style={{ color: accentColor, margin: 0, letterSpacing: '2px', fontWeight: '800' }}>MR RIDE</h2>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
          <span>Welcome, <strong style={{color: accentColor}}>{userName}</strong></span>
          <button onClick={handleLogout} style={{ 
            background: 'rgba(255, 255, 255, 0.05)', color: 'white', border: '1px solid rgba(255,255,255,0.2)', 
            padding: '8px 20px', borderRadius: '30px', cursor: 'pointer', transition: '0.3s'
          }} onMouseOver={(e) => e.target.style.background = 'rgba(255, 0, 0, 0.2)'} onMouseOut={(e) => e.target.style.background = 'rgba(255, 255, 255, 0.05)'}>
            Logout
          </button>
        </div>
      </nav>

      {/* Hero Section - Fixed "Strange Line" Bug */}
      <div style={{ textAlign: 'center', padding: '80px 20px' }}>
        {/* Removed complex gradient that caused the bar bug */}
        <h1 style={{ fontSize: '3.5rem', fontWeight: '900', marginBottom: '10px', color: '#ffffff' }}>
          Find Your <span style={{ color: accentColor }}>Perfect Ride</span>
        </h1>
        <p style={{ color: 'rgba(255,255,255,0.6)', fontSize: '1.1rem' }}>Premium vehicle rentals at your fingertips</p>

        <div style={{ marginTop: '40px', display: 'flex', justifyContent: 'center', gap: '20px', flexWrap: 'wrap' }}>
          {["All", "Car", "Bike", "Van"].map(cat => (
            <button 
              key={cat} 
              onClick={() => setCategory(cat)} 
              style={{ 
                padding: '12px 40px', borderRadius: '50px', border: '1px solid rgba(255,255,255,0.1)', 
                backgroundColor: category === cat ? accentColor : 'rgba(255, 255, 255, 0.05)',
                color: category === cat ? '#071618' : 'white', cursor: 'pointer', fontWeight: 'bold',
                backdropFilter: 'blur(10px)', transition: 'all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275)',
                transform: category === cat ? 'scale(1.1)' : 'scale(1)',
                boxShadow: category === cat ? `0 0 20px ${accentColor}66` : 'none'
              }}
              onMouseOver={(e) => { if(category !== cat) e.target.style.background = 'rgba(255,255,255,0.15)'; e.target.style.transform = 'translateY(-5px)'; }}
              onMouseOut={(e) => { if(category !== cat) e.target.style.background = 'rgba(255, 255, 255, 0.05)'; e.target.style.transform = category === cat ? 'scale(1.1)' : 'scale(1)'; }}
            >
              {cat === "All" ? "All Rides" : cat + "s"}
            </button>
          ))}
        </div>
      </div>

      {/* Vehicle Grid */}
      <div style={{ 
        display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', 
        gap: '40px', padding: '0 60px 100px' 
      }}>
        {filteredVehicles.map(vehicle => (
          <div key={vehicle.id} style={{ 
            background: 'rgba(255, 255, 255, 0.02)', borderRadius: '30px', 
            overflow: 'hidden', border: '1px solid rgba(255, 255, 255, 0.08)', 
            backdropFilter: 'blur(20px)', transition: 'all 0.4s ease',
            cursor: 'pointer'
          }}
          onMouseOver={(e) => { e.currentTarget.style.transform = 'translateY(-15px)'; e.currentTarget.style.border = `1px solid ${accentColor}44`; e.currentTarget.style.background = 'rgba(255, 255, 255, 0.05)'; }}
          onMouseOut={(e) => { e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.border = '1px solid rgba(255, 255, 255, 0.08)'; e.currentTarget.style.background = 'rgba(255, 255, 255, 0.02)'; }}
          >
            <div style={{ position: 'relative', overflow: 'hidden' }}>
              <img src={vehicle.img} alt={vehicle.name} style={{ width: '100%', height: '230px', objectFit: 'cover', transition: '0.5s' }} />
              <div style={{ 
                position: 'absolute', top: '15px', right: '15px', 
                background: `${accentColor}cc`, color: '#071618', padding: '5px 12px', borderRadius: '10px', fontWeight: 'bold', fontSize: '12px'
              }}>
                {vehicle.kmLimit}
              </div>
            </div>

            <div style={{ padding: '30px' }}>
              <h3 style={{ margin: '0 0 10px 0', fontSize: '1.5rem', fontWeight: '700' }}>{vehicle.name}</h3>
              <div style={{ display: 'flex', gap: '10px', color: 'rgba(255,255,255,0.5)', fontSize: '14px', marginBottom: '25px' }}>
                <span>⛽ {vehicle.fuel}</span> • <span>📍 {vehicle.location}</span>
              </div>
              
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderTop: '1px solid rgba(255,255,255,0.05)', paddingTop: '20px' }}>
                <div>
                   <span style={{ fontSize: '12px', color: 'rgba(255,255,255,0.3)', display: 'block' }}>Per Day</span>
                   <span style={{ fontSize: '1.6rem', fontWeight: '900', color: accentColor }}>LKR {vehicle.price}</span>
                </div>
                <button style={{ 
                  backgroundColor: accentColor, color: '#071618', border: 'none', 
                  padding: '12px 25px', borderRadius: '15px', fontWeight: '900', cursor: 'pointer',
                  boxShadow: `0 8px 20px ${accentColor}33`, transition: '0.3s'
                }} onMouseOver={(e) => e.target.style.transform = 'scale(1.05)'} onMouseOut={(e) => e.target.style.transform = 'scale(1)'}>
                  BOOK NOW
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Home;