const mongoose = require('mongoose');

const VehicleSchema = new mongoose.Schema({
    customer_id: String,
    vehicle_number: String,
    vehicle_type: String,
    isDelete: Boolean,
    image: String,
    isAvailable: Boolean
}, { collection: 'vehicles' });  // Connects to 'vehicle' collection

module.exports = mongoose.model('Vehicle', VehicleSchema);
