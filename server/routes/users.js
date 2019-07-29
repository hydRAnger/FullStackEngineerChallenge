const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const keys = require("../config/keys");

const validateSignInValue = require("../validation/signin");
const validateSignUpValue = require("../validation/signup");

const User = require("../models/User");

// API routes: signup(create user)
router.post("/signup", (req, res) => {
  const { errors, isValid } = validateSignUpValue(req.body);

  if (!isValid) {
    return res.status(400).json(errors);
  }

  User.findOne({ email: req.body.email }).then(user => {
    if (user) {
      return res
        .status(400)
        .json({ email: "This email address is already in use!" });
    }

    const newUser = new User({
      name: req.body.name,
      email: req.body.email,
      department: req.body.department,
      password: req.body.password
    });

    // Hash password before save it to DB
    bcrypt.genSalt(10, (err, salt) => {
      bcrypt.hash(newUser.password, salt, (err, hashValue) => {
        if (err) {
          throw err;
        }

        newUser.password = hashValue;
        newUser
          .save()
          .then(user => res.status(200).json(user))
          .catch(err => {
            console.error(err);
          });
      });
    });
  });
});

// API routes: signin
router.post("/signin", (req, res) => {
  const { errors, isValid } = validateSignInValue(req.body);

  if (!isValid) {
    return res.status(400).json(errors);
  }

  const email = req.body.email;
  const password = req.body.password;

  User.findOne({ email }).then(user => {
    if (!user) {
      return res.status(404).json({ email: "Email not found." });
    }

    bcrypt.compare(password, user.password).then(isMatch => {
      if (!isMatch) {
        return res.status(400).json({ password: "Wrong password." });
      }

      const payload = { id: user.id, _id: user._id, name: user.name, isAdmin: user.isAdmin };

      jwt.sign(
        payload,
        keys.secretOrKey,
        {
          expiresIn: 604800 // expires in 1 week
        },
        (err, token) => {
          res.status(200).json({
            success: true,
            token: `Bearer${token}`
          });
        }
      );
    });
  });
});

// API routes: fetch user by id
router.get("/get", (req, res) => {
  const _id = req.query._id;
  User.findOne({ _id }).then(user => {
    if (!user) {
      return res.status(404).json({ email: "User not found." });
    }
    return res.status(200).json({ user });
  });
});

// API routes: fetch user list
router.get("/list", (req, res) => {
  User.find().then(users => {
    return res.status(200).json({ users });
  });
});

// API routes: update user
router.put("/update", (req, res) => {
  User.findOne({ _id: req.body._id }).then(user => {
    if (!user) {
      return res.status(404).json({ email: "User not found." });
    }
    User.updateOne({ _id: req.body._id }, { $set: req.body }).then(user =>
      res.status(200).json(user)
    );
  });
});

// API routes: delete user
router.delete("/delete", (req, res) => {
  User.findOne({ _id: req.body._id }).then(user => {
    if (!user) {
      return res.status(404).json({ email: "User not found." });
    }
    User.deleteOne({ _id: user._id }).then(({ deletedCount }) => {
      if (deletedCount < 1) {
        return res
          .status(400)
          .json({ name: `User ${user.name} delete failed.` });
      }
      res.status(200).end();
    });
  });
});

module.exports = router;
