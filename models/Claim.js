const mongoose = require('mongoose');
const {CLAIM_STATUSES, CLAIM_TYPES} = require('./consts');

const ClaimSchema = new mongoose.Schema({
  name: {type: String, required: true},
  email: {type: String, required: true},
  policyId: {type: String, required: true},
  type: {type: String, enum: CLAIM_TYPES, required: true},
  amount: {type: Number, required: true},
  date: {type: Date, required: true},
  status: {type: String, enum: CLAIM_STATUSES, required: true}
}, {timestamps: true});

mongoose.model('Claim', ClaimSchema);