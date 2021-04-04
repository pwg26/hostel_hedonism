const mongoose = require("mongoose");
const db = require("../models");

mongoose.connect(process.env.MONGODB_URI || "mongodb://localhost/project3", {
  useUnifiedTopology: true,
  useNewUrlParser: true,
  useCreateIndex: true,
});

console.log("Database connected");

const user = { username: "charles", password: "testpwd" };

db.User.create(user);

const testGuest = {
  role: "manager",
  firstName: "Charles",
  lastName: "Zoeller",
  country: "USA",
};

db.Guest.create(testGuest);

const testRoom = { number: 1, name: "test suite", rate: 40, capacity: 4 };
const testReservation = {
  checkIn: new Date(Date.now()),
  checkOut: new Date(Date.now() + 3 * 8.64e7),
};

db.Room.create(testRoom).then(({ _id }) => {
  testReservation.room = _id;
  db.Reservation.create(testReservation).then(({ _id }) => {
    db.Guest.findOneAndUpdate(
      { firstName: "Charles" },
      { reservation: _id },
      { new: true }
    ).then((res) => console.log("Reservation\n", res));
  });
});

const testActivity = {
  name: "hike",
  date: Date.now(),
  cost: 50,
  duration: 120,
  description: "Very Pretty",
};

db.Activity.create(testActivity).then(({ _id }) => {
  db.Guest.findOneAndUpdate(
    { firstName: "Charles" },
    { $push: { activities: _id } },
    { new: true }
  )
    .then((res) => console.log("Activity\n", res))
    .then(() => process.exit(0));
});
