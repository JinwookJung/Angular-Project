const bcrypt = require("bcrypt");//to hash password
const jwt = require("jsonwebtoken");

const User = require("../models/user");


exports.createUser = (req, res, next) => {//new type of data needed
  bcrypt.hash(req.body.password, 10)
    .then(hash => {
      const user = new User({
        email: req.body.email,
        password: hash
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
              message: "Invalid authentication credentials!"
          });
        });
    });
  }

  exports.userLogin = (req, res, next) => {
    let fetchedUser;
    User.findOne({email: req.body.email })
      .then(user => {
        console.log(req.body.password);
        console.log(user.password);

        console.log(user);
        if(!user) {
          return res.status(401).json({//Authentication denied
            message: "Auth failed"
          });
        }
        fetchedUser = user;
        return bcrypt.compare(req.body.password, user.password);
      })
      .then(result => {
        console.log(result);
        if(!result) {
          return res.status(401).json({
            message: "Auth failed"
          })
        }
        const token = jwt.sign(
          { email: fetchedUser.email, userId: fetchedUser._id},
          process.env.JWT_KEY,
          { expiresIn: "1h" }
        );
        res.status(200).json({
          token: token,
          expiresIn: 3600,
          userId: fetchedUser._id
        })
      })
      .catch(err => {
        return res.status(401).json({
          message: "Invalid authentication credentials"
        })
      })
  }
