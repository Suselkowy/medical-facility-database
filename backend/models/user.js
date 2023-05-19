const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  role: {
    type: String,
    enum: ["patient", "doctor"],
    default: "patient",
  },
  _staff: { type: mongoose.Schema.Types.ObjectId, ref: "Staff" },
  _patient: { type: mongoose.Schema.Types.ObjectId, ref: "Patient" },
});

const User = mongoose.model("User", userSchema);

module.exports = User;
