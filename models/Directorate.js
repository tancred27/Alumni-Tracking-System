const mongoose = require("mongoose");

const DirSchema = mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  isCollege: {
    type: Boolean,
    default: false,
  },
  isUser: {
    type: Boolean,
    default: false,
  },
  isDirectorate: {
    type: Boolean,
    default: true,
  },
});

module.exports = mongoose.model("directorate", DirSchema);
