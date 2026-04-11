const mongoose = require('mongoose');

const CandidateSchema = new mongoose.Schema({
  name: { type: String, required: true },
  party: { type: String, required: true },
  symbol: { type: String },
  color: { type: String },
  votes: { type: Number, default: 0 }
});

module.exports = mongoose.model('Candidate', CandidateSchema);
