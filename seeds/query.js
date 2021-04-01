const mongoose = require("mongoose");
const db = require("../models");

mongoose.connect(process.env.MONGODB_URI || "mongodb://localhost/project3", {
  useUnifiedTopology: true,
  useNewUrlParser: true,
  useCreateIndex: true,
});

console.log("Database connected");

db.Guest.findOne({})
  .populate({ path: "reservation", populate: { path: "room" } })

  .populate("activities")
  .then((res) => console.log(res, res.reservation));
