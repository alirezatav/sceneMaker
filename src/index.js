const express = require("express");

const fileUpload = require("express-fileupload");
const cors = require("cors");
const bodyParser = require("body-parser");
const morgan = require("morgan");
const _ = require("lodash");
const config = require('./config')
const errorhandler = require("errorhandler");
const isProduction = process.env.NODE_ENV === "production";

const app = express();
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(
  fileUpload({
    createParentPath: true,
  })
);
app.use("/static", express.static(config.VIDEOS_DIRECTORY));
if (!isProduction) {
  app.use(errorhandler());
}

// routes
app.use(require("./routes"));

// const server = app.listen(process.env.PORT || 3000, function () {
//   console.log("Listening on port " + server.address().port);
// });
const server = app.listen(
  process.env.PORT || 4000,
  "185.120.221.230",
  function () {
    console.log("Listening on port " + server.address().port);
  }
);
