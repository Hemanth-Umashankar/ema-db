
const express = require('express');
const mongoose = require('mongoose');
const config = require('./config');
const Booking = require('./moodle/Booking');
const Customer = require('./moodle/Customer');
const Vehicle = require('./moodle/Vehicle')
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

app.get('/api/customer/list/bookings', async(req, res) => {

    try {
        const bookings = await Booking.find();
        res.json(bookings);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
    
});



app.post('/api/customer/vehicles', async (req, res) => {
    try {
        const { _id, customer_id, vehicle_number, vehicle_type, isAvailable, image } = req.body;

        // Ensure `_id` is a valid ObjectId
        const vehicle = new Vehicle({
            _id: new mongoose.Types.ObjectId(), // Generates a new ObjectId
            customer_id,
            vehicle_number,
            vehicle_type,
            isAvailable,
            image: image || "link" // Default if image is not provided
        });

        const savedVehicle = await vehicle.save();
        res.status(201).json({ message: "Vehicle added successfully", data: savedVehicle });

    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});




app.post('/api/customers', async (req, res) => {
    try {
        const { name, phone_number, address, pincode, drivers_license, number_vehicles } = req.body;

        // Ensure `_id` is a valid ObjectId and rating/reviews have default values
        const customer = new Customer({
            _id: new mongoose.Types.ObjectId(), // Generates a new ObjectId
            name,
            phone_number,
            address,
            pincode,
            drivers_license,
            number_vehicles,
            rating: 0, // Default for new users
            reviews: 0 // Default for new users
        });

        const savedCustomer = await customer.save();
        res.status(201).json({ message: "Customer added successfully", data: savedCustomer });

    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});





app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});