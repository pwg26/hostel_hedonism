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
      .populate("purchases")
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

  addToGuest: function (req, res) {
    console.log(req.params.id);
    console.log(req.body.item);
    console.log(req.body.type);
    if (req.body.type === "Store") {
      db.Guest.updateMany(
        { _id: req.params.id },
        {
          $push: { purchases: req.body.item },
        }
      ).then((data) => {
        console.log(data);
        res.json(data);
      });
    } else if (req.body.type === "Activity") {
      db.Guest.updateMany(
        { _id: req.params.id },
        {
          $push: { activities: req.body.item },
        }
      ).then((data) => {
        console.log(data);
        res.json(data);
      });
    } else if (req.body.type === "RemoveA") {
      var arrIndex = `activities.${req.body.item}`;

      db.Guest.findOneAndUpdate(
        { _id: req.params.id },
        { $unset: { [arrIndex]: 1 } }
      )
        .then((data) =>
          db.Guest.findOneAndUpdate(
            { _id: data.id },
            { $pull: { activities: null } }
          )
        )
        .then((data) => {
          console.log(data);
          res.json(data);
        });
    } else if (req.body.type === "RemoveS") {
      var arrIndex = `purchases.${req.body.item}`;

      db.Guest.findOneAndUpdate(
        { _id: req.params.id },
        { $unset: { [arrIndex]: 1 } }
      )
        .then((data) =>
          db.Guest.findOneAndUpdate(
            { _id: data.id },
            { $pull: { purchases: null } }
          )
        )
        .then((data) => {
          console.log(data);
          res.json(data);
        });
    } else {
      res.json(404);
    }
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
    }).then((result) => {
      console.log("DONE");
      console.log(result);
      let removed = result._id;
      console.log(removed);
      db.Guest.updateMany(
        {},
        {
          $pull: { purchases: removed },
        }
      ).then((data) => {
        console.log(data);
      });
      res.json(req.params.id);
    });
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

  updateActivity: function (req, res) {
    console.log(req.body);
    db.Activity.findOneAndUpdate(
      { _id: req.body.id },
      {
        title: req.body.title,
        cost: req.body.cost,
        startDate: req.body.startDate,
        endDate: req.body.endDate,
        location: req.body.location,
        notes: req.body.notes,
      }
    ).then((data) => res.json(data));
  },
  deleteActivity: function (req, res) {
    console.log(req.params.id);
    db.Activity.findOneAndRemove({
      _id: mongoose.Types.ObjectId(req.params.id),
      //Pases removed object to .then
    }).then((result) => {
      console.log("DONE");
      console.log(result);
      let removed = result._id;
      console.log(removed);
      db.Guest.updateMany(
        {},
        {
          $pull: { activities: removed },
        }
      ).then((data) => {
        console.log(data);
      });
      res.json(req.params.id);
    });
  },
};
