const mongoose = require('mongoose');

const Yacht = mongoose.model('yahcts', {
  id: {
    type: Number,
  },
  name: {
    type: String,
  },
  url: {
    type: String,
  },
  price: {
    type: String,
  },
  description: {
    type: String,
  },
  location: {
    type: String,
  },
  annee: {
    type: Number,
  },
  fabricant: {
    type: String,
  },
  modele: {
    type: String,
  },
  type: {
    type: String,
  },
  longueur: {
    type: String,
  },
  images: {
    type: Array,
  },
});
module.exports = Yacht;
