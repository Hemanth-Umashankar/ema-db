const mongoose = require('mongoose');

const CustomerSchema = new mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId, // Ensures `_id` is an ObjectId
    name: { type: String, required: true },
    phone_number: { type: String, required: true },
    address: { type: String, required: true },
    pincode: { type: String, required: true },
    drivers_license: { type: String, required: true },
    number_vehicles: { type: Number, required: true },
    rating: { type: Number, default: 0 }, // Default to 0 for new users
    reviews: { type: Number, default: 0 } // Default to 0 for new users
}, { collection: 'customers' });

module.exports = mongoose.model('Customer', CustomerSchema);
