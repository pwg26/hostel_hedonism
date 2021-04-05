const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const Guest = require("./Guest");

const activitySchema = new Schema({
  title: {
    type: String,
    required: true,
  },
  cost: {
    type: Number,
    required: false,
  },
  startDate: {
    type: Date,
    required: true,
  },
  endDate: {
    type: Date,
    required: true,
  },
  location: {
    type: String,
    required: true,
  },
  notes: {
    type: String,
    required: true,
  },
});

const Activity = mongoose.model("Activity", activitySchema);

module.exports = Activity;
