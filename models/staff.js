const mongoose = require('mongoose');

const staffSchema = new mongoose.Schema({
  name: String,
  position: String,
  speciality: String,
  workingHours: [String],
  appointments: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Appointment' }]
});

module.exports = mongoose.model('Staff', staffSchema);
