const mongoose = require("mongoose");
const db = require("../models");

mongoose.connect(process.env.MONGODB_URI || "mongodb://localhost/project3", {
  useUnifiedTopology: true,
  useNewUrlParser: true,
  useCreateIndex: true,
});

console.log("Database connected");

const room = {
  number: 1,
  name: "Love Shack",
  rate: 100,
  capacity: 2,
  occupants: 2,
};

db.Store.create(room);
