const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const bcrypt = require("bcryptjs");

const userSchema = new Schema({});

const User = mongoose.model("User", userSchema);

module.exports = User;
