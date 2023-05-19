const mongoose = require('mongoose');

const patientSchema = new mongoose.Schema({
  name: String,
  age: Number,
  address: String,
  medicalHistory: [String],
  currentCondition: String,
  room: { type: mongoose.Schema.Types.ObjectId, ref: 'Room' },
  appointments: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Appointment' }]
});

module.exports = mongoose.model('Patient', patientSchema);
