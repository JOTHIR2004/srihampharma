import express from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import User from "../models/User.js";

const router = express.Router();

// Signup (local)
router.post("/signup", async (req, res) => {
  try {
    const { username, email, password } = req.body;

    // Check if user already exists
    let existing = await User.findOne({ email });
    if (existing) return res.status(400).json({ message: "User already exists" });

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    const user = new User({
      username,
      email,
      passwordHash: hashedPassword,
      authProvider: "local",
    });

    await user.save();

    // Create JWT
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: "1h" });

    res.json({ token, user: { id: user._id, username: user.username, email: user.email } });
    // console.log(res.user.id);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Signin (local)
router.post("/signin", async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email, authProvider: "local" });
    if (!user) return res.status(400).json({ message: "User not found" });

    const isMatch = await bcrypt.compare(password, user.passwordHash);
    if (!isMatch) return res.status(400).json({ message: "Invalid credentials" });

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: "1h" });
    
    console.log(user._id);

    res.json({ token, user: { id: user._id, username: user.username, email: user.email, role: user.role } });
    // console.log(res.json);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Signin/Signup (Google)
router.post("/google", async (req, res) => {
  try {
    const { email, googleId, name } = req.body;

    let user = await User.findOne({ email, authProvider: "google" });

    if (!user) {
      user = new User({
        username: name,
        email,
        googleId,
        authProvider: "google",
      });
      await user.save();
    }

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: "1h" });

    res.json({ token, user: { id: user._id, username: user.username, email: user.email } });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

export default router;
