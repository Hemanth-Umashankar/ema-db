
const express = require('express');
const mongoose = require('mongoose');
const config = require('./config');
const Booking = require('./moodle/Booking');
const Vehicle = require('./moodle/Vehicle');  // Import Vehicle model
const User = require('./moodle/User');

const app = express();
app.use(express.json()); // Middleware to parse JSON

// Connect to MongoDB
mongoose.connect(config.mongoURI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => console.log('MongoDB Connected'))
  .catch(err => console.error('MongoDB Connection Error:', err));

const PORT = 3000;

app.use(express.json()); // Middleware to parse JSON

app.get('/', (req, res) => {
    res.send('Hello, World!');
});

// ✅ Updated API: List Only Available Vehicles from 'vehicles' Collection
app.get('/list/vehicles', async (req, res) => {
    try {
        const availableVehicles = await Vehicle.find({ 
            isAvailable: true, 
            isDelete: false 
        });

        res.json(availableVehicles);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// ✅ Create a New User
app.post('/api/users', async (req, res) => {
    try {
        const { name, phone_number, address, pincode, rating, reviews, role } = req.body;

        const user = new User({
            _id: new mongoose.Types.ObjectId(),
            name,
            phone_number,
            address,
            pincode,
            rating: rating || 0,  // Default rating
            reviews: reviews || 0, // Default reviews
            role: role || "user",  // Default role
        });

        const savedUser = await user.save();
        res.status(201).json({ message: "User added successfully", data: savedUser });

    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// ✅ Get All Users
app.get('/api/users', async (req, res) => {
    try {
        const users = await User.find();
        res.json(users);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// ✅ Get a Single User by ID
app.get('/api/users/:id', async (req, res) => {
    try {
        const user = await User.findById(req.params.id);
        if (!user) return res.status(404).json({ message: "User not found" });

        res.json(user);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// ✅ Add a New Booking (Users cannot approve their own bookings)
app.post('/api/bookings', async (req, res) => {
    try {
        const { user, customer, vehicle, date, start_time } = req.body;

        // Ensure required fields are provided
        if (!user || !customer || !vehicle || !date || !start_time) {
            return res.status(400).json({ error: "All fields are required except end_time" });
        }

        const booking = new Booking({
            test: "test", // Fixed value
            user,
            customer,
            vehicle,
            date,
            start_time: new Date(start_time), // Convert to Date format
            end_time: null, // Kept blank
            isDone: false, // Default false
            isApproved: false // Users cannot approve bookings
        });

        const savedBooking = await booking.save();
        res.status(201).json({ message: "Booking added successfully", data: savedBooking });

    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// ✅ Get Approved Bookings for a Specific User
app.get('/api/bookings/approved/:userId', async (req, res) => {
    try {
        const userId = req.params.userId;

        const approvedBookings = await Booking.find({ 
            user: userId, 
            isApproved: true 
        });

        res.json(approvedBookings);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});


app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});