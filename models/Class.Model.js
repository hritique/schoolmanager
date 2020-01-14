const mongoose = require('mongoose');
const SubjectSchema = require('./Subject.Schema');

const ClassSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true
  },
  teacher: {
    type: String,
    required: false,
    default: ''
  },
  subjects: {
    type: [SubjectSchema]
  }
});

module.exports = Class = mongoose.model('class', ClassSchema);
