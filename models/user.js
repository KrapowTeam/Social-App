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
  checkOTP: {
    otp: { type: String, default: '' },
    expireTime: { Number, default: 0 },
  },
});

mongoose.model('User', userSchema);
