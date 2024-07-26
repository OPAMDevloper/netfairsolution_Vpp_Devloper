const mongoose = require('mongoose');

const feedbackSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  message: {
    type: String,
    required: true
  },
  // Add the new field here
  isRead: {
    type: Boolean,
    default: false // Default value set to false
  }
});

module.exports = mongoose.model('Feedback', feedbackSchema);
