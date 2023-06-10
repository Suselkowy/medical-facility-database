const express = require("express");
const router = express.Router();
const Appointment = require("../models/appointment");
const { protect, roleProtect } = require("../middleware/authMiddleware");

const appointmentController = require("../controllers/appointmentController");

router.get(
  "/",
  protect,
  //roleProtect("staff"),
  appointmentController.getAppointments
);

router.put(
  "/:id",
  protect,
  //roleProtect("staff"),
  appointmentController.reserveAppointment
);

// router.post("/", async (req, res) => {
//   const appointment = new Appointment(req.body);
//   await appointment.save();
//   res.send(appointment);
// });

module.exports = router;
