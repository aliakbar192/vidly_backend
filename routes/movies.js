const express = require("express");
const { Movie, validate } = require("../models/movies");
const { Genre } = require("../models/genres");
const Router = express.Router();
Router.use(express.json());

Router.get("/", async (req, res) => {
  const movie = await Movie.find().sort();
  res.send(movie);
});

Router.post("/", async (req, res) => {
  const error = validate(req.body);
  if (error) return res.status(404).send(error);
  console.log("ali");
  const genre = await Genre.findById(req.body.genreId);
  if (!genre) return res.status(400).send(error.details[0], message);
  let movie = new Movie({
    title: req.body.title,
    genre: genre,
    numberInStock: req.body.numberInStock,
    dailyRentalRate: req.body.dailyRentalRate,
  });
  let result = await movie.save();
  res.send(result);
});

Router.put("/:id", async (req, res) => {
  const { error } = validate(req.body);
  if (error) return res.status(404).send(error.details[0].message);
  const genre = await Genre.findById(req.body.genreId);
  console.log(req.body.genreId);
  if (!genre) return res.status(400).send("invalid genres");
  const movie = await Movie.findByIdAndUpdate(
    req.params.id,
    {
      title: req.body.title,
      genre: {
        _id: req.body.genreId,
        name: genre.name,
        numberInStock: req.body.numberInStock,
        dailyRentalRate: req.body.dailyRentalRate,
      },
    },
    {
      new: true,
    }
  );
  if (!movie) return res.status(400).send("movie with this id is not found");

  res.send(movie);
});

Router.delete("/:id", async (req, res) => {
  const movie = await Movie.findByIdAndDelete(req.params.id);
  if (!movie) return res.status(400).send("movie with this id is not found");
  res.send(movie);
});

module.exports = Router;
