const mongoose = require("mongoose");
const Patient = require("./models/patient");
const Staff = require("./models/staff");
const Room = require("./models/room");
const Ambulance = require("./models/ambulance");
const Appointment = require("./models/appointment");
const Bill = require("./models/bill");
const AmbulanceCall = require("./models/ambulanceCall");

mongoose.connect("mongodb://localhost/medical_database", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const startTime = new Date().setHours(8, 0, 0, 0); // Today at 8:00
const endTime = new Date().setHours(16, 0, 0, 0); // Today at 16:00

// Generate appointments every 30 minutes
const appointmentDuration = 30 * 60 * 1000; // 30 minutes in milliseconds
let currentTime = startTime;

// Function to create an appointment and save it to the database
const createAppointment = async (time, staffId) => {
  const appointment = new Appointment({
    time: time,
    patient: null,
    staff: staffId,
  });

  try {
    await appointment.save();
    console.log(`Created appointment at ${time}`);
  } catch (error) {
    console.error(`Failed to create appointment at ${time}: ${error}`);
  }
};

// Generate appointments
while (currentTime <= endTime) {
  const appointmentTime = new Date(currentTime);
  const staffId = mongoose.Types.ObjectId("6467698cefeb162c141fe5dc");

  createAppointment(appointmentTime, staffId);

  currentTime += appointmentDuration;
}
