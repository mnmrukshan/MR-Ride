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

// --- Booking Model (Updated with Status) ---
const BookingSchema = new mongoose.Schema({
    userEmail: { type: String, required: true },
    vehicleName: { type: String, required: true },
    pickupDate: { type: String, required: true },
    pickupTime: { type: String, required: true },
    status: { type: String, default: "Pending" }, // Default status for new bookings
    bookingDate: { type: Date, default: Date.now } 
});
const Booking = mongoose.model('Booking', BookingSchema);

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

// --- Booking Route (POST) ---
app.post('/api/book', async (req, res) => {
    try {
        const { userEmail, vehicleName, pickupDate, pickupTime } = req.body;
        
        const newBooking = new Booking({
            userEmail,
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

// Server running port
app.listen(5000, () => {
    console.log("Server is running on port 5000...");
});