const mongoose = require('mongoose');
const FeeSchema = mongoose.Schema({
  student: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'students'
  },
  payment: {
    type: String,
    required: true
  },
  discount: {
    type: String
  },
  date: {
    type: Date,
    default: Date.now
  },
  description: {
    type: String
  }
});

module.exports = Fee = mongoose.model('fees', FeeSchema);
