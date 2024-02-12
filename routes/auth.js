const _ = require("lodash");
const config = require("config");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const express = require("express");
const { mongo, Schema } = require("mongoose");
const Router = express.Router();
Router.use(express.json());
const { User } = require("../models/users");
const Joi = require("joi");

Router.post("/", async (req, res) => {
  const error = validateLogin(req.body);
  if (!error) return res.status(404).send(error);
  let user = await User.findOne({ email: req.body.email });
  if (!user) return res.status(400).send("invalid email or password");
  const validPassword = await bcrypt.compare(req.body.password, user.password);
  if (!validPassword) return res.status(400).send("invalid email or password");
  const token = jwt.sign(
    { _id: user._id, isAdmin: user.isAdmin },
    config.get("jwtPrivateKey")
  );

  res.send(token);
});

function validateLogin(req) {
  const schema = Joi.object({
    email: Joi.string().required(),
    password: Joi.string().required(),
  });
  const result = schema.validate(req);
  return result;
}

module.exports = Router;
