const express = require('express'); 
const mongoose = require('mongoose'); 
const cors = require('cors'); 

const app = express(); 

// Middleware
app.use(express.json()); 
app.use(cors());

// MongoDB connection
mongoose.connect('mongodb://127.0.0.1:27017/loginDB')
    .then(() => console.log("Database එකට සාර්ථකව සම්බන්ධ වුණා!"))
    .catch(err => console.log("Error එකක් ආවා:", err));

// --- User Model එක (මේක අනිවාර්යයෙන්ම ඕනේ) ---
const UserSchema = new mongoose.Schema({
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true }
});
const User = mongoose.model('User', UserSchema);

// --- Register Route එක ---
app.post('/register', async (req, res) => {
    try {
        const { email, password } = req.body;
        const newUser = new User({ email, password });
        await newUser.save();
        res.status(201).send({ message: "Register වීම සාර්ථකයි! දැන් Login වෙන්න." });
    } catch (err) {
        res.status(400).send({ message: "මේ Email එක දැනටමත් පාවිච්චි කරලා තියෙන්නේ!" });
    }
});

// --- Login Route එක (Database එකෙන් පරීක්ෂා කරන විදිහ) ---
app.post('/login', async (req, res) => {
    try {
        const { email, password } = req.body;
        
        // Database එකේ ඇත්තටම මේ email එකයි password එකයි තියෙනවද බලනවා
        const user = await User.findOne({ email: email, password: password });

        if (user) {
            res.status(200).send({ message: "සාර්ථකව Login වුණා!" });
        } else {
            res.status(401).send({ message: "Email හෝ Password වැරදියි!" });
        }
    } catch (err) {
        res.status(500).send({ message: "Server Error එකක් ආවා!" });
    }
});

// Server එක දුවන Port එක
app.listen(5000, () => {
    console.log("Server එක Port 5000 එකේ වැඩ කරනවා...");
});

