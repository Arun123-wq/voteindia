const express = require('express');
const router = express.Router();
const authMiddleware = require('../middleware/auth');
const Party = require('../models/Party');
const Election = require('../models/Election');
const Candidate = require('../models/Candidate');
const User = require('../models/User');

// ─── Public routes (no token needed) ─────────────────────────────────────────
// Allow unauthenticated users to browse elections, parties, and results.

router.get('/parties', async (req, res) => {
  try {
    const parties = await Party.find();
    res.json(parties);
  } catch (error) {
    res.status(500).json({ error: 'Server Error' });
  }
});

router.get('/elections', async (req, res) => {
  try {
    const elections = await Election.find();
    res.json(elections);
  } catch (error) {
    res.status(500).json({ error: 'Server Error' });
  }
});

router.get('/candidates', async (req, res) => {
  try {
    const candidates = await Candidate.find();
    res.json(candidates);
  } catch (error) {
    res.status(500).json({ error: 'Server Error' });
  }
});

// ─── Protected routes (valid JWT required) ────────────────────────────────────

// GET /api/vote/status — check whether the authenticated user has already voted
router.get('/vote/status', authMiddleware, async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select('voted');
    res.json({ voted: user?.voted ?? false });
  } catch (error) {
    res.status(500).json({ error: 'Server Error' });
  }
});

// POST /api/vote — cast a vote (one per user)
router.post('/vote', authMiddleware, async (req, res) => {
  try {
    const { candidateId } = req.body;

    const user = await User.findById(req.user.id);
    if (!user) return res.status(404).json({ message: 'User not found.' });
    if (user.voted) return res.status(400).json({ message: 'You have already cast your vote.' });

    const candidate = await Candidate.findById(candidateId);
    if (!candidate) return res.status(404).json({ message: 'Candidate not found.' });

    // Increment vote tally on the candidate document
    candidate.votes = (candidate.votes || 0) + 1;
    await candidate.save();

    user.voted = true;
    await user.save();

    res.json({ message: 'Vote cast successfully! 🗳', candidate: candidate.name });
  } catch (error) {
    console.error('Vote error:', error);
    res.status(500).json({ error: 'Server Error' });
  }
});

// GET /api/results — public results endpoint (no auth needed)
router.get('/results', async (req, res) => {
  try {
    const candidates = await Candidate.find().sort({ votes: -1 });
    res.json(candidates);
  } catch (error) {
    res.status(500).json({ error: 'Server Error' });
  }
});

module.exports = router;
