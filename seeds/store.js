const mongoose = require("mongoose");
const db = require("../models");

mongoose.connect(process.env.MONGODB_URI || "mongodb://localhost/project3", {
  useUnifiedTopology: true,
  useNewUrlParser: true,
  useCreateIndex: true,
});

console.log("Database connected");

const items = [
  {
    name: 'charles',
    description: 'meast',
    cost: 1000000000000,
    stock: 1,
  },
  {
    name: 'Pierce',
    description: 'great',
    cost: 100000000,
    stock: 20,
  },
];
items.map((item) => db.Store.create(item));
