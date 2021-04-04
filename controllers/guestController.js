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

  // Guest controller ============================================================================
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
    console.log(req.body);
    db.Guest.findOneAndUpdate({ _id: req.body.id }, req.body.guest).then(
      (guest) => {
        db.Reservation.findOneAndUpdate(
          { _id: guest.reservation },
          req.body.reservation
        ).then((data) => res.json(data));
      }
    );
  },

  //  Room query controller ====================================================================
  roomsByGuests: function (req, res) {
    //NEWER
    db.Room.aggregate()
      .lookup({
        from: "reservations",
        localField: "_id",
        foreignField: "room",
        as: "reservations",
      })
      .lookup({
        from: "guests",
        localField: "reservations._id",
        foreignField: "reservation",
        as: "Guests",
      })
      .group({
        _id: "$$ROOT",

        guests: {
          $mergeObjects: {
            further: {
              $map: {
                input: { $zip: { inputs: ["$Guests", "$reservations"] } },
                as: "guest",
                in: {
                  $mergeObjects: [
                    { $arrayElemAt: ["$$guest", 1] },
                    { $arrayElemAt: ["$$guest", 0] },
                  ],
                },
              },
            },
          },
        },
      })
      .project({
        _id: "$_id._id",
        name: "$_id.name",
        number: "$_id.number",
        rate: "$_id.rate",
        capacity: "$_id.capacity",
        guests: {
          $map: {
            input: "$guests.further",
            as: "guest",
            in: {
              $mergeObjects: [
                { firstName: "$$guest.firstName" },
                { lastName: "$$guest.lastName" },
                { checkIn: "$$guest.checkIn" },
                { checkOut: "$$guest.checkOut" },
              ],
            },
          },
        },
      })
      .then((data) => {
        console.log(data);
        res.json(data);
      })
      .catch((err) => console.log(err));
  },

  // Item Controller ==============================================================

  findItems: function (req, res) {
    db.Store.find({}).then((data) => res.json(data));
  },
  createItem: function (req, res) {
    console.log("CREATE ITEM");
    console.log(req.body);
    //create reservation with sent dates and room id
    db.Store.create({
      ...req.body.item,
    }).then((room) => res.json(room));
  },

  updateItem: function (req, res) {
    console.log("UPDATE");
    console.log(req.body);
    db.Store.findOneAndUpdate(
      { _id: req.body.id },
      req.body.item
    ).then((data) => res.json(data));
  },
  deleteItem: function (req, res) {
    console.log(req.params.id);
    db.Store.findOneAndRemove({
      _id: mongoose.Types.ObjectId(req.params.id),
    }).then((result) => res.json(req.params.id));
  },

  // Room ========================================================================
  findRooms: function (req, res) {
    db.Room.find({}).then((data) => res.json(data));
  },

  createRooms: function (req, res) {
    console.log("ADD");
    console.log(req.body);
    //create room with sent dates and room id
    db.Room.create({
      ...req.body.room,
    }).then((room) => res.json(room));
  },

  updateRoom: function (req, res) {
    console.log("UPDATE");
    console.log(req.body);
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
  // activities========================================================
  findActivities: function (req, res) {
    db.Activity.find({}).then((data) => res.json(data));
  },
  createActivity: function (req, res) {
    console.log("CREATE act");
    console.log(req.body);
    //create activity with sent dates and room id
    db.Activity.create({
      ...req.body,
    }).then((added) => res.json(added));
  },
};
