const mongoose = require("mongoose");

const notificationSchema = new mongoose.Schema({
    type: { type: String, enum: ['bid', 'crop', 'bid_received'], required: true },
    title: String,
    message: String,
    cropId: { type: mongoose.Schema.Types.ObjectId, ref: "Crop" },
    cropName: String,
    user: String,
    userMobile: String,
    targetFarmer: String, // For farmer-specific notifications
    amount: Number,
    read: { type: Boolean, default: false },
    createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model("Notification", notificationSchema);
