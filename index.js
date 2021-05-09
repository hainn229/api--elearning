require("dotenv").config();
const express = require("express");
const app = express();
const logger = require("morgan");
const bodyParser = require("body-parser");
const cors = require("cors");
const mongoose = require("mongoose");
const router = require("./src/routers/index");
const passport = require("passport");

const PORT = process.env.PORT || 4000;
mongoose.connect(
  process.env.MONGODB_SRV,
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
    useCreateIndex: true,
  },
  (err) => {
    if (err) {
      console.log(err);
    }
    console.log("Connect to database successfully");
  }
);

app.use(passport.initialize());
app.use(passport.session());
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);
app.use(bodyParser.json());
app.use(cors());
app.use(logger());
app.use(router);

app.get("/", (req, res) => {
  return res.send("This is API Server !");
});
app.listen(PORT, () => {
  console.log("API Server listening on port " + PORT);
});
module.exports = app;
