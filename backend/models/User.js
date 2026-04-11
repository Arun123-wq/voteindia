const mongoose = require('mongoose');
const bcrypt   = require('bcryptjs');

const UserSchema = new mongoose.Schema({
  name:         { type: String, required: true, trim: true },
  aadhaar:      { type: String, required: true, unique: true },
  mobile:       { type: String, required: true },
  state:        { type: String },
  constituency: { type: String },
  password:     { type: String, required: true },
  voterId:      { type: String, unique: true, sparse: true },
  verified:     { type: Boolean, default: false },
  voted:        { type: Boolean, default: false },
}, { timestamps: true });

/**
 * Pre-save hook: hash password if it has been modified and is not already hashed.
 * Using Mongoose 9-compatible async callback-free syntax.
 */
UserSchema.pre('save', async function () {
  if (!this.isModified('password')) return;
  // Skip if already a bcrypt hash (e.g. seeded data passed pre-hashed)
  if (this.password && this.password.startsWith('$2')) return;
  const salt     = await bcrypt.genSalt(10);
  this.password  = await bcrypt.hash(this.password, salt);
});

/**
 * Instance method: compare a plaintext password against the stored hash.
 */
UserSchema.methods.matchPassword = async function (plainPassword) {
  return bcrypt.compare(plainPassword, this.password);
};

module.exports = mongoose.model('User', UserSchema);
