const express = require("express");
const Router = express.Router();
Router.use(express.json());
const { Customer, validate } = require("../models/customers");

Router.get("/", async (req, res) => {
  const customers = await Customer.find().sort();
  res.send(customers);
});

Router.post("/", async (req, res) => {
  const error = validate(req.body);
  if (error) return res.status(404).send(error);
  let customer = new Customer({
    name: req.body.name,
    phoneno: req.body.phoneno,
    isGold: req.body.isGold,
  });
  const result = await customer.save();
  res.send(result);
});

Router.put("/:id", async (req, res) => {
  const error = validate(req.body);
  if (error) return res.status(404).send(error.details[0]);
  let customer = await Customer.findByIdAndUpdate(
    req.params.id,
    {
      name: req.body.name,
      isGold: req.body.isGold,
      phoneno: req.body.phoneno,
    },
    { new: true }
  );
  if (!customer) return es.status(400).send("not found");

  res.send(customer);
});

Router.delete("/:id", async (req, res) => {
  const customer = await Customer.findByIdAndDelete(req.params.id);
  if (!customer) return res.status(400).send("customer not found");
  res.send(customer);
});

Router.get("/:id", async (req, res) => {
  const customer = await Customer.findById(req.params.id);
  if (!customer) return res.status(400).send("customer not found");
  res.send(customer);
});

module.exports = Router;
