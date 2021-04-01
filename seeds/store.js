const mongoose = require("mongoose");
const db = require("../models");

mongoose.connect(process.env.MONGODB_URI || "mongodb://localhost/project3", {
  useUnifiedTopology: true,
  useNewUrlParser: true,
  useCreateIndex: true,
});

console.log("Database connected");

const item = {
  name: "charles",
  description: "meast",
  cost: 1000000000000,
  quantity: 1,
};

db.Store.create(item);
