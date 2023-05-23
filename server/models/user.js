const mongoose = require('mongoose');

const User = mongoose.model('user', {
  _id: {
    type: String,
  },
  username: {
    type: String,
  },
  email: {
    type: String,
  },
  password: {
    type: String,
  },
});
module.exports = User;
