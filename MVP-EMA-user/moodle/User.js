const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId, // Ensures `_id` is an ObjectId
    name: { type: String, required: true },
    phone_number: { type: String, required: true },
    address: { type: String, required: true },
    pincode: { type: String, required: true },
    rating: { type: Number, default: 0 }, // Default to 0 for new users
    reviews: { type: Number, default: 0 }, // Default to 0 for new users
    role: { type: String, default: "user" }, // Default role: "user"
    created_at: { type: Date, default: Date.now } // Timestamp for user creation
}, { collection: 'users' }); // Collection name in MongoDB

module.exports = mongoose.model('User', UserSchema);