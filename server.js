const express = require("express");
const bodyParser = require("body-parser");
const passport = require("passport");
const cors = require("cors");

// all routes import
const auth = require("./routes/auth");
const api = require("./routes/api");

var compression = require("compression");

const app = express();

app.use(compression());
// bodyParser middleware ====================================
app.use(
  bodyParser.urlencoded({
    extended: false,
  })
);
app.use(bodyParser.json());

app.use(passport.initialize());
//passport config
require("./config/passport")(passport);

var corsOptions = {
  origin: [process.env.clients],
  optionsSuccessStatus: 200,
  methods: "GET, POST",
};
app.use(cors(corsOptions));

// use routes
app.use("/auth", auth);
app.use("/api", api);

const port = process.env.PORT || 4593;
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
