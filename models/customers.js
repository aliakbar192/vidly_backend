const Joi = require("joi");
const { result } = require("lodash");
const { default: mongoose } = require("mongoose");

const customerSchema = new mongoose.Schema({
  isGold: {
    type: Boolean,
    required: true,
  },
  name: {
    type: String,
    required: true,
    minlength: 4,
  },
  phoneno: {
    type: String,
    required: true,
    minlength: 11,
    maxlength: 11,
  },
});

const Customer = mongoose.model("Customer", customerSchema);

function validatecustomer(customer) {
  console.log(customer);
  const schema = Joi.object({
    name: Joi.string().min(4).required(),
    phoneno: Joi.string().min(11).required(),
    isGold: Joi.boolean().required(),
  });
  let result = Customer.validate(customer);
}
exports.customerSchema = customerSchema;
exports.Customer = Customer;
exports.validate = validatecustomer;
