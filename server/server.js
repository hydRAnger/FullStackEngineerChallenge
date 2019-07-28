const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const passport = require("passport");

const passportConfig = require("./config/passport");
const userRoutes = require("./routes/users");
const reviewRoutes = require("./routes/reviews");

const app = express();

app.use(
  bodyParser.urlencoded({
    extended: false
  })
);

app.use(bodyParser.json());

const db = require("./config/keys").mongoURI;

mongoose
  .connect(db, { useNewUrlParser: true })
  .then(() => {
    console.log("MongoDB connected.");
  })
  .catch(err => {
    console.error(err);
  });

app.use(passport.initialize());
passportConfig(passport);

app.use("/api/users", userRoutes);
app.use("/api/reviews", reviewRoutes);

const port = process.env.PORT || 5000;

app.listen(port, () => {
  console.log(`Server run on port: ${port}.`);
});
