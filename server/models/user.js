const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    unique: true,
    required: [true, "Email is required"],
    lowercase: true,
    min: [5, "Email must be atleast 5 characters"],
    max: [255, "Email can't exceed 255 characters"]
  },
  password: {
    type: String,
    max: [1026, "Password is too long."],
    required: [true, "Password is required"]
  },
  userName: {
    type: String,
    required: [true, "Username is required"],
    min: [5, "Username must be atleast 3 characters"],
    max: [255, "Username can't exceed 255 characters"]
  },
  address: {
    type: String,
    required: [true, "Address is required"],
    max: [255, "Address can't exceed 255 characters"]
  },
  city: {
    type: String,
    required: [true, "City is required"],
    max: [255, "City can't exceed 255 characters"]
  },
  postalCode: {
    type: String,
    required: [true, "Postal Code is required"],
    max: [255, "Postal Code can't exceed 255 characters"]
  },
  phoneNumber: {
    type: String,
    required: [true, "Phone number is required"],
    max: [255, "Username can't exceed 255 characters"]
  }
});

const User = mongoose.model("User", userSchema, "users");

module.exports = User;
