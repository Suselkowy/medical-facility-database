const mongoose = require('mongoose');

const ambulanceCallSchema = new mongoose.Schema({
  time: Date,
  location: String,
  patient: { type: mongoose.Schema.Types.ObjectId, ref: 'Patient' },
  ambulance: { type: mongoose.Schema.Types.ObjectId, ref: 'Ambulance' }
});

module.exports = mongoose.model('AmbulanceCall', ambulanceCallSchema);
