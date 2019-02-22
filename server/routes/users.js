const mongoose = require("mongoose");
const express = require("express");
const router = express.Router();
const Joi = require("joi");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require(".././models/user");
const auth = require("../middleware/auth");

function validationMessages(field, errors, type) {
  errors.forEach(error => {
    if (type === "str" || "string") {
      switch (error.type) {
        case "any.empty":
          error.message = `${field} should not be empty`;
          break;
        case "string.min":
          error.message = `${field} should be atleast ${
            error.context.limit
          } characters.`;
        case "string.max":
          error.message = `${field} should have at most ${
            error.context.limit
          } characters.`;
        default:
          break;
      }
    }
    if (type === "nmb" || "number") {
      switch (error.type) {
        case "any.empty":
          error.message = `${field} should not be empty`;
          break;
        case "number.base":
          error.message = `${field} can contain only numbers`;
          break;
        case "number.min":
          error.message = `${field} should be atleast ${
            error.context.limit
          } characters.`;
        case "number.max":
          error.message = `${field} should have at most ${
            error.context.limit
          } characters.`;
        default:
          break;
      }
    }
    if (type === "email" || "Email") {
      switch (error.type) {
        case "any.empty":
          error.message = `${field} should not be empty.`;
          break;
        case "string.min":
          error.message = `${field} should have at least ${
            error.context.limit
          } characters.`;
          break;
        case "string.max":
          error.message = `${field} should have at most ${
            error.context.limit
          } characters.`;
          break;
        case "string.email":
          error.message = `You must enter a valid ${field}.`;
          break;
        default:
          break;
      }
    } else throw new Error("validationMessages: invalid type argument.");
  });
  return errors;
}

// Joi validating parameter against schema
function validateUserOnRegister(user) {
  const schema = {
    email: Joi.string()
      .min(5)
      .max(255)
      .email()
      .required()
      .error(errors => validationMessages("Email", errors, "email")),
    password: Joi.string()
      .min(3)
      .required()
      .error(errors => validationMessages("Password", errors, "string")),
    userName: Joi.string()
      .min(3)
      .max(255)
      .required()
      .error(errors => validationMessages("Username", errors, "string")),
    address: Joi.string()
      .min(5)
      .max(255)
      .required()
      .error(errors => validationMessages("Address", errors, "string")),
    city: Joi.string()
      .min(3)
      .max(255)
      .required()
      .error(errors => validationMessages("City", errors, "string")),
    postalCode: Joi.number()
      .min(2)
      .required()
      .error(errors => validationMessages("Postal code", errors, "number")),
    phoneNumber: Joi.number()
      .min(3)
      .required()
      .error(errors => validationMessages("Phone number", errors, "number"))
  };
  return Joi.validate(user, schema);
}

// Joi login validation
function validateUser(user) {
  const schema = {
    email: Joi.string()
      .min(5)
      .max(255)
      .email()
      .required()
      .error(errors => validationMessages("Email", errors, "email")),
    password: Joi.string()
      .min(3)
      .max(1026)
      .required()
      .error(errors => validationMessages("Password", errors, "string"))
  };
  return Joi.validate(user, schema);
}

// Joi save validation
function validateUserOnSave(user) {
  const schema = {
    email: Joi.string()
      .min(5)
      .max(255)
      .email()
      .required()
      .error(errors => validationMessages("Email", errors, "email")),
    address: Joi.string()
      .min(5)
      .max(255)
      .required()
      .error(errors => validationMessages("Address", errors, "string")),
    city: Joi.string()
      .min(3)
      .max(255)
      .required()
      .error(errors => validationMessages("City", errors, "string")),
    postalCode: Joi.number()
      .min(2)
      .required()
      .error(errors => validationMessages("Postal code", errors, "number")),
    userName: Joi.string()
      .min(3)
      .max(255)
      .required()
      .error(errors => validationMessages("Username", errors, "string")),
    phoneNumber: Joi.number()
      .min(3)
      .required()
      .error(errors => validationMessages("Phone number", errors, "number")),
    decoded: Joi.object()
  };
  return Joi.validate(user, schema);
}

// Login
router.post("/login", async (req, res) => {
  try {
    const { error } = validateUser(req.body);

    // Find account whose email matches an email in database
    if (error) return res.status(400).json({ msg: error.details[0].message });
    const user = await User.findOne({
      email: req.body.email
    });
    if (!user)
      return res.status(400).json({ msg: "Invalid email or password" });

    // Compare password in request and hashed password in database
    const match = await bcrypt.compare(req.body.password, user.password);
    if (!match)
      return res.status(400).json({ msg: "Invalid email or password" });

    // User authenticated, send json web token
    if (match && user) {
      // Create and send json web token if password and user email match
      jwt.sign(
        { id: user._id, email: user.email },
        process.env.JWT_PRIVATE_KEY,
        { expiresIn: "30m" },
        (err, token) => {
          if (err) {
            console.log(err);
            return res.status(500).json({ msg: "Token creation failed" });
          } else {
            res.status(200).send({ token: token });
          }
        }
      );
      console.log(user);
    }
  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
});

// Register
router.post("/register", async (req, res) => {
  try {
    console.log(req.body);
    const { error } = validateUserOnRegister(req.body);
    console.log(error);
    if (error) return res.status(400).json({ msg: error.details[0].message });

    let user = await User.findOne({ email: req.body.email });
    if (user) return res.status(400).json({ msg: "Email already registered." });

    user = new User({
      email: req.body.email,
      password: req.body.password,
      userName: req.body.userName,
      address: req.body.address,
      city: req.body.city,
      postalCode: req.body.postalCode,
      phoneNumber: req.body.phoneNumber
    });
    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(user.password, salt);
    const result = await user.save();
    console.log(result);
    res.status(200).json({
      msg: `Account created. Your login is ${result.email}`
    });
  } catch (err) {
    console.log(err.message);
    res.status(400).json(err.message);
  }
});

// Save changes
router.post("/save", auth, async (req, res) => {
  try {
    console.log(req.body);
    const { error } = validateUserOnSave(req.body);
    if (error) return res.status(400).json({ msg: error.details[0].message });
    const {
      email,
      city,
      address,
      postalCode,
      userName,
      phoneNumber
    } = req.body;

    let user = await User.findOne({ email: email });
    user.set({
      city: city,
      address: address,
      postalCode: postalCode,
      userName: userName,
      phoneNumber: phoneNumber
    });
    const result = await user.save();

    console.log(result);
    res.status(200).json({ msg: "Update successful" });
  } catch (err) {
    console.log(err.message);
    res.status(400).json({ msg: err.message });
  }
});

// User info route
router.get("/me", auth, async (req, res) => {
  const email = req.body.decoded.email;
  const id = req.body.decoded.id;
  try {
    const result = await User.findById(id).select("-password");

    res.status(200).send(result);
  } catch (err) {
    res.status(500).send("Internal server error");
    console.log(err);
  }
});

module.exports = router;
