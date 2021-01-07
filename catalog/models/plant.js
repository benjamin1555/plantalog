const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const plantSchema = new Schema({
    species: {
      type: String,
      lowercase: true,
      required: true
    },
    variety: {
      type: String,
      lowercase: true,
    },
    imagesUrl: {
      type: Object
    },
    plantationType: {
      type: String,
      lowercase: true,
      required: true
    },
    plantationDate: {
      start: {
        type: Date,
        required: true
      },
      end: {
        type: Date,
        required: true
      }
    },
    harvestDate: {
      start: {
        type: Date
      },
      end: {
        type: Date,
      }
    },
    beneficialInteractions: [{
      type: Schema.Types.ObjectId,
      ref: 'Plant'
    }],
    harmfulInteractions: [{
      type: Schema.Types.ObjectId,
      ref: 'Plant'
    }],
    diseases: [{
      type: Schema.Types.ObjectId,
      ref: 'Disease'
    }],
    notes: {
      type: String
    }
  }, { timestamps: true }
);

module.exports = mongoose.model('Plant', plantSchema);