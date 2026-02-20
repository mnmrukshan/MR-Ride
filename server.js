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
        
        // Checking if email and password match in the database
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

// Server running port
app.listen(5000, () => {
    console.log("Server is running on port 5000...");
});