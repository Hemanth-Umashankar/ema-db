const mongoose = require('mongoose');

const BookingSchema = new mongoose.Schema({
    test: { type: String, default: "test" }, // Always "test"
    user: { type: String, required: true },
    customer: { type: String, required: true }, // Customer ID
    vehicle: { type: String, required: true }, // Vehicle Number
    date: { type: String, required: true }, // Booking Date
    start_time: { type: Date, required: true }, // Start Time
    end_time: { type: Date, default: null }, // Kept blank
    isDone: { type: Boolean, default: false }, // Default false
    isApproved: { type: Boolean, default: false } // Default false
}, { collection: 'booking' });

module.exports = mongoose.model('Booking', BookingSchema);
