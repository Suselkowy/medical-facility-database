const Appointment = require("../models/appointment");
const asyncHandler = require("express-async-handler");

exports.getAllAppointments = asyncHandler(async (req, res) => {
  const appointments = await Appointment.find().populate("patient staff");
  res.send(appointments);
});
