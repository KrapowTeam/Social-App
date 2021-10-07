const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const User = mongoose.model('User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { JWT_SECRET } = require('../keys');
const requireLogin = require('../middleware/requireLogin');

router.get('/', (req, res) => {
  res.send('hello');
});

router.post('/signup', (req, res) => {
  const { name, email, password } = req.body;
  if (!email || !password || !name) {
    return res.status(422).json({ error: 'Please input all fields' });
  }
  User.findOne({ email: email, name: name })
    .then((savedUser) => {
      if (savedUser) {
        return res.status(422).json({ error: 'User already exists' });
      }
      bcrypt.hash(password, 12).then((hashedPass) => {
        const user = new User({
          email,
          password: hashedPass,
          name,
        });

        user
          .save()
          .then((user) => {
            res.json({ message: 'User Added', user: user });
          })
          .catch((err) => {
            console.log(err);
          });
      });
    })

    .catch((err) => {
      console.log(err);
    });
});

router.post('/login', (req, res) => {
  const { email, password } = req.body;
  console.log(email, password);
  if (!email || !password) {
    return res.status(422).json({ error: 'Please enter email or password' });
  }

  User.findOne({ email: email })
    .then((savedUser) => {
      if (!savedUser) {
        return res
          .status(422)
          .json({ error: 'Username or Password Incorrect' });
      }
      bcrypt.compare(password, savedUser.password).then((doMatch) => {
        if (doMatch) {
          // res.json({ message: 'Signin Successfully' });
          const token = jwt.sign({ _id: savedUser._id }, JWT_SECRET);
          const { _id, name, email } = savedUser;
          res.json({
            message: 'Successfully Login',
            user: { _id, name, email },
            token: token,
          });
        } else {
          return res
            .status(422)
            .json({ error: 'Username or Password Incorrect' });
        }
      });
    })
    .catch((err) => {
      console.log(err);
    });
});

module.exports = router;
