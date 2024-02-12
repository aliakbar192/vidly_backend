const express = require("express");
const { Movie } = require("../models/movies");
const { Customer } = require("../models/customers");
const { Rental, validate } = require("../models/rental");
const Router = express.Router();
Router.use(express.json());

Router.get("/", async (req, res) => {
  const rental = await Rental.find().sort();
  res.send(rental);
});

Router.post("/", async (req, res) => {
  const error = validate(req.body);
  if (error) return res.status(404).send(error.details[0].message);
  console.log("ali");
  const movie = await Movie.findById(req.body.movieId);
  if (!movie) return res.status(400).send("movie not found");
  const customer = await Customer.findById(req.body.customerId);
  if (!customer) return res.status(400).send("customer not found");
  let rental = new Rental({
    customer: customer,
    movie: movie,
    rentalFee: 530,
  });
  let result = await rental.save();

  movie.numberInStock--;
  movie.save();
  res.send(result);
});

// Router.put("/:id", async (req, res) => {
//   const { error } = validate(req.body);
//   if (error) return res.status(404).send(error.details[0].message);
//   const genre = await Genre.findById(req.body.genreId);
//   console.log(req.body.genreId);
//   if (!genre) return res.status(400).send("invalid genres");
//   const movie = await Movie.findByIdAndUpdate(
//     req.params.id,
//     {
//       title: req.body.title,
//       genre: {
//         _id: req.body.genreId,
//         name: genre.name,
//         numberInStock: req.body.numberInStock,
//         dailyRentalRate: req.body.dailyRentalRate,
//       },
//     },
//     {
//       new: true,
//     }
//   );
//   if (!movie) return res.status(400).send("movie with this id is not found");

//   res.send(movie);
// });

// Router.delete("/:id", async (req, res) => {
//   const movie = await Movie.findByIdAndDelete(req.params.id);
//   if (!movie) return res.status(400).send("movie with this id is not found");
//   res.send(movie);
// });

module.exports = Router;
