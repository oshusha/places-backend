require('dotenv').config();
const express = require('express');

const server = express();
const mongoose = require('mongoose');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const router = require('./router/main');

const error = require('./middleware/error');

server.use(bodyParser.json());
server.use(cookieParser());


server.use(router);

server.use(error);

mongoose.connect(process.env.DATABASE_URL || 'mongodb://127.0.0.1:27017/mestodb', {
  useNewUrlParser: true,
  useCreateIndex: true,
  useFindAndModify: true,
  useUnifiedTopology: true
})
  .then(() => {
    console.log('connected to db');
  })
  .catch((err) => {
    console.log(`Error on start: ${err.stack}`);
  });


server.listen(process.env.PORT || 3000, () => console.log('server started'));
