const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const balanceSchema = new Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
    unique: true,
  },
  credits: { type: Number, default: 0 },
});

const Balance = mongoose.model('Balance', balanceSchema);

module.exports = Balance;
