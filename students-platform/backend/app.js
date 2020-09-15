const path = require('path');
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

const postsRoutes = require('./routes/posts');
const userRoutes = require('./routes/user');

const app = express();
app.use(bodyParser.json());

// Any request targeting /images will be allow to fetch files from there
app.use("/images", express.static(path.join("backend/images")))

mongoose.connect('mongodb://localhost:27017/students-platform',{useNewUrlParser:true, useUnifiedTopology: true})
  .then( () => {
    console.log('Connected to database');
  })
  .catch( () => {
    console.log('Connection failed!');
  });

app.use( (req,res,next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PATCH, DELETE, PUT, OPTIONS');
  next();
});

app.use("/api/posts", postsRoutes);
app.use('/api/user', userRoutes);
module.exports = app;
