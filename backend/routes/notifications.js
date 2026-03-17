const express = require("express");
const Notification = require("../models/Notification");
const router = express.Router();

// Get all notifications (general - excludes farmer-specific ones)
router.get("/", async (req, res) => {
    try {
        // Get general notifications (not farmer-specific bid_received)
        const notifications = await Notification.find({
            type: { $ne: 'bid_received' }
        }).sort({ createdAt: -1 }).limit(50);
        res.json(notifications);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// Get notifications for a specific farmer
router.get("/farmer/:farmerName", async (req, res) => {
    try {
        const notifications = await Notification.find({
            targetFarmer: req.params.farmerName
        }).sort({ createdAt: -1 }).limit(50);
        res.json(notifications);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// Get unread count (general)
router.get("/unread-count", async (req, res) => {
    try {
        const count = await Notification.countDocuments({
            read: false,
            type: { $ne: 'bid_received' }
        });
        res.json({ count });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// Get unread count for farmer
router.get("/unread-count/:farmerName", async (req, res) => {
    try {
        const count = await Notification.countDocuments({
            read: false,
            targetFarmer: req.params.farmerName
        });
        res.json({ count });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// Mark all as read
router.put("/mark-read", async (req, res) => {
    try {
        await Notification.updateMany({ read: false }, { read: true });
        res.json({ success: true });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// Create notification (internal use)
router.post("/", async (req, res) => {
    try {
        const notification = await Notification.create(req.body);
        res.status(201).json(notification);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

module.exports = router;
