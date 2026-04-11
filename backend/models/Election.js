const mongoose = require('mongoose');

const ElectionSchema = new mongoose.Schema({
  title: { type: String, required: true },
  type: { type: String, required: true },
  date: { type: String },
  phases: { type: Number },
  seats: { type: Number },
  status: { type: String },
  result: { type: String }
});

module.exports = mongoose.model('Election', ElectionSchema);
