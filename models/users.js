const { string } = require("joi");
const Joi = require("joi");
const config = require("config");
const jwt = require("jsonwebtoken");
const { default: mongoose } = require("mongoose");

const userSchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
    minlength: 2,
    maxlength: 30,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
    minlenght: 5,
  },
  isAdmin: Boolean,
});
// userSchema.methods.generateAuthToken = function () {

//   return token;
// };
const User = mongoose.model("User", userSchema);

function validateUser(user) {
  const schema = Joi.object({
    name: Joi.string().required().min(5),
    email: Joi.string().required(),
    password: Joi.string().required(),
  });
  let result = schema.validate(user);
}

exports.User = User;
exports.validate = validateUser;
