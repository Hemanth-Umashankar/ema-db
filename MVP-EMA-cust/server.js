
const express = require('express');
const mongoose = require('mongoose');
const config = require('./config');
const Booking = require('./moodle/Booking');

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

app.get('/list/bookings', async(req, res) => {

    try {
        const bookings = await Booking.find();
        res.json(bookings);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
    
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});