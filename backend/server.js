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

mongoose.connect("mongodb://localhost/medical_database", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

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

// LOGOWANIE BELOW

// app.post('/login', (req, res) => {
//   // Uwaga: W prawdziwej aplikacji powinieneś sprawdzić dane logowania użytkownika (np. hasło) z danymi przechowywanymi w bazie danych
//   const user = {
//     id: 1,
//     username: req.body.username,
//     role: 'admin'
//   };

//   // Generowanie tokenu JWT
//   const token = jwt.sign(user, 'your_secret_key', { expiresIn: '1h' });

//   // Wysłanie tokenu do klienta
//   res.json({ token });
// });

// app.listen(3001, () => console.log('Server started on port 3001'));

// // // // // chyba React.js kij wie jak to ma być
// import React, { useState } from 'react';
// import axios from 'axios';

// function Login() {
//   const [username, setUsername] = useState('');
//   const [password, setPassword] = useState('');

//   const handleSubmit = async e => {
//     e.preventDefault();

//     const response = await axios.post('/login', {
//       username: username,
//       password: password
//     });

//     localStorage.setItem('token', response.data.token);
//   };

//   return (
//     <form onSubmit={handleSubmit}>
//       <input
//         type="text"
//         value={username}
//         onChange={e => setUsername(e.target.value)}
//         placeholder="Username"
//       />
//       <input
//         type="password"
//         value={password}
//         onChange={e => setPassword(e.target.value)}
//         placeholder="Password"
//       />
//       <button type="submit">Log In</button>
//     </form>
//   );
// }

// export default Login;
