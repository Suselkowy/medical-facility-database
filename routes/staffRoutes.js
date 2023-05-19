const express = require('express');
const router = express.Router();
const Staff = require('../models/staff');

router.get('/', async (req, res) => {
  const staff = await Staff.find().populate('appointments');
  res.send(staff);
});

router.post('/', async (req, res) => {
  const staffMember = new Staff(req.body);
  await staffMember.save();
  res.send(staffMember);
});

module.exports = router;
