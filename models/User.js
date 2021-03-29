const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const bcrypt = require("bcryptjs");

const userSchema = new Schema({
  username: {
    type: String,
    required: true,
    minLength: 1,
    maxLength: 32,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
});

userSchema.pre("save", function (next) {
  if (!this.isModified("password")) return next();
  this.password = bcrypt.hashSync(this.password, bcrypt.genSaltSync(10), null);
  return next();
});

userSchema.methods.comparePassword = function (candidatePassword) {
  return bcrypt.compareSync(candidatePassword, this.password);
};

const User = mongoose.model("User", userSchema);

module.exports = User;
