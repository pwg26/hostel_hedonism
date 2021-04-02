const db = require("../models");
const mongoose = require("mongoose");
const { Reservation } = require("../models");

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
  roomsByGuests: function (req, res) {
    db.Guest.aggregate()
      .lookup({
        from: "reservations",
        localField: "reservation",
        foreignField: "_id",
        as: "reservations",
      })
      .lookup({
        from: "rooms",
        localField: "reservations.room",
        foreignField: "_id",
        as: "Room",
      })
      .group({
        _id: { $first: "$Room" },
        guests: {
          $push: {
            $mergeObjects: [
              {
                name: { $concat: ["$firstName", " ", "$lastName"] },
                checkIn: { $first: "$reservations.checkIn" },
                checkOut: { $first: "$reservations.checkOut" },
              },
            ],
          },
        },
      })
      .project({ room: "$_id", guests: "$guests" })
      .then((data) => {
        console.log(data);
        res.json(data);
      });
    // .group({
    //   _id: "$reservation",
    //   count: { $sum: 1 },
    //   name: { $first: "$firstName" },
    // })
    // .project({
    //   _id: "$_id",
    //   reservation: "$_id",
    //   name: "$name",
    // })
    // .then((data) => {
    //   db.Reservation.populate(data, {
    //     path: "reservation",

    //     populate: { path: "room" },
    //   }).then((reserves) => {
    //     console.log(reserves);
    //     // reserves
    //     //   .aggregate()
    //     //   .group({ _id: "$reservation.room", guests: { $push: "$name" } })
    //     //   .then((grouped) => console.log(grouped));
    //   });
    //   //console.log(data);
    //   res.json(data);
    // })
    // .catch((err) => console.log(err));
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
};
