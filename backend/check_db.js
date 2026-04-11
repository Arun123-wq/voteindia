require('dotenv').config({ path: require('path').resolve(__dirname, '.env') });
const mongoose = require('mongoose');
const Party     = require('./models/Party');
const Election  = require('./models/Election');
const Candidate = require('./models/Candidate');
const User      = require('./models/User');

const MONGO_URI = process.env.MONGO_URI;
console.log('Attempting to connect with URI:', MONGO_URI ? MONGO_URI.replace(/:([^@]+)@/, ':****@') : 'UNDEFINED');

async function checkData() {
  try {
    await mongoose.connect(MONGO_URI);
    console.log('✅ Connected to MongoDB Atlas');

    const partyCount = await Party.countDocuments();
    const electionCount = await Election.countDocuments();
    const candidateCount = await Candidate.countDocuments();
    const userCount = await User.countDocuments();

    console.log('\n--- Data Presence Report ---');
    console.log(`Parties:    ${partyCount}`);
    console.log(`Elections:  ${electionCount}`);
    console.log(`Candidates: ${candidateCount}`);
    console.log(`Users:      ${userCount}`);
    console.log('---------------------------\n');

    if (partyCount > 0 && electionCount > 0 && candidateCount > 0) {
      console.log('🏆 VERIFIED: Data is present in your Atlas Cluster!');
    } else {
      console.log('❌ ALERT: Some collections appear to be empty.');
    }

    process.exit(0);
  } catch (error) {
    console.error('❌ Connection Error:', error);
    process.exit(1);
  }
}

checkData();
