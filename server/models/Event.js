
const mongoose = require('mongoose');

const eventSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true,
  },
  category: {
    type: String,
    required: true,
    default: 'work',
  },
  start: {
    type: Date,
    required: true,
  },
  end: {
    type: Date,
    required: true,
  },
  color: {
    type: String,
    required: true,
    default: '#2196F3',
  },
}, {
  timestamps: true,
});

module.exports = mongoose.model('Event', eventSchema);
