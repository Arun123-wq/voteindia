require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const path = require('path');
const fs = require('fs');

const authRoutes = require('./routes/auth');
const apiRoutes  = require('./routes/api');

const app = express();

// ─── Global Middleware ────────────────────────────────────────────────────────
app.use(cors());
app.use(express.json());

// Basic security headers (no dependency needed)
app.use((req, res, next) => {
  res.setHeader('X-Content-Type-Options', 'nosniff');
  res.setHeader('X-Frame-Options', 'DENY');
  res.setHeader('X-XSS-Protection', '1; mode=block');
  next();
});

// ─── MongoDB Connection ───────────────────────────────────────────────────────
const MONGO_URI = process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/voteindia';

mongoose.connect(MONGO_URI)
  .then(() => console.log('✅ MongoDB Connected'))
  .catch(err => {
    console.error('❌ MongoDB connection error:', err.message);
    process.exit(1);
  });

// ─── Routes ───────────────────────────────────────────────────────────────────
app.use('/api/auth', authRoutes);  // Public: /register, /login | Protected: /me
app.use('/api',      apiRoutes);   // Public: /parties, /elections, /candidates, /results
                                   // Protected: /vote, /vote/status

// ─── Serve Frontend ───────────────────────────────────────────────────────────
const buildPath = path.resolve(__dirname, '../voteindia-vite/dist');

if (fs.existsSync(buildPath)) {
  console.log(`✅ Serving static frontend from: ${buildPath}`);
  app.use(express.static(buildPath));
  
  // ─── Wildcard Fallback ─────────────────────────────────────────────────────
  // Catch-all route to serve the frontend for React Router SPA navigation
  app.get('*', (req, res) => {
    res.sendFile(path.join(buildPath, 'index.html'));
  });
} else {
  console.warn(`⚠️ Warning: Static build path not found at ${buildPath}`);
  console.warn(`   Make sure 'npm run build' was executed successfully in the frontend folder.`);
}

// ─── Start Server ─────────────────────────────────────────────────────────────
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 VoteIndia server running on http://localhost:${PORT}`);
  console.log(`   Auth:     POST /api/auth/login | POST /api/auth/register`);
  console.log(`   Protected: GET  /api/auth/me   | POST /api/vote`);
});
