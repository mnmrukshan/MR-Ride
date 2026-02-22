const express = require('express'); 
const mongoose = require('mongoose'); 
const cors = require('cors'); 

const app = express(); 

// Middleware
app.use(express.json()); 
app.use(cors());

// MongoDB connection
mongoose.connect('mongodb://127.0.0.1:27017/loginDB')
    .then(() => console.log("Database connected successfully!"))
    .catch(err => console.log("Connection error:", err));

// --- User Model ---
const UserSchema = new mongoose.Schema({
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true }
});
const User = mongoose.model('User', UserSchema);

// --- Booking Model (Updated with Phone) ---
const BookingSchema = new mongoose.Schema({
    userEmail: { type: String, required: true },
    phone: { type: String, required: true }, // 👈 NEW: Phone number field added
    vehicleName: { type: String, required: true },
    pickupDate: { type: String, required: true },
    pickupTime: { type: String, required: true },
    status: { type: String, default: "Pending" }, 
    bookingDate: { type: Date, default: Date.now } 
});
const Booking = mongoose.model('Booking', BookingSchema);

// --- Vehicle Model ---
const VehicleSchema = new mongoose.Schema({
    name: { type: String, required: true },
    type: { type: String, required: true },
    price: { type: Number, required: true },
    img: { type: String, required: true } 
});
const Vehicle = mongoose.model('Vehicle', VehicleSchema);

// --- Register Route ---
app.post('/register', async (req, res) => {
    try {
        const { email, password } = req.body;
        const newUser = new User({ email, password });
        await newUser.save();
        res.status(201).send({ message: "Registration successful! Please login." });
    } catch (err) {
        res.status(400).send({ message: "This email is already in use!" });
    }
});

// --- Login Route ---
app.post('/login', async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await User.findOne({ email: email, password: password });

        if (user) {
            res.status(200).send({ message: "Logged in successfully!" });
        } else {
            res.status(401).send({ message: "Invalid email or password!" });
        }
    } catch (err) {
        res.status(500).send({ message: "Server error occurred!" });
    }
});

// --- Booking Route (POST - Updated with Phone) ---
app.post('/api/book', async (req, res) => {
    try {
        const { userEmail, phone, vehicleName, pickupDate, pickupTime } = req.body; // 👈 NEW: Destructured phone from body
        
        const newBooking = new Booking({
            userEmail,
            phone, // 👈 NEW: Saved phone to database
            vehicleName,
            pickupDate,
            pickupTime
        });

        await newBooking.save();
        res.status(201).send({ message: "Ride reserved successfully!" });
    } catch (err) {
        res.status(500).send({ message: "Booking failed! Please try again." });
    }
});

// --- Fetch My Bookings (GET) ---
app.get('/api/my-bookings/:email', async (req, res) => {
    try {
        const email = req.params.email;
        const userBookings = await Booking.find({ userEmail: email });
        res.status(200).json(userBookings);
    } catch (err) {
        res.status(500).send({ message: "Error fetching bookings!" });
    }
});

// --- Fetch ALL Bookings for Admin (GET) ---
app.get('/api/admin/all-bookings', async (req, res) => {
    try {
        const allBookings = await Booking.find().sort({ bookingDate: -1 }); 
        res.status(200).json(allBookings);
    } catch (err) {
        res.status(500).send({ message: "Error fetching all bookings!" });
    }
});

// --- Update Booking Status (PATCH) ---
app.patch('/api/book/status/:id', async (req, res) => {
    try {
        const { status } = req.body; 
        await Booking.findByIdAndUpdate(req.params.id, { status: status });
        res.status(200).send({ message: `Booking ${status} successfully!` });
    } catch (err) {
        res.status(500).send({ message: "Failed to update status!" });
    }
});

// --- DELETE BOOKING API ---
app.delete('/api/book/:id', async (req, res) => {
    try {
        const id = req.params.id;
        await Booking.findByIdAndDelete(id); 
        res.status(200).send({ message: "Deleted successfully" });
    } catch (err) {
        res.status(500).send({ message: "Error deleting booking" });
    }
});

// --- Vehicle APIs for Admin Inventory Management ---

// Fetch all vehicles
app.get('/api/vehicles', async (req, res) => {
    try {
        const vehicles = await Vehicle.find();
        res.json(vehicles);
    } catch (err) {
        res.status(500).json({ message: "Error fetching vehicles" });
    }
});

// Add a new vehicle
app.post('/api/admin/add-vehicle', async (req, res) => {
    try {
        const { name, type, price, img } = req.body;
        const newVehicle = new Vehicle({ name, type, price, img });
        await newVehicle.save();
        res.status(201).json({ message: "Vehicle added successfully!" });
    } catch (err) {
        res.status(500).json({ message: "Error adding vehicle" });
    }
});

// Update vehicle details (Edit price or name)
app.patch('/api/admin/vehicle/:id', async (req, res) => {
    try {
        const { price, name } = req.body;
        await Vehicle.findByIdAndUpdate(req.params.id, { name, price });
        res.json({ message: "Vehicle updated successfully!" });
    } catch (err) {
        res.status(500).json({ message: "Update failed" });
    }
});

// Delete vehicle from inventory
app.delete('/api/admin/vehicle/:id', async (req, res) => {
    try {
        await Vehicle.findByIdAndDelete(req.params.id);
        res.json({ message: "Vehicle removed from inventory!" });
    } catch (err) {
        res.status(500).json({ message: "Error deleting vehicle" });
    }
});

// Server running port
app.listen(5000, () => {
    console.log("Server is running on port 5000...");
});