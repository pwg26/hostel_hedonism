const db = require("../models");

module.exports = {
  login: function (req, res) {
    const { username, password } = req.body;
    db.User.findOne({ username: username }).then((user) =>
      res.json(user.comparePassword(password))
    );
  },
};
