const validator = require("validator");
const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const User = mongoose.model("User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { JWT_SECRET } = require("../keys");
const requireLogin = require("../middleware/requireLogin");
const mailer = require("nodemailer");
router.get("/", (req, res) => {
  res.send("hello");
});

// check password
router.post("/signup", (req, res) => {
  const { name, email, password } = req.body;

  if (!email || !password || !name) {
    return res.status(422).json({ error: "Please input all fields" });
  }
  if (
    !validator.isStrongPassword(req.body.password, {
      minLowercase: 1,
      minUppercase: 1,
      minNumbers: 1,
      minSymbols: 1,
    })
  ) {
    return res.status(422).json({
      error:
        "Password must contain at least one lower-case letter, one upper-case letter, one digit and a special character",
    });
  }

  User.findOne({ email: email, name: name })
    .then((savedUser) => {
      if (savedUser) {
        return res.status(422).json({ error: "User already exists" });
      }
      bcrypt.hash(password, 12).then((hashedPass) => {
        const user = new User({
          email,
          password: hashedPass,
          name,
          checkLogin: {
            count: 0,
            delayTime: new Date().getTime(),
          },
          expirePasswordDate: new Date(
            new Date().getTime() + 1000 * 60 * 60 * 24 * 90
          ),
        });
        // console.log('BEFOREUSER : ', user);
        user
          .save()
          .then((user) => {
            res.json({ message: "User Added", user: user });
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

router.post("/login", (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(422).json({ error: "Please enter email or password" });
  }

  User.findOne({ email: email })
    .then((savedUser) => {
      console.log("saveUser:", savedUser.checkLogin);
      if (!savedUser) {
        return res.status(422).json({ error: "Email not found" });
      }

      if (new Date().getTime() < savedUser.checkLogin.delayTime) {
        console.log(
          (savedUser.checkLogin.delayTime - new Date().getTime()) / 60000
        );
        const waitMin = (
          (savedUser.checkLogin.delayTime - new Date().getTime()) /
          60000
        ).toFixed(2);

        return res.status(422).json({ error: `Please wait ${waitMin} minute` });
      }

      bcrypt.compare(password, savedUser.password).then(async (doMatch) => {
        if (doMatch) {
          console.log("loginSUccess");
          // res.json({ message: 'Signin Successfully' });
          const token = jwt.sign({ _id: savedUser._id }, JWT_SECRET);
          const { _id, name, email, checkLogin, expirePasswordDate } =
            savedUser;
          const resp = {
            message: "Successfully Login",
            user: { _id, name, email, expirePasswordDate },
            token: token,
          };
          User.findByIdAndUpdate(
            savedUser._id,
            {
              checkLogin: {
                count: 0,
                delayTime: new Date().getTime(),
              },
            },
            { new: true },
            (err, result) => {
              if (err) {
                console.log(err);
              } else {
                console.log("Success Login", result);
              }
            }
          );
          // new Date().getTime > expirePasswordDate
          if (new Date().getTime > expirePasswordDate) {
            // password expire
            // send email to path
            // --------------------------------- send email to path
            var smtp = {
              host: "smtp.gmail.com", //set to your host name or ip
              port: 587, //25, 465, 587 depend on your
              secure: false, // use SSL
              auth: {
                user: "phakawat.ta@ku.th", //user account
                pass: "@MilkShake77", //user password
              },
            };
            var smtpTransport = mailer.createTransport(smtp);

            var mail = {
              from: "no-reply@kaidow.th", //from email (option)
              to: `${savedUser.email}`, //to email (require)
              subject: `${"Reset Password - KDStory"}`, //subject
              html: `<div><h1>Click on the link below to reset your password </h1> <strong><a href = "http://localhost:3000/forgot/${expirePasswordDate}"> HERE </a></strong></div>`, //email body
            };

            smtpTransport.sendMail(mail, function (err, response) {
              smtpTransport.close();
              if (err) {
                //error handler
                conole.log(err);
              } else {
                //success handler
                console.log("send email success", response);
              }
            });

            // --------------------------------- send email to path
            res.json({
              error: "You password is expired plese check your email",
            });
          } else {
            res.json(resp);
          }

          // check expire password 3 time
        } else {
          let lastCount = 1;

          if (savedUser.checkLogin.count >= 3) {
            await User.findByIdAndUpdate(
              savedUser._id,
              {
                checkLogin: {
                  count: 0,
                  delayTime: new Date().getTime() + 5 * 60 * 1000,
                },
              },
              { new: true }
            ).then((err, result) => {
              if (err) {
                console.log(err);
              }
            });

            return res
              .status(422)
              .json({ error: "Wrong password 4 time.Please wait for 5 min" });
          } else {
            await User.findByIdAndUpdate(
              savedUser._id,
              {
                checkLogin: {
                  count: savedUser.checkLogin.count + 1,
                  delayTime: new Date().getTime(),
                },
              },
              { new: true }
            ).then((res, err) => {
              if (err) {
                console.log("err", err);
              } else {
                lastCount = res.checkLogin.count;
              }
            });
          }

          return res.status(422).json({
            error: `Username or Password ${lastCount}/4`,
          });
        }
      });
    })
    .catch((err) => {
      console.log(err);
      return res.status(400).json({ error: "EMAIL OR PASSWORD INCORRECT" });
    });
});

const sendResetEmail = ({ email, expirePasswordDate }) => {
  // new Date().getTime > expirePasswordDate
  // password expire
  // send email to path
  // --------------------------------- send email to path
  var smtp = {
    host: "smtp.gmail.com", //set to your host name or ip
    port: 587, //25, 465, 587 depend on your
    secure: false, // use SSL
    auth: {
      user: "phakawat.ta@ku.th", //user account
      pass: "@MilkShake77", //user password
    },
  };
  var smtpTransport = mailer.createTransport(smtp);

  var mail = {
    from: "no-reply@kaidow.th", //from email (option)
    to: `${email}`, //to email (require)
    subject: `${"Reset Password"}`, //subject
    html: `<div><h1>Click on the link below to reset your password </h1> <strong><a href = "http://localhost:3000/forgot/${expirePasswordDate}"> HERE </a></strong></div>`, //email body
  };

  smtpTransport.sendMail(mail, function (err, response) {
    smtpTransport.close();
    if (err) {
      //error handler
      conole.log(err);
    } else {
      //success handler
      console.log("send email success", response);
    }
  });
};

// --------------forgotpassword -------------------//

router.post("/forgotpassword", (req, res) => {
  const { email } = req.body;
  if (!email) {
    return res.status(422).json({ error: "Please enter email" });
  }

  User.findOne({ email: email }).then((user) => {
    if (!user) {
      return res.status(422).json({ error: "Email not found" });
    } else {
      console.log("saveUser:", email);
      sendResetEmail(user);
    }
  });
});

// -------------- send email to path-------------------//
router.put("/setPassword", (req, res) => {
  const { expirePasswordDate, password } = req.body;
  console.log("set new = ", { expirePasswordDate, password });
  User.findOne({ expirePasswordDate: req.body.expirePasswordDate })
    .then((savedUser) => {
      console.log("sav = ", savedUser);
      if (savedUser) {
        let _id = savedUser._id;
        console.log("id = ", _id);
        bcrypt.hash(password, 12).then((hashedPass) => {
          User.findByIdAndUpdate(
            _id,
            {
              password: hashedPass,
              expirePasswordDate: new Date(
                new Date().getTime() + 1000 * 60 * 60 * 24 * 90
              ),
            },
            { new: true }
          ).then((data) => {
            console.log("success");
          });
        });
      }

      res.json({ success: "yah" });

      // set new password
      // console.log('saveUser:', savedUser.checkLogin);
      // if (!savedUser) {
      //   return res
      //     .status(422)
      //     .json({ error: 'Username or Password Incorrect' });
      // }
    })
    .catch((err) => {
      console.log(err);
    });
});

module.exports = router;
