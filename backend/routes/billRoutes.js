const express = require('express');
const router = express.Router();
const Bill = require('../models/bill');

router.get('/', async (req, res) => {
  const bills = await Bill.find().populate('patient');
  res.send(bills);
});

router.post('/', async (req, res) => {
  const bill = new Bill(req.body);
  await bill.save();
  res.send(bill);
});

module.exports = router;
