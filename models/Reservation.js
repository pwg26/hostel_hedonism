const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const reservationSchema = new Schema({
  room: { type: Schema.Types.ObjectId, ref: "Room", required: true },
  checkIn: {
    type: Date,
    required: false,
  },
  checkOut: {
    type: Date,
    required: false,
  },
  duration: {
    type: Number,
  },
});

const Reservation = mongoose.model("Reservation", reservationSchema);

module.exports = Reservation;
