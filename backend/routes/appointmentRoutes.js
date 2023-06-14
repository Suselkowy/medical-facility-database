const express = require("express");
const router = express.Router();
const Appointment = require("../models/appointment");
const { protect, roleProtect } = require("../middleware/authMiddleware");

const appointmentController = require("../controllers/appointmentController");

router.get("/", protect, appointmentController.getAppointments);

router.get("/user", protect, appointmentController.getAppointmentUser);

router.put("/:id", protect, appointmentController.reserveAppointment);

router.put("/cancel/:id", protect, appointmentController.cancelAppointment);

module.exports = router;
