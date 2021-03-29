const db = require("../models");

module.exports = {
  login: function (req, res) {
    const { username, password } = req.body;
    db.User.findOne({ username: username }).then((user) =>
      res.json(user.comparePassword(password))
    );
  },
  getRooms: function (req, res) {
    db.Room.find({}).then((data) => res.json(data));
  },
  findGuest: function (req, res) {
    db.Guest.findOne(req.body)
      .populate({ path: "reservations", populate: { path: "room" } })
      .populate("activities")
      .then((guest) => res.json(guest));
  },
};
