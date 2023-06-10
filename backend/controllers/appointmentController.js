const Appointment = require("../models/appointment");
const Patient = require("../models/patient");
const asyncHandler = require("express-async-handler");
const mongoose = require("mongoose");

exports.getAllAppointments = asyncHandler(async (req, res) => {
  const appointments = await Appointment.find();
  res.send(appointments);
});

exports.getAppointments = asyncHandler(async (req, res) => {
  const date = req.query.day.split("-");
  const hourStart = req.query.hourStart.split(":");
  const hourEnd = req.query.hourEnd.split(":");
  const speciality = req.query.speciality;

  const timeStart = new Date(
    Number(date[0]),
    Number(date[1]) - 1,
    Number(date[2]),
    Number(hourStart[0]),
    Number(hourStart[1])
  );

  const timeEnd = new Date(
    Number(date[0]),
    Number(date[1]) - 1,
    Number(date[2]),
    Number(hourEnd[0]),
    Number(hourEnd[1])
  );

  console.log(timeStart, timeEnd);

  const appointments = await Appointment.aggregate([
    {
      $match: {
        time: {
          $gte: timeStart,
          $lte: timeEnd,
        },
        patient: null,
      },
    },
    {
      $lookup: {
        from: "staffs",
        localField: "staff",
        foreignField: "_id",
        as: "doctor",
      },
    },
    {
      $project: {
        _id: 1,
        time: 1,
        staff: 1,
        doctorName: { $arrayElemAt: ["$doctor.name", 0] },
        doctorSpeciality: { $arrayElemAt: ["$doctor.speciality", 0] },
      },
    },
    {
      $match: {
        doctorSpeciality: speciality,
      },
    },
  ]);

  res.send(appointments);
});

// PUT /appointments/:id
exports.reserveAppointment = asyncHandler(async (req, res) => {
  console.log("update");
  console.log(req.user);
  const appointment = await Appointment.updateOne(
    { _id: mongoose.Types.ObjectId(req.params.id), patient: null },
    {
      $set: {
        patient: mongoose.Types.ObjectId(req.user._patient),
      },
    }
  );

  if (appointment.nModified == 0 || appointment === undefined) {
    throw new Error("Invalid data");
  }

  await Patient.updateOne(
    { _id: mongoose.Types.ObjectId(req.user._patient) },
    { $push: { appointments: mongoose.Types.ObjectId(req.params.id) } }
  );

  res
    .status(200)
    .json({ message: `Update goal Succesfull`, id: req.params.id });
});

exports.getAppointmentUser = asyncHandler(async (req, res) => {
  const appointment = await Appointment.find({
    patient: mongoose.Types.ObjectId(req.user.id),
  });

  res.status(200).json(appointment);
});
