const express = require('express');
const router = express.Router();
const Ambulance = require('../models/ambulance');

router.get('/', async (req, res) => {
  const ambulances = await Ambulance.find().populate('calls');
  res.send(ambulances);
});

router.post('/', async (req, res) => {
  const ambulance = new Ambulance(req.body);
  await ambulance.save();
  res.send(ambulance);
});

module.exports = router;
