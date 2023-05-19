const Patient = require('../models/patient');

exports.findByName = async (req, res) => {
  const patients = await Patient.find({ lastName: req.params.name });
  res.send(patients);
};

exports.groupByRoom = async (req, res) => {
  const patientsByRoom = await Patient.aggregate([
    {
      $group: {
        _id: '$room',
        patients: { $push: '$$ROOT' }
      }
    }
  ]);
  res.send(patientsByRoom);
};

exports.averageStay = async (req, res) => {
  const avgStay = await Patient.aggregate([
    {
      $group: {
        _id: null,
        averageStay: { $avg: '$stayDuration' }
      }
    }
  ]);
  res.send(avgStay);
};
