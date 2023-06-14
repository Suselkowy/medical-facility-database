const Appointment = require("../models/appointment");
const Staff = require("../models/staff");
const User = require("../models/user");
const asyncHandler = require("express-async-handler");
const mongoose = require("mongoose");

exports.getSpecialities = asyncHandler(async (req, res) => {
  const specialities = await Staff.distinct("speciality");
  res.send(specialities);
});

exports.getAppointments = asyncHandler(async (req, res) => {
  const userId = req.params.id; // TODO how to send staffId to req.params ???
  const user = await User.findOne({ _id: userId });
  const staffId = user._staff;
  // console.log(staffId);
  const appointments = await Appointment.find({ staff: staffId });
  // console.log("APPOINTMENTS:", appointments); // TODO DEBUG delete me
  res.send(appointments);
});

exports.updateAppointmentStaff = asyncHandler(async (req, res) => {
  const appointmentId = req.params.id;
  const status = req.params.status;
  console.log(appointmentId);
  const appointment = await Appointment.findOneAndUpdate(
    {
      _id: mongoose.Types.ObjectId(appointmentId),
    },
    {
      $set: {
        status: status,
      },
    }
  );

  if (!appointment) {
    throw new Error("Invalid data");
  }

  res
    .status(200)
    .json({
      message: `Update appointment Succesfull`,
      id: req.params.id,
      state: req.params.state,
    });
});
