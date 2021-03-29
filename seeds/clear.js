const mongoose = require("mongoose");
const db = require("./models");

mongoose.connect(process.env.MONGODB_URI || "mongodb://localhost/project3", {
  useUnifiedTopology: true,
  useNewUrlParser: true,
  useCreateIndex: true,
});

db.Room.deleteMany({}).then(() =>
  db.Reservation.deleteMany({}).then(() =>
    db.Activity.deleteMany({}).then(() =>
      db.User.deleteMany({}).then(() => {
        console.log("Clear");
        process.exit(0);
      })
    )
  )
);
