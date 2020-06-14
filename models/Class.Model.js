const mongoose = require('mongoose');

const ClassSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true,
  },
  teacher: {
    type: String,
    required: false,
    default: '',
  },
});

module.exports = Class = mongoose.model('class', ClassSchema);
