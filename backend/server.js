const express = require("express");
const cors = require("cors");
const connectDB = require("./config/db");
const Crop = require("./models/Crop");
const User = require("./models/User");
const bcrypt = require("bcryptjs");

const app = express();

// Connect to MongoDB
connectDB();

// Middleware
app.use(cors());
app.use(express.json());
app.use("/uploads", express.static("uploads"));

// 🌾 Seed sample data (only if DB is empty)
const seedData = async () => {
  try {
    // Seed users
    const userCount = await User.countDocuments();
    if (userCount === 0) {
      const hashedPassword = await bcrypt.hash("password123", 10);
      await User.insertMany([
        {
          name: "John Farmer",
          email: "farmer@example.com",
          password: hashedPassword,
          role: "farmer"
        },
        {
          name: "Jane Buyer",
          email: "buyer@example.com",
          password: hashedPassword,
          role: "buyer"
        }
      ]);
      console.log("👥 Sample users added");
    }

    // Seed crops
    const cropCount = await Crop.countDocuments();
    if (cropCount === 0) {
      await Crop.insertMany([
        {
          farmer: "John Farmer",
          cropName: "Wheat",
          quantity: 100,
          price: 2500,
          location: "Haryana"
        },
        {
          farmer: "Ramesh",
          cropName: "Rice",
          quantity: 200,
          price: 3200,
          location: "Punjab"
        },
        {
          farmer: "Suresh",
          cropName: "Maize",
          quantity: 150,
          price: 1800,
          location: "Madhya Pradesh"
        }
      ]);
      console.log("🌾 Sample crops added");
    }
  } catch (err) {
    console.error("Seed error:", err.message);
  }
};

seedData();

// Routes
app.use("/api/auth", require("./routes/auth"));
app.use("/api/crops", require("./routes/crops"));
app.use("/api/bids", require("./routes/bids"));
app.use("/api/notifications", require("./routes/notifications"));

// Start server
app.listen(5000, () => {
  console.log("Server running on port 5000");
});
