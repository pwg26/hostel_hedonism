const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const activitySchema = new Schema({
  name: {
    type: String,
    required: false,
  },
  date: {
    type: Date,
    required: false,
  },
  cost: {
    type: Number,
    required: false,
  },
  duration: {
    type: Number,
    required: false,
  },
  description: {
    type: String,
    required: false,
  },
});

const Activity = mongoose.model("Activity", activitySchema);

module.exports = Activity;
