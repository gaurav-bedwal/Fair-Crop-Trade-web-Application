const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/User");
const router = express.Router();

router.post("/register", async (req, res) => {
  const { name, email, password, role } = req.body;
  const hashed = await bcrypt.hash(password, 10);
  await User.create({ name, email, password: hashed, role });
  res.send("User Registered");
});

router.post("/login", async (req, res) => {
  const user = await User.findOne({ email: req.body.email });
  if (!user) return res.status(400).send("User not found");

  const isMatch = await bcrypt.compare(req.body.password, user.password);
  if (!isMatch) return res.status(400).send("Invalid credentials");

  const token = jwt.sign({ id: user._id }, "secretkey");
  res.json({ token, role: user.role, name: user.name });
});

module.exports = router;
