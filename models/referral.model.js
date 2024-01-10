const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const referralSchema = new Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  code: { type: String, unique: true, required: true },
  remainingUses: { type: Number, default: 5 },
});

const Referral = mongoose.model('Referral', referralSchema);

module.exports = Referral;
