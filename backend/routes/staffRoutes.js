const express = require("express");
const router = express.Router();
const Staff = require("../models/staff");

const { protect, roleProtect } = require("../middleware/authMiddleware");
const staffController = require("../controllers/staffController");

router.get("/", async (req, res) => {
  const staff = await Staff.find().populate("appointments");
  res.send(staff);
});

router.get("/specialities", protect, staffController.getSpecialities);

router.post("/", async (req, res) => {
  const staffMember = new Staff(req.body);
  await staffMember.save();
  res.send(staffMember);
});

router.get("/:id/appointments", protect, staffController.getAppointments);

router.put(
  "/appointments/:status/:id",
  protect,
  staffController.updateAppointmentStaff
);

module.exports = router;
