const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const guestSchema = new Schema({
  role: {
    type: String,
    required: false,
  },
  firstName: {
    type: String,
    required: true,
  },
  lastName: {
    type: String,
    required: true,
  },
  country: {
    type: String,
    required: true,
  },
  checkedIn: {
    type: Boolean,
    required: false,
    default: false,
  },
  paid: {
    type: Boolean,
    required: false,
    default: false,
  },
  reservations: [
    {
      type: Schema.Types.ObjectId,
      ref: "Reservation",
    },
  ],
  activities: [
    {
      type: Schema.Types.ObjectId,
      ref: "Activity",
    },
  ],
});

const Guest = mongoose.model("Guest", guestSchema);

module.exports = Guest;
