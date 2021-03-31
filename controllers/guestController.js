const db = require("../models");

module.exports = {
  login: function (req, res) {
    const { username, password } = req.body;
    //console.log(req.body);
    db.User.findOne({ username: username })
      .then((user) => res.json(user.comparePassword(password)))
      .catch((err) => res.json(false));
  },
  getRooms: function (req, res) {
    db.Room.find({}).then((data) => res.json(data));
  },
  findGuests: function (req, res) {
    db.Guest.find({})
      .populate({ path: "reservation", populate: { path: "room" } })
      .populate("activities")
      .then((guests) => {
        res.json(guests);
      });
  },
  getReservations: function (req, res) {
    db.Reservation.find({})
      .populate({ path: "room" })
      .then((data) => res.json(data));
  },
  createGuest: function (req, res) {
    //steps:
    //create reservation with sent dates and room id
    //create guest with returned reservation id
    console.log(req.body);
    //db.Guest.create(req.body).then((dbGuest) => res.json(dbGuest));
    res.json("test");
  },
};
