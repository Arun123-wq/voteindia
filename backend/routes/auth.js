const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const authMiddleware = require('../middleware/auth');

// ─── Helper: sign a JWT ───────────────────────────────────────────────────────
const signToken = (user) =>
  jwt.sign(
    { id: user._id, name: user.name, voterId: user.voterId },
    process.env.JWT_SECRET,
    { expiresIn: process.env.JWT_EXPIRES_IN || '7d' }
  );

// ─── POST /api/auth/register ──────────────────────────────────────────────────
router.post('/register', async (req, res) => {
  try {
    const { name, aadhaar, mobile, state, constituency, password } = req.body;

    if (!name || !aadhaar || !mobile || !password) {
      return res.status(400).json({ message: 'Please fill in all required fields.' });
    }

    // Check duplicate Aadhaar
    const existing = await User.findOne({ aadhaar });
    if (existing) {
      return res.status(400).json({ message: 'User already registered with this Aadhaar.' });
    }

    // Hash password before storing
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Generate a Voter ID
    const voterId = 'IND' + Math.floor(100000 + Math.random() * 900000);

    const user = new User({
      name,
      aadhaar,
      mobile,
      state,
      constituency,
      password: hashedPassword,
      voterId,
      verified: true,
    });

    await user.save();

    // Sign a JWT right after registration so the user can auto-login
    const token = signToken(user);

    res.status(201).json({
      message: 'Registered successfully',
      token,
      user: {
        id: user._id,
        name: user.name,
        voterId: user.voterId,
        state: user.state,
        constituency: user.constituency,
        verified: user.verified,
      },
    });
  } catch (error) {
    console.error('Register error:', error);
    res.status(500).json({ error: 'Server Error' });
  }
});

// ─── POST /api/auth/login ─────────────────────────────────────────────────────
router.post('/login', async (req, res) => {
  try {
    const { aadhaar, password } = req.body;

    if (!aadhaar || !password) {
      return res.status(400).json({ message: 'Aadhaar/Voter ID and password are required.' });
    }

    // Allow login by Aadhaar number OR Voter ID
    const user = await User.findOne({
      $or: [{ aadhaar }, { voterId: aadhaar }],
    });

    if (!user) {
      return res.status(401).json({ message: 'Invalid credentials.' });
    }

    // Compare hashed password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ message: 'Invalid credentials.' });
    }

    const token = signToken(user);

    res.json({
      message: 'Logged in successfully',
      token,
      user: {
        id: user._id,
        name: user.name,
        voterId: user.voterId,
        state: user.state,
        constituency: user.constituency,
        verified: user.verified,
        voted: user.voted,
      },
    });
  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({ error: 'Server Error' });
  }
});

// ─── GET /api/auth/me  (protected) ───────────────────────────────────────────
// Lets the frontend verify a stored token is still valid and refresh user data.
router.get('/me', authMiddleware, async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select('-password');
    if (!user) return res.status(404).json({ message: 'User not found.' });
    res.json({ user });
  } catch (error) {
    res.status(500).json({ error: 'Server Error' });
  }
});

module.exports = router;
