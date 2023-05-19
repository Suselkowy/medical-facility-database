const express = require('express');
const router = express.Router();
const Appointment = require('../models/appointment');

router.get('/', async (req, res) => {
  const appointments = await Appointment.find().populate('patient staff');
  res.send(appointments);
});

router.post('/', async (req, res) => {
  const appointment = new Appointment(req.body);
  await appointment.save();
  res.send(appointment);
});

module.exports = router;
