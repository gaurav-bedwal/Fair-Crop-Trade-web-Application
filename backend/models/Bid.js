const mongoose = require("mongoose");

const bidSchema = new mongoose.Schema({
    cropId: { type: mongoose.Schema.Types.ObjectId, ref: "Crop", required: true },
    cropName: String,
    bidder: { type: String, default: "Anonymous Buyer" },
    bidderMobile: String,
    amount: { type: Number, required: true },
    createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model("Bid", bidSchema);
