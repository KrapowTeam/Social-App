const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const requireLogin = require('../middleware/requireLogin');
const Log = mongoose.model('Log');
const moment = require('moment');

router.get('/logs', (req, res) => {
  let Now = new Date(new Date().getTime() + 1000 * 60 * 60 * 7);
  console.log('Now: ', Now);
  let mysort = { _id: -1 };
  Log.find()
    .sort(mysort)
    .then((logs) => {
      const now = new Date();

      const updatedData = logs.map((x) => {
        const elementsIndex = logs.findIndex(
          (element) => element.time === x.time
        );
        let newarr = [...logs];
        newarr[elementsIndex] = {
          ...newarr[elementsIndex],
          time: moment(x.time).from(moment(Now)),
        };
        return newarr;
      });

      // let up = logs.map((x) => {
      //   console.log('before', x.test);
      //   const elementsIndex = this.state.todos.findIndex(element => element.id == id )
      //   let timeFromNow = moment(x.time).from(moment(Now));
      //   // console.log(x.times);

      //   // console.log('after', x.test);
      //   // console.log(x);
      //   return { ...x, timeFromNow };
      // });
      console.log(updatedData);
      // console.log([...logs]);
      // console.log(updatedData[0]);
      res.json({ updatedData });
    })
    .catch((err) => {
      console.log(err);
      res.status(400).json({ error: err });
    });
});

module.exports = router;
