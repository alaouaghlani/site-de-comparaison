const { Schema } = require('mongoose');
const mongoose = require('mongoose');

const Yacht = mongoose.model(
  'yachts',
  {
    _id: {
      type: Number,
    },
    Nom: {
      type: String,
    },
    Url: {
      type: String,
    },
    Prix: {
      type: String,
    },
    Description: {
      type: String,
    },
    Location: {
      type: String,
    },
    Année: {
      type: String,
    },
    Fabricant: {
      type: String,
    },
    Modèle: {
      type: String,
    },
    Type: {
      type: String,
    },
    Longueur: {
      type: String,
    },
    images: [
      {
        type: Schema.Types.ObjectId,
        ref: 'File',
      },
    ],
  },
  'yachts'
);

module.exports = Yacht;
