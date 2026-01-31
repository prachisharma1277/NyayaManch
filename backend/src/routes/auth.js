const router = require('express').Router();
const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { OAuth2Client } = require('google-auth-library');

const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);

// Helper to create JWT
const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: '7d' });
};

// 1. REGISTER (Normal)
router.post('/register', async (req, res) => {
  try {
    const { name, email, password } = req.body;

    // Check if user exists
    const existingUser = await User.findOne({ email });
    if (existingUser) return res.status(400).json({ message: "User already exists" });

    // Hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Create user
    const newUser = new User({ name, email, password: hashedPassword });
    await newUser.save();

    const token = generateToken(newUser._id);
    res.status(201).json({ token, user: { id: newUser._id, name, email } });

  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
});

// 2. LOGIN (Normal)
router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ message: "User not found" });

    // If user registered via Google, they might not have a password
    if (!user.password) return res.status(400).json({ message: "Please login with Google" });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ message: "Invalid credentials" });

    const token = generateToken(user._id);
    res.json({ token, user: { id: user._id, name: user.name, email } });

  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
});

// 3. GOOGLE LOGIN
router.post('/google', async (req, res) => {
  try {
    const { token } = req.body; // Token from frontend

    // Verify token with Google
    const ticket = await client.verifyIdToken({
      idToken: token,
      audience: process.env.GOOGLE_CLIENT_ID,
    });
    const { name, email, picture, sub: googleId } = ticket.getPayload();

    // Check if user exists
    let user = await User.findOne({ email });

    if (user) {
      // If user exists but no googleId (legacy normal user), link it now
      if (!user.googleId) {
        user.googleId = googleId;
        await user.save();
      }
    } else {
      // Create new Google user
      user = new User({
        name,
        email,
        googleId,
        picture,
        password: "" // No password for Google users
      });
      await user.save();
    }

    const jwtToken = generateToken(user._id);
    res.json({ token: jwtToken, user: { id: user._id, name, email, picture } });

  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Google Auth Failed" });
  }
});

module.exports = router;