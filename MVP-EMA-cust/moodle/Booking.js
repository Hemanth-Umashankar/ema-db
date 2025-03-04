const mongoose = require('mongoose');

const BookingSchema = new mongoose.Schema({
    test: String,
    date: Date,
    vehicle: String,
    customer: String,
    user: String,
    start_time: { type: mongoose.Schema.Types.Mixed, required: true }, // Mixed to support Timestamp
    end_time: { type: mongoose.Schema.Types.Mixed, default: null }, // Null by default
    isDone: { type: Boolean, default: false } // Default is false
}, { collection: 'booking' });  // Ensures it connects to the 'bookings' collection

module.exports = mongoose.model('Booking', BookingSchema);