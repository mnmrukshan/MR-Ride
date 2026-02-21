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

// --- NEW: Booking Model ---
const BookingSchema = new mongoose.Schema({
    userEmail: { type: String, required: true },
    vehicleName: { type: String, required: true },
    pickupDate: { type: String, required: true },
    pickupTime: { type: String, required: true },
    bookingDate: { type: Date, default: Date.now } // Record when the booking was made
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

// --- NEW: Booking Route (POST) ---
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

// --- NEW: Fetch My Bookings (GET) ---
// This allows the user to see their own bookings based on email
app.get('/api/my-bookings/:email', async (req, res) => {
    try {
        const email = req.params.email;
        const userBookings = await Booking.find({ userEmail: email });
        res.status(200).json(userBookings);
    } catch (err) {
        res.status(500).send({ message: "Error fetching bookings!" });
    }
});
// --- DELETE BOOKING API ---
app.delete('/api/book/:id', async (req, res) => {
    try {
        await Booking.findByIdAndDelete(req.params.id);
        res.status(200).send({ message: "Booking deleted successfully!" });
    } catch (err) {
        res.status(500).send({ message: "Failed to delete booking!" });
    }
});

// Server running port
app.listen(5000, () => {
    console.log("Server is running on port 5000...");
});