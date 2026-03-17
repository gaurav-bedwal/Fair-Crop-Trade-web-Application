const express = require("express");
const Bid = require("../models/Bid");
const Crop = require("../models/Crop");
const Notification = require("../models/Notification");
const router = express.Router();

// Create a new bid
router.post("/", async (req, res) => {
    try {
        const { cropId, bidder, bidderMobile, amount } = req.body;

        // Get crop for the notification
        const crop = await Crop.findById(cropId);
        if (!crop) {
            return res.status(404).json({ message: "Crop not found" });
        }

        const bid = await Bid.create({
            cropId,
            cropName: crop.cropName,
            bidder: bidder || "Anonymous Buyer",
            bidderMobile: bidderMobile || "",
            amount
        });

        // Create general notification for the bid (visible to everyone)
        await Notification.create({
            type: 'bid',
            title: 'New Bid Placed',
            message: `${bidder || 'Someone'} placed a bid of $${amount} on ${crop.cropName}`,
            cropId,
            cropName: crop.cropName,
            user: bidder || "Anonymous Buyer",
            userMobile: bidderMobile || "",
            amount
        });

        // Create farmer-specific notification (for the crop owner)
        await Notification.create({
            type: 'bid_received',
            title: 'Someone Bid on Your Crop!',
            message: `${bidder || 'A buyer'} bid $${amount}/ton on your ${crop.cropName}. Contact: ${bidderMobile || 'Not provided'}`,
            cropId,
            cropName: crop.cropName,
            user: bidder || "Anonymous Buyer",
            userMobile: bidderMobile || "",
            targetFarmer: crop.farmer, // Target the farmer who listed the crop
            amount
        });

        res.status(201).json(bid);
    } catch (err) {
        console.error("Error creating bid:", err);
        res.status(500).json({ message: err.message });
    }
});

// Get all bids (for notification center)
router.get("/", async (req, res) => {
    try {
        const bids = await Bid.find().sort({ createdAt: -1 }).limit(50);
        res.json(bids);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// Get bids for a specific crop
router.get("/crop/:cropId", async (req, res) => {
    try {
        const bids = await Bid.find({ cropId: req.params.cropId }).sort({ createdAt: -1 });
        res.json(bids);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// Get highest bid for a crop
router.get("/crop/:cropId/highest", async (req, res) => {
    try {
        const highestBid = await Bid.findOne({ cropId: req.params.cropId }).sort({ amount: -1 });
        res.json(highestBid || { amount: 0 });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

module.exports = router;
