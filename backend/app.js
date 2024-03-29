const path = require("path");
const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require('mongoose');

const postsRoutes = require("./routes/posts");
const userRoutes = require("./routes/user");

const Post = require('./models/post');

const app = express();

// mongoose.connect("mongodb+srv://JIn:mEdBgRd4vgP1pRjG@mean-course.8pht16q.mongodb.net/node-angular?retryWrites=true&w=majority")
mongoose.connect("mongodb+srv://JIn:"+ process.env.MONGO_ATLAS_PW +"@mean-course.8pht16q.mongodb.net/node-angular")
  .then(() => {
    console.log('connected to database!');
  })
  .catch(() => {
    console.log('connection failed!');
  });
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use("/images", express.static(path.join("backend/images")));

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept, Authorization"
  );
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PUT, PATCH, DELETE, OPTIONS"
  );
  next();
});

app.use("/api/posts", postsRoutes);
app.use("/api/user", userRoutes);//any request starting with /api/user, send it to the userRoutes

module.exports = app;
