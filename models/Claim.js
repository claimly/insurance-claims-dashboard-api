const mongoose = require('mongoose');
const {CLAIM_STATUSES, CLAIM_TYPES} = require('./consts');

const ClaimSchema = new mongoose.Schema({
  name: String,
  email: String,
  policyId: String,
  type: {type: String, enum: CLAIM_TYPES},
  amount: Number,
  date: Date,
  status: {type: String, enum: CLAIM_STATUSES}
}, {timestamps: true});

mongoose.model('Claim', ClaimSchema);