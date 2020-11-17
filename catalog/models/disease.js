const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const diseaseSchema = new Schema({
  name: {
    type: String,
    lowercase: true,
    required: true
  },
  symptoms: {
    type: String,
    required: true
  },
  imagesUrl: {
    type: Object
  },
  treatment: {
    type: String,
    required: true
  }
}, { timestamps: true });

module.exports = mongoose.model('Disease', diseaseSchema);