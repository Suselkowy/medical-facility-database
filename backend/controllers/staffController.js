const Staff = require("../models/staff");
const asyncHandler = require("express-async-handler");

exports.getSpecialities = asyncHandler(async (req, res) => {
  const specialities = await Staff.distinct("speciality");
  res.send(specialities);
});
