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
    stock: 12,
  },
  {
    name: 'Kristen',
    description: 'fantastic',
    cost: 100000000000,
    stock: 23,
  },
  {
    name: 'Dante',
    description: 'cool',
    cost: 10000000000,
    stock: 34,
  },
  {
    name: 'Luna',
    description: 'hyper',
    cost: 1000000000,
    stock: 56,
  },
];
items.map((item) => db.Store.create(item));
