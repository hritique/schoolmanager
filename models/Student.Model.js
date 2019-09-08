const mongoose = require('mongoose');
const StudentSchema = mongoose.Schema({
  sid: {
    type: String,
    required: true,
    unique: true
  },
  name: {
    type: String,
    required: true
  },
  dob: {
    type: Date,
    required: true
  },
  grade: {
    type: String,
    required: true
  },
  father: {
    name: {
      type: String
    }
  },
  mother: {
    name: {
      type: String
    }
  },
  mobile: {
    type: String
  },
  address: {
    type: String
  },
  fees: {
    type: [mongoose.Schema.Types.ObjectId],
    ref: 'fees'
  }
});

module.exports = Student = mongoose.model('student', StudentSchema);
