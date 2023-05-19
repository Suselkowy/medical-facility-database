const express = require('express');
const router = express.Router();
const AmbulanceCall = require('../models/ambulanceCall');

router.get('/', async (req, res) => {
  const ambulanceCalls = await AmbulanceCall.find().populate('ambulance patient');
  res.send(ambulanceCalls);
});

router.post('/', async (req, res) => {
  const ambulanceCall = new AmbulanceCall(req.body);
  await ambulanceCall.save();
  res.send(ambulanceCall);
});

module.exports = router;
