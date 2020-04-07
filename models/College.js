const mongoose = require("mongoose");

const CollegeSchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true,
  },
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
    default: true,
  },
  isUser: {
    type: Boolean,
    default: false,
  },
  isDirectorate: {
    type: Boolean,
    default: false,
  },
});

module.exports = mongoose.model("college", CollegeSchema);
