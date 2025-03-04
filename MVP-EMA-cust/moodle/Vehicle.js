const mongoose = require('mongoose');

const VehicleSchema = new mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId, // Ensuring `_id` is an ObjectId
    customer_id: { type: String, required: true },
    vehicle_number: { type: String, required: true },
    vehicle_type: { type: String, required: true },
    isDelete: { type: Boolean, default: false }, // Always false by default
    image: { type: String, default: "link" }, // Default value
    isAvailable: { type: Boolean, required: true }
}, { collection: 'vehicles' });

module.exports = mongoose.model('Vehicle', VehicleSchema);
