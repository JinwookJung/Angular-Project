const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require('mongoose');

//mEdBgRd4vgP1pRjG

const Post = require('./models/post');

const app = express();

mongoose.connect("mongodb+srv://JIn:<mEdBgRd4vgP1pRjG>@mean-course.8pht16q.mongodb.net/?retryWrites=true&w=majority")
  .then(() => {
    console.log('connected to database!');
  })
  .catch(() => {
    console.log('connection failed!');
  });
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PATCH, DELETE, OPTIONS"
  );
  next();
});

app.post("/api/post", (req, res, next) => {
const post = new Post({
  title: req.body.title,
  content: req.body.content
});
  console.log(post);
  res.status(201).json({
    message: 'Post added successfully'
  });
});

app.use("/api/posts", (req, res, next) => {
  const posts = [
    {
      id: "fadf12421l",
      title: "First server-side post",
      content: "This is coming from the server"
    },
    {
      id: "ksajflaj132",
      title: "Second server-side post",
      content: "This is coming from the server!"
    }
  ];
  res.status(200).json({
    message: "Posts fetched succesfully!",
    posts: posts
  });
});

module.exports = app;
