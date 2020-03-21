require("dotenv").config();
const express = require("express");

const server = express();
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const router = require("./router/main");

const authorization = require("./middleware/authorization");
const error = require("./middleware/error");

server.use(bodyParser.json());
server.use(authorization);
server.use(error);
server.use(router);

mongoose.connect(process.env.DATABASE_URL || "mongodb://127.0.0.1:27017/mestodb", {
  useNewUrlParser: true,
  useCreateIndex: true,
  useFindAndModify: true,
  useUnifiedTopology: true
})
  .then(() => {
    console.log("connected to db");
  })
  .catch((err) => {
    console.log('Error on start: ' + err.stack);
    process.exit(1);
  });


server.listen(process.env.PORT || 3000, () => console.log("server started"));
