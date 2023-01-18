const express = require("express");
const bcrypt = require("bcrypt");//to hash password

const User = require("../models/user");

const router = express.Router();

router.post("/signup", (req, res, next) => {//new type of data needed
  bcrypt.hash(req.body.password, 10)
    .then(hash => {
      const user = new User({
        email: req.body.email,
        password: req.body.password
      });
      user.save()
        .then(result => {
          res.status(201).json({
            message: "User created!",
            result: result
          });
        })
        .catch(err => {
          res.status(500).json({
            error: err
          });
        });
    });
});

module.exports = router;
