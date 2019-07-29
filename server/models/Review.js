const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const ReviewSchema = new Schema({
  assign: {
    type: String,
    required: true
  },
  target: {
    type: String,
    required: true
  },
  rating: {
    type: Number,
    required: true,
    default: 0
  },
  comment: {
    type: String,
    default: ""
  },
  createdAt: {
    type: Number,
    required: true
  },
  done: {
    type: Boolean,
    required: true,
    default: false
  },
  doneAt: {
    type: Number
  }
});

module.exports = Review = mongoose.model("reviews", ReviewSchema);
