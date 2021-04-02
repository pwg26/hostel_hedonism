const db = require("../models");
const mongoose = require("mongoose");

module.exports = {
  login: function (req, res) {
    const { username, password } = req.body;
    //console.log(req.body);
    db.User.findOne({ username: username })
      .then((user) => res.json(user.comparePassword(password)))
      .catch((err) => res.json(false));
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
  deleteGuest: function (req, res) {
    console.log(req.params.id);
    db.Guest.findOneAndRemove({
      _id: mongoose.Types.ObjectId(req.params.id),
    })
      .then(({ reservation }) => db.Reservation.deleteOne({ _id: reservation }))
      .then((result) => res.json(req.params.id));
  },
  createGuest: function (req, res) {
    //steps:
    console.log(req.body);
    //create reservation with sent dates and room id
    db.Reservation.create(req.body.reservation).then(({ _id }) => {
      db.Guest.create({
        ...req.body.guest,
        reservation: _id,
        role: "manager",
      }).then((guest) => res.json(guest));
    });
  },
  updateGuest: function (req, res) {
    db.Guest.findOneAndUpdate({ _id: req.body.id }, req.body.guest).then(
      (guest) => {
        db.Reservation.findOneAndUpdate(
          { _id: guest.reservation },
          req.body.reservation
        ).then((data) => res.json(data));
      }
    );
  },
  findItems: function (req, res) {
    db.Store.find({}).then((data) => res.json(data));
  },
  createItem: function (req, res) {
    console.log(req.body);
    db.Guest.create(...req.body.item).then((dbItem) => res.json(dbItem));
    res.json("test");
  },

  findRooms: function (req, res) {
    db.Room.find({}).then((data) => res.json(data));
  },

  createRooms: function (req, res) {
    console.log(req.body);
    //create reservation with sent dates and room id
    db.Room.create({
      ...req.body.room,
    }).then((room) => res.json(room));
  },

  updateRoom: function (req, res) {
    db.Room.findOneAndUpdate({ _id: req.body.id }, req.body.room).then((data) =>
      res.json(data)
    );
  },
  deleteRoom: function (req, res) {
    console.log(req.params.id);
    db.Room.findOneAndRemove({
      _id: mongoose.Types.ObjectId(req.params.id),
    }).then((result) => res.json(req.params.id));
  },
};
