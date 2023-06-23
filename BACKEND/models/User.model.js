const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const newUser = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    username: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      requied: true,
    },
    dob: {
      type: Date,
      required: true,
    },
    designation: {
      type: String,
      required: true,
    },
    nic: {
      type: String,
      required: true,
    },
    birthCertificateNo: {
      type: String,
      required: true,
    },
    etfNo: {
      type: Number,
      required: true,
    },
    epfNo: {
      type: Number,
      required: true,
    },
    address: {
      type: String,
      required: true,
    },
    contact: {
      type: String,
      required: true,
    },
    leaveDates: {
      // date: { type: Date },
      type: Date,
    },

    annualCredits: {
      type: Number,
    },
    monthlyCredits: {
      type: Number,
    },
    baseSalary: {
      type: Number,
    },
    hoursWorked: {
      // hours: { type: Number },
      type: Number,
    },
  },
  {
    timestamps: true,
  }
);

const User = mongoose.model("User", newUser);

module.exports = User;
