const jwt = require("jsonwebtoken");
const express = require("express");
const mongoose = require("mongoose");
const patientRoutes = require("./routes/patientRoutes");
const staffRoutes = require("./routes/staffRoutes");
const roomRoutes = require("./routes/roomRoutes");
const ambulanceRoutes = require("./routes/ambulanceRoutes");
const appointmentRoutes = require("./routes/appointmentRoutes");
const billRoutes = require("./routes/billRoutes");
const ambulanceCallRoutes = require("./routes/ambulanceCallRoutes");
const userRoutes = require("./routes/userRoutes");

const dotenv = require("dotenv").config();

const { errorHandler } = require("./middleware/errorMiddleware");
//"mongodb://adminuser:123456@localhost/medical_database"

mongoose.connect(
  "mongodb+srv://admin:jib3XYHEFXUSQZtr@cluster0.r4rcesh.mongodb.net/medical_database?retryWrites=true&w=majority",
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  }
);

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use("/patients", patientRoutes);
app.use("/staff", staffRoutes);
app.use("/rooms", roomRoutes);
app.use("/ambulances", ambulanceRoutes);
app.use("/appointments", appointmentRoutes);
app.use("/bills", billRoutes);
app.use("/ambulanceCalls", ambulanceCallRoutes);
app.use("/users", userRoutes);

app.use(errorHandler);

app.listen(process.env.PORT, () =>
  console.log(`Listening on port ${process.env.PORT}`)
);
