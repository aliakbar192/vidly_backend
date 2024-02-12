const config = require("config");
const jwt = require("jsonwebtoken");
const _ = require("lodash");
const bcrypt = require("bcryptjs");
const express = require("express");
const { mongo } = require("mongoose");
const Router = express.Router();
Router.use(express.json());
const { validate, User } = require("../models/users");
const auth = require("../middleware/auth");

Router.post("/", async (req, res) => {
  const error = validate(req.body);
  if (error) return res.status(404).send(error);
  let user = await User.findOne({ email: req.body.email });
  if (user)
    return res.status(400).send("user with this email is already exist");
  user = new User(_.pick(req.body, ["name", "email", "password", "isAdmin"]));
  const salt = await bcrypt.genSalt(15);
  user.password = await bcrypt.hash(user.password, salt);
  const token = jwt.sign(
    { _id: user._id, isAdmin: user.isAdmin },
    config.get("jwtPrivateKey")
  );
  let result = await user.save();
  res
    .header("x-auth-token", token)
    .send(_.pick(result, ["_id", "name", "email", "isAdmin"]));
});
Router.get("/me", auth, async (req, res) => {
  let user = await User.findById(req.user._id).select("-password");
  res.send(user);
});

module.exports = Router;
