const mongoose = require('mongoose');

const emailSchema = new mongoose.Schema({
  subject: {
    type: String,
    required: true
  },
  body: {
    type: String,
    required: true
  },
  recipients: [{
    type: String,
    required: true
  }],
  status: {
    type: String,
    enum: ['sent', 'failed', 'partial'],
    default: 'sent'
  },
  successCount: {
    type: Number,
    default: 0
  },
  failedCount: {
    type: Number,
    default: 0
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('Email', emailSchema);
