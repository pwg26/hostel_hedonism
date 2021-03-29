const mongoose = require("mongoose");
const db = require("../models");

mongoose.connect(process.env.MONGODB_URI || "mongodb://localhost/project3", {
  useUnifiedTopology: true,
  useNewUrlParser: true,
  useCreateIndex: true,
});

const user = { username: "charles", password: "testpwd" };

db.User.findOne({ username: "charles" })
  .then((res) =>
    console.log(res.comparePassword(user.password), res.comparePassword("test"))
  )
  .then(() => {
    process.exit(0);
  });
