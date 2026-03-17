const mongoose = require("mongoose");

const connectDB = async () => {
  await mongoose.connect("mongodb+srv://gaurav:12345@cluster0.h8u4s0c.mongodb.net/?appName=Cluster0");
  console.log("MongoDB Connected");
};

module.exports = connectDB;
