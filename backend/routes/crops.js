const express = require("express");
const Crop = require("../models/Crop");
const Notification = require("../models/Notification");
const router = express.Router();
const multer = require("multer");
const path = require("path");
const fs = require("fs");

// Ensure uploads directory exists
const uploadDir = path.join(__dirname, "../uploads");
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir);
}

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/");
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname));
  }
});

const upload = multer({ storage });

router.post("/add", upload.single("image"), async (req, res) => {
  try {
    console.log("📥 Incoming crop data:", req.body);
    console.log("📷 Incoming file:", req.file);

    const cropData = {
      ...req.body,
      image: req.file ? `/uploads/${req.file.filename}` : null
    };

    const crop = await Crop.create(cropData);

    // Create notification for new crop listing
    await Notification.create({
      type: 'crop',
      title: 'New Crop Listed',
      message: `${crop.farmer || 'A farmer'} listed ${crop.cropName} at $${crop.price}/ton`,
      cropId: crop._id,
      cropName: crop.cropName,
      user: crop.farmer || "Unknown Farmer",
      amount: crop.price
    });

    res.status(201).json(crop);
  } catch (err) {
    console.error("🔥 Backend error:", err);
    res.status(500).json({ message: err.message });
  }
});

router.get("/", async (req, res) => {
  const crops = await Crop.find();
  res.json(crops);
});

router.get("/:id", async (req, res) => {
  try {
    const crop = await Crop.findById(req.params.id);
    if (!crop) return res.status(404).json({ message: "Crop not found" });
    res.json(crop);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
