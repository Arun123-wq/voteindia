const mongoose = require('mongoose');

const PartySchema = new mongoose.Schema({
  name: { type: String, required: true },
  abbr: { type: String, required: true },
  symbol: { type: String, required: true },
  color: { type: String },
  bg: { type: String },
  candidates: [{ type: String }],
  seats: { type: Number },
  alliance: { type: String },
  founded: { type: Number },
  leader: { type: String },
  ideology: { type: String },
  agenda: {
    economy: [{ type: String }],
    security: [{ type: String }],
    social: [{ type: String }],
    agriculture: [{ type: String }]
  }
});

module.exports = mongoose.model('Party', PartySchema);
