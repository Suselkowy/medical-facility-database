const mongoose = require("mongoose");
const Patient = require("./models/patient");
const Staff = require("./models/staff");
const Room = require("./models/room");
const Ambulance = require("./models/ambulance");
const Appointment = require("./models/appointment");
const Bill = require("./models/bill");
const AmbulanceCall = require("./models/ambulanceCall");

mongoose.connect(
  "mongodb+srv://admin:jib3XYHEFXUSQZtr@cluster0.r4rcesh.mongodb.net/medical_database?retryWrites=true&w=majority",
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  }
);

const startTime = new Date();
startTime.setDate(startTime.getDate() + 1); // Add 1 day
startTime.setHours(8, 0, 0, 0); // Set the time to 8:00

const endTime = new Date();
endTime.setDate(endTime.getDate() + 1); // Add 1 day
endTime.setHours(16, 0, 0, 0); // Set the time to 16:00

// Generate appointments every 30 minutes
const appointmentDuration = 30 * 60 * 1000; // 30 minutes in milliseconds
let currentTime = startTime;

// Function to create an appointment and save it to the database
const createAppointment = async (time, staffId) => {
  const appointment = new Appointment({
    time: time,
    patient: null,
    staff: staffId,
    status: "pending",
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
  const staffId = mongoose.Types.ObjectId("6488fbfa1717317d48088406");

  createAppointment(appointmentTime, staffId);

  currentTime.setTime(currentTime.getTime() + appointmentDuration);
}
