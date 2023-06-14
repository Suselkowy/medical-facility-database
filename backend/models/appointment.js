const mongoose = require("mongoose");

const appointmentSchema = new mongoose.Schema({
  time: Date,
  patient: { type: mongoose.Schema.Types.ObjectId, ref: "Patient" },
  staff: { type: mongoose.Schema.Types.ObjectId, ref: "Staff" },
  status: String,
});

module.exports = mongoose.model("Appointment", appointmentSchema);
