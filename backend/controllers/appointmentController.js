const Appointment = require("../models/appointment");
const asyncHandler = require("express-async-handler");

exports.getAllAppointments = asyncHandler(async (req, res) => {
  const appointments = await Appointment.find();
  res.send(appointments);
});

exports.getAppointments = asyncHandler(async (req, res) => {
  const date = req.query.day.split("-");
  const hourStart = req.query.hourStart.split(":");
  const hourEnd = req.query.hourEnd.split(":");
  const doctor = req.query.doctor;

  const timeStart = new Date(
    Date.UTC(
      Number(date[0]),
      Number(date[1]) - 1,
      Number(date[2]),
      Number(hourStart[0]),
      Number(hourStart[1])
    )
  );

  console.log(date, hourStart);
  console.log(timeStart);
  const timeEnd = new Date(
    Date.UTC(
      Number(date[0]),
      Number(date[1]) - 1,
      Number(date[2]),
      Number(hourEnd[0]),
      Number(hourEnd[1])
    )
  );
  console.log(date, hourEnd);
  console.log(timeEnd);
  const appointments = await Appointment.find({
    time: {
      $gte: timeStart,
      $lte: timeEnd,
    },
    patient: null,
  });

  res.send(appointments);
});
