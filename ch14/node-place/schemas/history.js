const mongoose = require('mongoose');
const { Schema } = mongoose;

const historySchema = new Schema({
  query: {
    type: String,
    required: true
  },
  createAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('History', historySchema);