const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const roomSchema = new Schema({
  number: {
    type: Number,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  rate: {
    type: Number,
    required: true,
  },
  capacity: {
    type: Number,
    required: true,
  },
  occupants: {
    type: Number,
    required: true,
    default: 0,
  },
});

const Room = mongoose.model("Room", roomSchema);

module.exports = Room;
