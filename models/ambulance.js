const mongoose = require('mongoose');

const ambulanceSchema = new mongoose.Schema({
  ambulanceNumber: Number,
  isAvailable: Boolean,
  location: String,
  calls: [{ type: mongoose.Schema.Types.ObjectId, ref: 'AmbulanceCall' }]
});

module.exports = mongoose.model('Ambulance', ambulanceSchema);
