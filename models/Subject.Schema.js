const mongoose = require('mongoose');

const SubjectSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true
  },
  priority: {
    type: Number
  }
});

module.exports = SubjectSchema;
