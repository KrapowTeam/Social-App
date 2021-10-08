const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const requireLogin = require('../middleware/requireLogin');
const Post = mongoose.model('Post');

router.get('/allpost', requireLogin, (req, res) => {
  Post.find()
    .populate('postedBy', '_id name')
    .then((posts) => {
      res.json({ posts });
    })
    .catch((err) => {
      console.log(err);
      res.status(400).json({ error: err });
    });
});

router.post('/createpost', requireLogin, (req, res) => {
  const { title, body, img } = req.body;
  console.log('req.body', req.body);
  if (!title || !body || !img) {
    return res.status(422).json({ error: 'Please add all the fields' });
  }
  req.user.password = undefined;
  const post = new Post({
    title,
    body,
    photo: img,
    postedBy: req.user,
  });
  post
    .save()
    .then((result) => {
      res.json({ post: result });
    })
    .catch((err) => {
      console.log(err);
    });
});

router.get('/myposts', requireLogin, (req, res) => {
  Post.find({ postedBy: req.user._id })
    .populate('postedBy', '_id name')
    .then((mypost) => {
      res.json({ mypost });
    })
    .catch((err) => {
      console.log(err);
      res.json(401).json({ error: err });
    });
});

module.exports = router;
