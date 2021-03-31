const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const storeSchema = new Schema({
  id: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  cost: {
    type: Number,
    required: true,
  },
  quantity: {
    type: Number,
    required: true,
  },
});

const Store = mongoose.model("Store", storeSchema);

module.exports = Store;
