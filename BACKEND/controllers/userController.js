const User = require("../models/User.model");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

//Register user
const registerUser = async (req, res) => {
  const {
    name,
    email,
    username,
    password,
    dob,
    designation,
    nic,
    birthCertificateNo,
    etfNo,
    epfNo,
    address,
    contact,
    leaveDates,
    annualCredits,
    monthlyCredits,
    baseSalary,
    hoursWorked,
  } = req.body;

  //check if user exists
  const userExists = await User.findOne({ username });

  if (userExists) {
    res.status(400);
    res.json("User already exists");
  } else {
    //encrypt password
    const salt = await bcrypt.genSalt(10);
    const hashedPwd = await bcrypt.hash(password, salt);

    //Adding user
    const user = await User.create({
      name,
      email,
      username,
      password: hashedPwd,
      dob,
      designation,
      nic,
      birthCertificateNo,
      etfNo,
      epfNo,
      address,
      contact,
      leaveDates,
      annualCredits,
      monthlyCredits,
      baseSalary,
      hoursWorked,
    });

    if (user) {
      res.status(201);
      res.json("User added");
    } else {
      res.status(400);
      res.json("Registration failed");
    }
  }
};

//Login user

const login = async (req, res) => {
  try {
    if (req.body && req.body.username && req.body.password) {
      const user = await User.findOne({ username: req.body.username });
      if (user) {
        if (await bcrypt.compareSync(req.body.password, user.password)) {
          //generate jwt token
          const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
            expiresIn: "1d",
          });

          res.status(200).json(token);
        } else {
          res.status(401).json({
            errorMessage: "Incorrect Password!",
            status: false,
          });
        }
      } else {
        res.status(401).json({
          errorMessage: "User not registered!",
          status: false,
        });
      }
    } else {
      res.status(401).json({
        errorMessage: "Please fill out the form!",
        status: false,
      });
    }
  } catch (e) {
    res.status(401).json({
      errorMessage: "Something went wrong!\n" + e,
      status: false,
    });
  }
};

//Get user
const getUser = async (req, res) => {
  const { _id, name, email, username, dob, designation } = await User.findById(
    req.user.id
  );

  res.status(200).json({
    id: _id,
    name,
    email,
    username,
    dob,
    designation,
  });
};

module.exports = {
  registerUser,
  login,
  getUser,
};
