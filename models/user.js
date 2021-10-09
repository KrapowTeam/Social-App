const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  checkLogin: {
    count: Number,
    delayTime: Number,
  },
  expirePasswordDate: {
    type: Number,
    required: true,
  },
});

mongoose.model('User', userSchema);
