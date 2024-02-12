const express = require("express");
const { Genre, validate } = require("../models/genres");
const Router = express.Router();
Router.use(express.json());
const auth = require("../middleware/auth");
const admin = require("../middleware/admin");
Router.get("/", async (req, res) => {
  const genres = await Genre.find().sort();
  res.send(genres);
});
Router.post("/", auth, async (req, res) => {
  const error = validate(req.body);
  if (error) return res.status(404).send(error);

  let genre = new Genre({
    name: req.body.name,
  });
  let result = await genre.save();

  res.send(result);
});

Router.put("/:id", async (req, res) => {
  const error = validate(req.body);
  if (error) return res.status(404).send(error);
  const genre = await Genre.findByIdAndUpdate(
    req.params.id,
    { name: req.body.name },
    {
      new: true,
    }
  );
  if (!genre) return res.status(400).send("genres with this id is not found");

  res.send(genre);
});

Router.delete("/:id", [auth, admin], async (req, res) => {
  const genre = await Genre.findByIdAndDelete(req.params.id);
  if (!genre) return res.status(400).send("genres with this id is not found");
  res.send(genre);
});

module.exports = Router;
