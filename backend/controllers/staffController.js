const Appointment = require("../models/appointment");
const Staff = require("../models/staff");
const User = require("../models/user");
const asyncHandler = require("express-async-handler");

exports.getSpecialities = asyncHandler(async (req, res) => {
  const specialities = await Staff.distinct("speciality");
  res.send(specialities);
});

exports.getAppointments = asyncHandler(async (req, res) => {
  const userId = req.params.id; // TODO how to send staffId to req.params ???
  const user = await User.findOne({_id: userId});
  const staffId = user._staff;
  // console.log(staffId);
  const appointments = await Appointment.find({staff: staffId});
  // console.log("APPOINTMENTS:", appointments); // TODO DEBUG delete me
  res.send(appointments);
});

exports.cancelAppointment = asyncHandler(async (req, res) => {
  const userId = req.params.id; // TODO how to send staffId to req.params ???
  const user = await User.findOne({_id: userId});
  const staffId = user._staff;
  const appointmentId = req.params.a_id;
  const appointment = await Appointment.findById(appointmentId);
  if (!appointment || appointment.staff !== staffID) {
    // res.status(404);
    throw new Error("Appointment not found!");
    return;
  }

  appointment.patient = null;
  await appointment.save();
  res.send(appointmentId);
})
