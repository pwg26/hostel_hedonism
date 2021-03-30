const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const reservationSchema = new Schema({
  room: { type: Schema.Types.ObjectId, ref: "Room", required: true },
  checkIn: {
    type: Date,
    required: true,
  },
  checkOut: {
    type: Date,
    required: true,
  },
  duration: {
    type: Number,
  },
});

const Reservation = mongoose.model("Reservation", reservationSchema);

module.exports = Reservation;
