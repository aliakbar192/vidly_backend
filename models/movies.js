const Joi = require("joi");
const { default: mongoose } = require("mongoose");
const { genreSchema } = require("./genres");
const movieSchema = mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  genre: {
    type: genreSchema,
    required: true,
  },
  numberInStock: {
    type: Number,
    required: true,
    min: 0,
    max: 250,
  },
  dailyRentalRate: {
    type: Number,
    required: true,
    min: 0,
    max: 250,
  },
});

const Movie = mongoose.model("Movie", movieSchema);

function validatemovie(movies) {
  const schema = Joi.object({
    title: Joi.string().min(4).required(),
    genreId: Joi.objectId().required(),
    numberInStock: Joi.number().required(),
    dailyRentalRate: Joi.number().required(),
  });
  let result = schema.validate(movies);
}
exports.movieSchema = movieSchema;
exports.Movie = Movie;
exports.validate = validatemovie;
