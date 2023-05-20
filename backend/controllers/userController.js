const User = require("../models/user");
const Patient = require("../models/patient");
const Staff = require("../models/staff");
const asyncHandler = require("express-async-handler");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

exports.registerUser = asyncHandler(async (req, res) => {
  const { email, password, type, name, age, address } = req.body;
  console.log("register");

  if (!email || !name || !password || !type || !age || !address) {
    console.log(req.body);
    res.status(400);
    throw new Error("Check all fields");
  }

  console.log(email, name, password, type, age, address);

  if (typeof password !== "string" && !(password instanceof String)) {
    password = password.toString();
  }

  const userExists = await User.findOne({ email });

  if (userExists) {
    res.status(400);
    throw new Error("User already exists");
  }

  // Hash password
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);

  //Create patient
  const patient = await Patient.create({
    name: name,
    age: age,
    address: address,
    medicalHistory: [],
    currentCondition: null,
    room: null,
    appointments: [],
  });

  if (!patient) {
    res.status(400);
    throw new Error("Error creating patient");
  }

  //Create user
  const user = await User.create({
    email: email,
    password: hashedPassword,
    type: type,
    _staff: null,
    _patient: patient,
  });

  if (user) {
    res.status(201).json({
      _id: user.id,
      name: name,
      email: user.email,
      type: type,
      token: generateToken(user._id),
    });
  } else {
    res.status(400);
    throw new Error("Error creating user");
  }
});

exports.loginUser = asyncHandler(async (req, res) => {
  console.log("login");
  const { email, password } = req.body;

  // Check for user email
  const user = await User.findOne({ email });

  if (user && (await bcrypt.compare(password, user.password))) {
    const patient = await Patient.findOne({ _id: user._patient });
    res.status(201).json({
      _id: user.id,
      name: patient.name,
      email: user.email,
      type: user.type,
      token: generateToken(user._id),
    });
  } else {
    res.status(400);
    throw new Error("Error, invalid email or password");
  }
});

// Generate JWT
const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: "30d",
  });
};

exports.getMe = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user.id);
  let info;
  if (user._patient) {
    info = await Patient.findById(user._patient);
  } else {
    info = await Staff.findById(user._staff);
  }
  res.json({
    id: req.user.id,
    info: info,
  });
});
