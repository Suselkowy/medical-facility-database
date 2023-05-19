const mongoose = require('mongoose');

const roomSchema = new mongoose.Schema({
  roomNumber: Number,
  capacity: Number,
  patients: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Patient' }]
});

module.exports = mongoose.model('Room', roomSchema);
