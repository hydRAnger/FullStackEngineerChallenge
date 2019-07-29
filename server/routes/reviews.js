const express = require("express");
const router = express.Router();

const Review = require("../models/Review");
const User = require("../models/User");

// API routes: create review
router.post("/create", (req, res) => {
  const assign = req.body.assign;
  const target = req.body.target;
  User.findOne({ _id: assign }).then(user => {
    if (!user) {
      return res.status(404).json({ message: "Assign user not found." });
    }
  });

  User.findOne({ _id: target }).then(user => {
    if (!user) {
      return res.status(404).json({ message: "Target user not found." });
    }
  });

  Review.findOne({ assign: req.body.assign, target: req.body.target }).then(
    review => {
      if (review) {
        return res.status(400).json({ message: "Review is already exsits." });
      }

      const newReview = new Review({
        assign,
        target,
        rating: 0,
        comment: "",
        createdAt: Date.now(),
        done: false,
        doneAt: ""
      });
      newReview
        .save()
        .then(review => res.status(200).json(review))
        .catch(err => {
          console.error(err);
        });
    }
  );
});

// API routes: fetch reviews assign to a user
router.get("/assignments", (req, res) => {
  const _id = req.query._id;
  User.findOne({ _id }).then(user => {
    if (!user) {
      return res.status(404).json({ message: "User not found." });
    }

    Review.find({ assign: _id, done: false }).then(reviews => {
      res.status(200).json({ reviews });
    });
  });
});

// API routes: fetch reviews of a user
router.get("/received", (req, res) => {
  const _id = req.query._id;
  User.findOne({ _id }).then(user => {
    if (!user) {
      return res.status(404).json({ message: "User not found." });
    }
    Review.find({ target: _id, done: true }).then(reviews => {
      res.status(200).json({ reviews });
    });
  });
});

// API routes: submit review
router.post("/submit", (req, res) => {
  User.findOne({ _id: req.body.assign }).then(user => {
    if (!user) {
      return res.status(404).json({ message: "Assign user not found." });
    }
  });

  User.findOne({ _id: req.body.target }).then(user => {
    if (!user) {
      return res.status(404).json({ message: "Target user not found." });
    }
  });

  Review.findOne({ _id: req.body._id }).then(review => {
    if (review.done) {
      return res.status(400).json({ message: "This review has already done." });
    }
    Review.updateOne(
      { _id: req.body._id },
      { $set: { ...req.body, done: true, doneAt: Date.now() } }
    ).then(review => res.status(200).json(review));
  });
});

// API routes: delete review
router.delete("/delete", (req, res) => {
  Review.findOne({ _id: req.body._id }).then(review => {
    if (!review) {
      res.status(404).json({ message: "Review not found." });
    }

    Review.deleteOne({ _id: req.body._id }).then(({ deletedCount }) => {
      if (deletedCount < 1) {
        return res
          .status(400)
          .json({ name: `Review ${req.body._id} delete failed.` });
      }
      res.status(200).end();
    });
  });
});

module.exports = router;
