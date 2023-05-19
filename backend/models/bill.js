const mongoose = require('mongoose');

const billSchema = new mongoose.Schema({
  patient: { type: mongoose.Schema.Types.ObjectId, ref: 'Patient' },
  amount: Number,
  isPaid: Boolean,
  servicesRendered: [String]
});

module.exports = mongoose.model('Bill', billSchema);
