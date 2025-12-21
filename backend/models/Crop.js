const mongoose = require("mongoose");

const cropSchema = new mongoose.Schema({
  farmer: String,
  cropName: String,
  quantity: Number,
  price: Number,
  location: String,
  description: String,
  variety: String,
  harvestDate: Date,
  category: String,
  logistics: String,
  mobileNumber: String,
  image: String
});

module.exports = mongoose.model("Crop", cropSchema);
