const mongoose = require('mongoose');

const BookingSchema = new mongoose.Schema({
    test: String,
    date: Date,
    vehicle: Date,
    customer: String,
    user: String
}, { collection: 'booking' });  // Ensures it connects to the 'bookings' collection

module.exports = mongoose.model('Booking', BookingSchema);