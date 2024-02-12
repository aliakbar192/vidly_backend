const Joi = require("joi");
const config = require("config");
Joi.objectId = require("joi-objectid")(Joi);
const express = require("express");
const genres = require("./routes/genres");
const customers = require("./routes/customers");
const movies = require("./routes/movies");
const rental = require("./routes/rental");
const { indexOf } = require("underscore");
const { Router } = require("express");
const mongoose = require("mongoose");
const user = require("./routes/users");
const auth = require("./routes/auth");
const app = express();

app.use("/vidly.com/api/genres", genres);
app.use("/vidly.com/api/customers", customers);
app.use("/vidly.com/api/movies", movies);
app.use("/vidly.com/api/rental", rental);
app.use("/vidly.com/api/users", user);
app.use("/vidly.com/api/auth", auth);

// if (!config.get("jwtPrivateKey")) {
//   console.log("FATTLE ERROR:jwtPrivateKey is not defined");
//   process.exit(1);
// }
mongoose
  .connect("mongodb://localhost:27017")
  .then(() => console.log("connected to database"))
  .catch(() => console.error("could not connect", err));

const port = process.env.port || 3000;
app.listen(port, () => console.log("listning to port ", port));
