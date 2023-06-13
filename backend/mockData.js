
const mongoose = require("mongoose");
const Patient = require("./models/patient");
const Staff = require("./models/staff");
const Room = require("./models/room");
const Ambulance = require("./models/ambulance");
const Appointment = require("./models/appointment");
const Bill = require("./models/bill");
const AmbulanceCall = require("./models/ambulanceCall");
//'mongodb://localhost/medical_database'
mongoose.connect(
  "mongodb+srv://admin:jib3XYHEFXUSQZtr@cluster0.r4rcesh.mongodb.net/medical_database?retryWrites=true&w=majority",
  {

    useNewUrlParser: true,
    useUnifiedTopology: true,
  }
);

async function createMockData() {
  // Mock data dla Pokoi
  const rooms = [
    new Room({
      roomNumber: 301,
      capacity: 2,
    }),
    new Room({
      roomNumber: 302,
      capacity: 1,
    }),
    new Room({
      roomNumber: 401,
      capacity: 3,
    }),
    new Room({
      roomNumber: 402,
      capacity: 1,
    }),
    new Room({
      roomNumber: 501,
      capacity: 2,
    }),
  ];

  // Mock data dla personelu
  const staffMembers = [
    new Staff({
      name: "Dr. Maria Nowicka",
      position: "Lekarz",
      speciality: "Dermatologia",
      workingHours: ["8:00-16:00", "9:00-17:00"],
    }),
    new Staff({
      name: "Piel. Paweł Kaczmarek",
      position: "Pielęgniarka",
      workingHours: ["6:00-14:00", "14:00-22:00"],
    }),
    new Staff({
      name: "Dr. Andrzej Wiśniewski",
      position: "Lekarz",
      speciality: "Chirurgia",
      workingHours: ["10:00-18:00", "11:00-19:00"],
    }),
  ];

  // Mock data dla karetek
  const ambulances = [
    new Ambulance({
      ambulanceNumber: 3,
      isAvailable: true,
      location: "Warszawa",
    }),
    new Ambulance({
      ambulanceNumber: 4,
      isAvailable: true,
      location: "Gdańsk",
    }),
    new Ambulance({
      ambulanceNumber: 5,
      isAvailable: false,
      location: "Wrocław",
    }),
  ];

  // Mock data dla umówionych spotkań
  const appointments = [
    new Appointment({
      time: new Date(2023, 6, 11, 14, 30),
      patient: null,
      staff: staffMembers[0]._id,
    }),
    new Appointment({
      time: new Date(2023, 6, 12, 9, 0),
      patient: null,
      staff: staffMembers[1]._id,
    }),
    new Appointment({
      time: new Date(2023, 6, 13, 16, 0),
      patient: null,
      staff: staffMembers[2]._id,
    }),
  ];

  // Mock data dla wezwań karetek
  const ambulanceCalls = [
    new AmbulanceCall({
      time: new Date(2023, 6, 11, 14, 30),
      location: "Warszawa",
      patient: null,
      ambulance: ambulances[0]._id,
    }),
    new AmbulanceCall({
      time: new Date(2023, 6, 12, 9, 0),
      location: "Gdańsk",
      patient: null,
      ambulance: ambulances[1]._id,
    }),
    new AmbulanceCall({
      time: new Date(2023, 6, 13, 16, 0),
      location: "Wrocław",
      patient: null,
      ambulance: ambulances[2]._id,
    }),
  ];

  // Mock data dla rachunków
  const bills = [
    new Bill({
      patient: null,
      amount: 1500,
      isPaid: false,
      servicesRendered: ["Konsultacja", "Badanie krwi"],
    }),
    new Bill({
      patient: null,
      amount: 2000,
      isPaid: true,
      servicesRendered: ["Operacja"],
    }),
  ];

  const patients = [
    new Patient({
      name: "Ewa Kowalska",
      age: 32,
      address: "Warszawa, ul. Zielona 10",
      medicalHistory: ["Nadciśnienie", "Choroba tarczycy"],
      currentCondition: "Grypa",
      room: rooms[1]._id,
      appointments: [appointments[0]._id],
    }),
    new Patient({
      name: "Marcin Wiśniewski",
      age: 50,
      address: "Gdańsk, ul. Morska 7",
      medicalHistory: ["Cukrzyca", "Choroba serca"],
      currentCondition: "Zapalenie płuc",
      room: rooms[2]._id,
      appointments: [appointments[1]._id],
    }),
    new Patient({
      name: "Katarzyna Nowakowska",
      age: 28,
      address: "Wrocław, ul. Kwiatowa 3",
      medicalHistory: ["Astma"],
      currentCondition: "Migrena",
      room: rooms[3]._id,
      appointments: [appointments[2]._id],
    }),
  ];

  // Aktualizuj pola pacjenta w innych dokumentach
  appointments[0].patient = patients[0]._id;
  appointments[1].patient = patients[1]._id;
  appointments[2].patient = patients[2]._id;
  ambulanceCalls[0].patient = patients[0]._id;
  ambulanceCalls[1].patient = patients[1]._id;
  ambulanceCalls[2].patient = patients[2]._id;
  bills[0].patient = patients[0]._id;
  bills[1].patient = patients[1]._id;

  // Zapisz dane w bazie danych
  rooms.forEach((room) => room.save());
  staffMembers.forEach((staff) => staff.save());
  ambulances.forEach((ambulance) => ambulance.save());
  appointments.forEach((appointment) => appointment.save());
  ambulanceCalls.forEach((call) => call.save());
  bills.forEach((bill) => bill.save());
  patients.forEach((patient) => patient.save());

  console.log("Mock data added to database");
}

createMockData();
