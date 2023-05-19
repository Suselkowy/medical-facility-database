const express = require('express');
const router = express.Router();
const Patient = require('../models/patient');
const patientController = require('../controllers/patientController');

router.get('/', async (req, res) => {
  const patients = await Patient.find().populate('room appointments');
  res.send(patients);
});

router.post('/', async (req, res) => {
  const patient = new Patient(req.body);
  await patient.save();
  res.send(patient);
});

router.get('/find/:name', patientController.findByName);
router.get('/groupbyroom', patientController.groupByRoom);
router.get('/averagestay', patientController.averageStay);

module.exports = router;