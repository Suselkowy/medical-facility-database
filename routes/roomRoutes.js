const express = require('express');
const router = express.Router();
const Room = require('../models/room');

router.get('/', async (req, res) => {
  const rooms = await Room.find().populate('patients');
  res.send(rooms);
});

router.post('/', async (req, res) => {
  const room = new Room(req.body);
  await room.save();
  res.send(room);
});

module.exports = router;
