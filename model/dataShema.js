const mongoose = require("mongoose");

const dataSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, "Please add a title"],
  },
  content: {
    type: String,
    required: [true, "Please add some content"],
  },
});

const Model = mongoose.model("Data", dataSchema);
module.exports = Model;
